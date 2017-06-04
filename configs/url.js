const config = require('./index');

module.exports = {
  area: (lat, lng) => `http://apis.map.qq.com/ws/geocoder/v1/?location=${lat},${lng}&key=${config.mapApiKey}`,
  movieHot: 'http://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=1000',
  movieDetail: (id) => `http://m.maoyan.com/movie/${id}.json`,
  cinema: 'http://m.maoyan.com/cinemas.json'
}
