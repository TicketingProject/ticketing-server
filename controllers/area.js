const Area = require('../models/area');
const urlConfig = require('../configs/url');
const ApiError = require('../error/apiError');
const ApiErrorName = require('../error/apiErrorName');
const reqwest = require('reqwest');

/**
 * 获取区域列表
 * @param {*} ctx 
 */
exports.getAll = async function(ctx) {
  try {
    const data = await Area.findAll();
    ctx.json(data);
  } catch(err) {
    console.error(err);
    throw new ApiError(ApiErrorName.DB_ERROR);
  }
}


/**
 * 按经纬度获取区域列表
 * @param {*} ctx 
 */
exports.getByPos = async function(ctx) {
  let district;
  try {
    const { lat, lng } = ctx.params;
    const result = await reqwest(urlConfig.area(lat, lng));
    district = result.result.address_component.district;
  } catch(err) {
    console.error(err);
    throw new ApiError(ApiErrorName.FETCH_ERROR, `${urlConfig.area(lat, lng)} - ${err.message}`);
  }
  if (!district) ctx.json(null);

  try {
    const data = await Area.findOne({
      where: {
        nm: district
      }
    });
    ctx.json(data);
  } catch(err) {
    console.error(err);
    throw new ApiError(ApiErrorName.DB_ERROR);
  }
}