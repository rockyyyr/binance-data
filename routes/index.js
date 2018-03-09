const router = require('express').Router()
const database = require('../database')
const tasks = require('../src/tasks')
const binance = require('../src/binance')

router.get('/report', async (req, res) => {
  const data = await database.select('data')
  res.json(data)
})

router.get('/history', async (req, res) => {
  const data = database.select('history')
  res.json(data)
})

router.post('/init', async (req, res) => {
  const initialize = req.body.init

  if(initialize){
    const response = await binance.change()
    await tasks.init(response.data)

    res.end('initialized')

  } else {
    res.end('did not initialize')
  }
})

module.exports = router
