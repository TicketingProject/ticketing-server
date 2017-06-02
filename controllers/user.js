const jwt = require('koa-jwt');
const User = require('../models/user');
const config = require('../config');

// exports.login = function (cxt, next) {

//   let req = this.request.body;
//   let res = null;

//   try {
//     res = yield Admin.findOne({
//       username: req.username,
//       password: req.password
//     }).exec();
//   } catch (e) {
//     return this.resp.error(e.message);
//   }

//   if (res) {
//     var token = jwt.sign(res, config.JWT_SECRET);
//     return this.resp.send({token});
//   } else {
//     return this.resp.send({msg: "账号或密码错误"});
//   }

// };