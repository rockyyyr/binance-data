const knex = require('knex')({
  client: 'mysql2',
  connection: process.env.CLEARDB_DATABASE_URL || require('./config.json'),
  pool: {
    max: 7,
    min: 0
  }
})

knex.schema.hasTable('data').then(exists => {
  if (!exists) createDataTable()
})
knex.schema.hasTable('history').then(exists => {
  if (!exists) createHistoryTable()
})

function createDataTable() {
  knex.schema.createTable('data', column => {
    column.string('start_time')
    column.string('symbol')
    column.decimal('change')
    column.decimal('price', 16, 8)
    column.decimal('target', 16, 8)
    column.decimal('current_price', 16, 8).defaultTo(0)

  }).then(() => console.log('data table created'))
}

function createHistoryTable() {
  knex.schema.createTable('history', column => {
    column.string('symbol')
    column.string('time_to_target')

  }).then(() => console.log('history table created'))
}

module.exports = knex
