const Sequelize = require('sequelize');
const db = require("../db");

const Seat = db.define('seat', {
  "showId": Sequelize.INTEGER,
  "showDate": Sequelize.STRING,
  "seatNo": Sequelize.STRING
});

Seat.sync();

module.exports = Seat;
