const urlConfig = require('../configs/url');
const reqwest = require('reqwest');
const ApiError = require('../error/apiError');
const ApiErrorName = require('../error/apiErrorName');

/**
 * 获取电影排场信息及影院信息
 * @param {*} ctx - 存在时改变 ctx.body
 */
exports.getShowDetail = async function(ctx) {
  try {
    const { cinemaId, movieId } = ctx.query;
    const result = JSON.parse(await reqwest(urlConfig.show(cinemaId, movieId)));
    if (result.status == 0) {
      const data = result.data;
      ctx.json(data);
    } else {
      throw new ApiError(ApiErrorName.FETCH_ERROR, result);
    }
  } catch(err) {
    throw new ApiError(ApiErrorName.FETCH_ERROR, `Request '${urlConfig.movieHot}' error:\n ${err.message}`);
  }
}

/**
 * 获取电影排场信息
 * @param {*} ctx - 存在时改变 ctx.body
 */
exports.getShow = async function(ctx) {
  try {
    const { cinemaId, movieId } = ctx.query;
    const result = JSON.parse(await reqwest(urlConfig.show(cinemaId, movieId)));
    if (result.status == 0) {
      const data = result.data.DateShow;
      ctx.json(data);
    } else {
      throw new ApiError(ApiErrorName.FETCH_ERROR, result);
    }
  } catch(err) {
    throw new ApiError(ApiErrorName.FETCH_ERROR, `Request '${urlConfig.movieHot}' error:\n ${err.message}`);
  }
}
