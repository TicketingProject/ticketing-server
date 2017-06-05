const Sequelize = require('sequelize');
const db = require("../db");

const MovieDetail = db.define('movie-detail', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  dra: Sequelize.STRING,
  isShowing: Sequelize.BOOLEAN,
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
  nm: Sequelize.STRING,
  rt: Sequelize.STRING,
  vd: Sequelize.STRING
});

MovieDetail.sync();

module.exports = MovieDetail;
