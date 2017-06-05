const urlConfig = require('../configs/url');
const Movie = require('../models/movie');
const MovieDetail = require('../models/movie-detail');
const Photo = require('../models/photo');
const Comment = require('../models/comment');
const reqwest = require('reqwest');
const ApiError = require('../error/apiError');
const ApiErrorName = require('../error/apiErrorName');

/**
 * 刷新电影简介列表
 * @param {*} ctx - 存在时改变 ctx.body
 */
const reflesh = async function(ctx) {
  try {
    const result = JSON.parse(await reqwest(urlConfig.movieHot));
    if (result.status == 0) {
      const data = result.data.movies;

      // 清空原数据
      await Movie.sync({ force: true });
      await MovieDetail.sync({ force: true });
      await Comment.sync({ force: true });
      await Photo.sync({ force: true });

      await Movie.bulkCreate(data);
      const res = await Movie.findAll();
      if (ctx && ctx.body) {
        ctx.json(res);
      }
      return res;
    } else {
      throw new ApiError(ApiErrorName.FETCH_ERROR, `Request '${urlConfig.movieHot}' error:\n ${result}`);
    }
  } catch(err) {
    console.error(err);
    if (err instanceof ApiError) {
      throw err;
    } else {
      throw new ApiError(ApiErrorName.DB_ERROR);
    }
  }
}

/**
 * 获取电影简介列表
 * @param {*} ctx 
 */
const getAll = async function(ctx) {
  try {
    const data = await Movie.findAll();
    if (data && data.length) {
      ctx.json(data);
    } else {
      ctx.json(reflesh());
    }
  } catch(err) {
    console.error(err);
    throw new ApiError(ApiErrorName.DB_ERROR);
  }
}

/**
 * 请求获取电影详情
 * @param {*} ctx 
 */
const _fetchDetail = async function(id) {
  try {
    const url = urlConfig.movieDetail(id);
    const result = JSON.parse(await reqwest(url));
    if (result.status == 0) {
      const data = result.data;
      
      let dra = data.MovieDetailModel.dra.replace('<p>', '');
      dra = dra.replace('</p>', '');
      data.MovieDetailModel.dra = dra;

      const tasks = [
        MovieDetail.create(data.MovieDetailModel),
        Photo.bulkCreate(data.MovieDetailModel.photos.map(item => {
          return {
            movieId: id,
            src: item
          }
        })),
        Comment.bulkCreate(data.CommentResponseModel.hcmts.map(item => {
          item.movieId = id;
          return item;
        }))
      ]
      await Promise.all(tasks);
    } else {
      throw new ApiError(ApiErrorName.FETCH_ERROR, `Request '${urlConfig.movieDetail(id)}' -  error:\n ${result}`);
    }
  } catch(err) {
    console.error(err);
    if (err instanceof ApiError) {
      throw err;
    } else {
      throw new ApiError(ApiErrorName.DB_ERROR);
    }
  }
}

/**
 * 获取电影详情
 * @param {*} ctx 
 */
const getDetail = async function(ctx) {
  const id = ctx.params.id;
  try {
    const detail = await MovieDetail.findById(id);
    if (detail && detail.id) {
      const tasks = [
        Photo.findAll({
          where: {
            movieId: id
          }
        }),
        Comment.findAll({
          where: {
            movieId: id
          }
        })
      ];
      let [photos, comments] = await Promise.all(tasks);
      ctx.json({ detail, photos, comments });
    } else {
      await _fetchDetail(id);
      const detail = await MovieDetail.findById(id);
      if (detail && detail.id) {
        const tasks = [
          Photo.findAll({
            where: {
              movieId: id
            }
          }),
          Comment.findAll({
            where: {
              movieId: id
            }
          })
        ];
        let [photos, comments] = await Promise.all(tasks);
        ctx.json({ detail, photos, comments });
      }
    }
  } catch(err) {
    console.error(err);
    throw new ApiError(ApiErrorName.DB_ERROR);
  }
}

module.exports = { reflesh, getAll, getDetail };

