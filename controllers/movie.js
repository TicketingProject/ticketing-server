const urlConfig = require('../configs/url');
const Movie = require('../models/movie');
const MovieDetail = require('../models/movie-detail');
const Photo = require('../models/photo');
const Comment = require('../models/comment');
const reqwest = require('reqwest');

/**
 * 刷新电影简介列表
 * @param {*} ctx - 存在时改变 ctx.body
 */
const reflesh = async function(ctx) {
  try {
    const result = JSON.parse(await reqwest(urlConfig.movieHot));
    if (result.status == 0) {
      const data = result.data.movies;
      await Movie.sync({ force: true });
      await Movie.bulkCreate(data);
      const res = await Movie.findAll();
      if (ctx && ctx.body) {
        ctx.body = res;
      }
      return res;
    } else {
      throw new Error(`Request '${urlConfig.movieHot}' error:\n ${result}`);
    }
  } catch(e) {
    console.error(e);
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
      ctx.body = data;
    } else {
      ctx.body = await reflesh();
    }
  } catch(e) {
    console.error(e);
  }
}

/**
 * 请求获取电影详情
 * @param {*} ctx 
 */
const _fetchDetail = async function(id) {
  console.log(id);
  try {
    const url = urlConfig.movieDetail(id);
    const result = JSON.parse(await reqwest(url));
    if (result.status == 0) {
      const data = result.data;
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
      throw new Error(`Request '${urlConfig.movieDetail(id)}' -  error:\n ${result}`);
    }
  } catch(e) {
    console.error(e);
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
      ctx.body = { detail, photos, comments };
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
        ctx.body = { detail, photos, comments };
      }
    }
  } catch(e) {
    console.error(e);
  }
}

module.exports = { reflesh, getAll, getDetail };

