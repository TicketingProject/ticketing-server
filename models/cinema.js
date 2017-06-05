const Sequelize = require('sequelize');
const db = require("../db");

const Cinema = db.define('cinema', {
  "id": { type: Sequelize.INTEGER, primaryKey: true },
  "addr": Sequelize.STRING,
  "brd": Sequelize.STRING,
  "lat": Sequelize.FLOAT,
  "lng": Sequelize.FLOAT,
  "imax": Sequelize.INTEGER,
  "sellPrice": Sequelize.INTEGER,
  "sell": Sequelize.BOOLEAN,
  "nm": Sequelize.STRING,
  "area": Sequelize.STRING,
  "areaId": Sequelize.INTEGER
});

Cinema.sync();

module.exports = Cinema;
