const Sequelize = require('sequelize');
const db = require("../db");

const Phone = db.define('photo', {
  movieId: Sequelize.INTEGER,
  src: Sequelize.STRING
});

Phone.sync();

module.exports = Phone;
