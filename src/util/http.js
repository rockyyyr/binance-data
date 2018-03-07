const axios = require('axios').create({
  baseURL: 'https://api.binance.com/api'
})

const get = url => axios.get(url)

module.exports = {
  get
}
