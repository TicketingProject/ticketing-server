const Sequelize = require('sequelize');
const db = require("../utils/db");

const Movie = db.define('movie', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  showInfo: Sequelize.STRING,
  img: Sequelize.STRING,
  sc: Sequelize.FLOAT,
  ver: Sequelize.STRING,
  imax: Sequelize.BOOLEAN,
  snum: Sequelize.INTEGER,
  preSale: Sequelize.INTEGER,
  dir: Sequelize.STRING,
  star: Sequelize.STRING,
  cat: Sequelize.STRING,
  wish: Sequelize.INTEGER,
  '3d': Sequelize.BOOLEAN,
  scm: Sequelize.STRING,
  nm: Sequelize.STRING
});

Movie.sync();

module.exports = Movie;
