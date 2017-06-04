const urlConfig = require('../configs/url');
const Cinema = require('../models/cinema');
const Area = require('../models/area');
const reqwest = require('reqwest');
const ApiError = require('../utils/apiError');
const ApiErrorName = require('../utils/apiErrorName');

/**
 * 刷新区域及影院
 * @param {*} ctx - 存在时改变 ctx.body
 */
const init = async function(ctx) {
  try {
    const result = JSON.parse(await reqwest(urlConfig.cinema));
    if (result.status == 0) {

      const data = result.data;

      await Area.sync({ force: true });
      await Cinema.sync({ force: true });

      await Promise.all(Object.keys(data).map(async(key, index) => {
        await Area.create({
          id: index,
          nm: key
        });
        const cinemas = data[key].map(item => {
          item.areaId = index;
          return item;
        });
        await Cinema.bulkCreate(cinemas)
      }));

      const res = await Cinema.findAll();
      if (ctx && ctx.body) {
        ctx.json(res);
      }
      return res;
    } else {
      throw new ApiError(ApiErrorName.FETCH_ERROR, `Request '${urlConfig.cinema}' error:\n ${result}`);
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
 * 获取影院列表
 * @param {*} ctx 
 */
const getAll = async function(ctx) {
  try {
    const data = await Cinema.findAll();
    if (data && data.length) {
      ctx.json(data);
    } else {
      ctx.json(await init());
    }
  } catch(e) {
    console.error(e);
  }
}

const getByArea = async function(ctx) {
  const areaId = ctx.params.areaId;
  try {
    const data = await Cinema.findAll({
      where: {
        areaId
      }
    });
    ctx.json(data);
  } catch(e) {
    console.error(e);
  }
}

/**
 * 按区域、经纬度返回排序后影院位置
 * @param {*} ctx 
 */
const getByPos = async function(ctx) {
  const { areaId, lat, lng } = ctx.params;
  try {
    const data = await Cinema.findAll({
      where: {
        areaId
      }
    });
    data.sort((a, b) => {
      const disA = (a.lat - lat)*(a.lat - lat) + (a.lng - lng)*(a.lng - lng);
      const disB = (b.lat - lat)*(b.lat - lat) + (b.lng - lng)*(b.lng - lng);
      return disA - disB;
    });
    ctx.json(data);
  } catch(err) {
    console.error(err);
    throw new ApiError(ApiErrorName.DB_ERROR);
  }
}

module.exports = { init, getAll, getByArea, getByPos };

