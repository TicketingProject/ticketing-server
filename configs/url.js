const config = require('./index');

module.exports = {
  area: (lat, lng) => `http://apis.map.qq.com/ws/geocoder/v1/?location=${lat},${lng}&key=${config.mapApiKey}`,
  movieHot: 'http://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=1000',
  movieDetail: (id) => `http://m.maoyan.com/movie/${id}.json`,
  cinema: 'http://m.maoyan.com/cinemas.json',
  show: (cinemaId, movieId) => `http://m.maoyan.com/showtime/wrap.json?cinemaid=${cinemaId}&movieid=${movieId}`,
  seat: (showId, showDate) => `http://m.maoyan.com/show/seats?showId=${showId}&showDate=${showDate}`
}
