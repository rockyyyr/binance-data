const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')

const binance = require('./src/binance')
const tasks = require('./src/tasks')
const database = require('./database')

app.use(bodyParser.json())
app.use(cors())
app.use('/', require('./routes'))

async function start() {

  try {

    setInterval(async () => {
      try {
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

// start()

module.exports = app
