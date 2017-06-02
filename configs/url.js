module.exports = {
  movieHot: 'http://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=1000',
  movieDetail: (id) => `http://m.maoyan.com/movie/${id}.json`
}