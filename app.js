const app = require('express')()
const cors = require('cors')

const binance = require('./src/binance')
const tasks = require('./src/tasks')
const database = require('./database')

app.use(cors())
app.use('/', require('./routes'))

async function start() {

  try {
    await database.drop('data')
    const response = await binance.change()
    await tasks.init(response.data)

    setInterval(async () => {
      try {
        console.log('running monitor...')
        const response = await binance.change()
        await tasks.monitor(response.data)

      } catch (err) {
        throw err
      }
    }, 1000 * 60 * 5)

  } catch (err) {
    console.error(err)
  }
}

start()

module.exports = app
