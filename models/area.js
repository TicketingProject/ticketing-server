const Sequelize = require('sequelize');
const db = require("../db");

const Area = db.define('area', {
  "id": { type: Sequelize.INTEGER, primaryKey: true },
  "nm": Sequelize.STRING
});

Area.sync();

module.exports = Area;
