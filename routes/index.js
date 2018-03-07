const router = require('express').Router()
const database = require('../database')

router.get('/report', async (req, res) => {
  const data = await database.select('data')
  res.json(data)
})

module.exports = router
