const ApiError = require('./apiError');
const ApiErrorName = require('./apiErrorName');

module.exports = () => async (ctx, next) => {
  try {
    ctx.json = (data, cache = true) => {
      const res = { code: 0, data, message: 'OK' };
      ctx.body = res;
    }
    await next();
  } catch (err) {
    
    // 未知错误类型
    if (!(err instanceof ApiError)) {
      err = new ApiError(ApiErrorName.UNKNOW_ERROR, err.message);
    }

    ctx.body = {
      code: err.code,
      message: err.message,
      data: null
    }
  }
}