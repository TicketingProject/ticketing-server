
const names = {
  DB_ERROR: { code: 1001, message: 'DataBase Select Error'},
  FETCH_ERROR: { code: 1002, message: 'Fetch Data Error'},
  CACHE_ERROR: { code: 1003, message: 'Cache Error'},
  UNKNOW_OPENID: { code: 2000, message: 'Unknow OpenId'},
  ORDER_ERROR: { code: 2001, message: 'Order Error'},
  UNKNOW_ERROR: { code: -1, message: 'Unknow Error'}
}

module.exports = names;