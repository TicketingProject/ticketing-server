const Sequelize = require('sequelize');
const db = require("../db");

const Order = db.define('order', {
  openId: Sequelize.STRING,
  price: Sequelize.FLOAT,
  showId: Sequelize.STRING,
  seatNo: Sequelize.STRING
});

Order.sync();

module.exports = Order;
