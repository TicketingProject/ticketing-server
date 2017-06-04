const urlConfig = require('../configs/url');
const reqwest = require('reqwest');
const ApiError = require('../utils/apiError');
const ApiErrorName = require('../utils/apiErrorName');


/**
 * 获取座位信息
 * @param {*} ctx - 存在时改变 ctx.body
 */
exports.getSeat = async function(ctx) {
  try {
    const { showId, showDate } = ctx.query;
    const result = JSON.parse(await reqwest(urlConfig.seat(showId, showDate)));
    ctx.json(result.sections);
  } catch(err) {
    console.error(err);
    throw new ApiError(ApiErrorName.FETCH_ERROR, `Request '${urlConfig.seat(showId, showDate)}' error:\n ${err.message}`);
  }
}
