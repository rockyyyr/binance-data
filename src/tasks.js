const database = require('../database')
const {
  target,
  change,
  percent
} = require('./util/calculate')

const table = 'data'

async function init(data) {
  const result = data
    .filter(x => x.priceChangePercent < -5 && x.symbol.endsWith('BTC'))
    .sort((a, b) => a.priceChangePercent - b.priceChangePercent)
    .map(x => {
      return {
        start_time: timestamp(),
        symbol: x.symbol,
        change: x.priceChangePercent,
        price: x.lastPrice,
        target: target(parseFloat(x.lastPrice), percent(10))
      }
    })
  database.insert(table, result)
}

async function monitor(data) {
  const history = await database.select(table)

  data.forEach(x => {
    const coin = getSymbol(history, x.symbol)

    if (coin) {
      if (x.lastPrice >= coin.target) {
        console.log('target reached for ' + x.symbol)
        database.update(table, {
          end_time: timestamp()
        }, 'symbol', x.symbol)
      }
    }
  })
}

function getSymbol(array, symbol) {
  return array.filter(x => x.symbol === symbol)[0]
}

function timestamp() {
  return new Date().valueOf()
}

module.exports = {
  init,
  monitor
}