const config = require('../configs').mysql;
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  },
  define: {
    timestamps: false // true by default
  }
});

module.exports = sequelize;