const jwt = require('koa-jwt');
const User = require('../models/user');
const config = require('../configs');
const ApiError = require('../error/apiError');
const ApiErrorName = require('../error/apiErrorName');

exports.getToken = function (cxt, next) {

  let req = this.request.body;
  
  // 生成 Token
  var token = jwt.sign({
    timestamp: req.timestamp,
    openId: req.openId
  }, config.JWTSecret);

  cxt.json({ token });
};