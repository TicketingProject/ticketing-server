const config = require('../configs').mysql;
const Sequelize = require('sequelize');

/**
 * ORM
 */
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


/**
 * Mysql 连接验证
 */
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
  process.exit(1);
});


module.exports = sequelize;