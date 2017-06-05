const Sequelize = require('sequelize');
const db = require("../db");

const Comment = db.define('comment', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  movieId: Sequelize.INTEGER,
  nick: Sequelize.STRING,
  approve: Sequelize.INTEGER,
  oppose: Sequelize.INTEGER,
  reply: Sequelize.INTEGER,
  avatarurl: Sequelize.STRING,
  nickName: Sequelize.STRING,
  score: Sequelize.INTEGER,
  userId: Sequelize.INTEGER,
  time: Sequelize.STRING,
  content: Sequelize.STRING
});

Comment.sync();

module.exports = Comment;
