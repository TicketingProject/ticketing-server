const schedule = require('node-schedule');
const reqwest = require('reqwest');
const movieController = require('../controllers/movie')

/**
 * 热映列表
 * 每小时刷新
 */
schedule.scheduleJob('0 1 * * * *', function() {
  console.log(`Reflesh \`Movie\` at ${new Date()}`);
  movieController.reflesh();
});
