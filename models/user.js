const Sequelize = require('sequelize');
const db = require("../db");

const User = db.define('user', {
  phone: Sequelize.STRING,
  password: Sequelize.STRING,
  isWechat: Sequelize.BOOLEAN,
  sessionKey: Sequelize.STRING,
  openId: Sequelize.STRING
});

User.sync();

module.exports = User;
 


