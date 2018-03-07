const http = require('./util/http')

function ticker(endpoint) {
  return http.get(`/v1/ticker/${endpoint}`)
}

function change(symbol) {
  return ticker('24hr' + (symbol ? `?symbol=${symbol}` : ''))
}

function price(symbol){
  return ticker('price' + (symbol ? `?symbol=${symbol}` : ''))
}

module.exports = {
  change,
  price
}