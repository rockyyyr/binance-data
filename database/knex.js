const knex = require('knex')({
  client: 'mysql2',
  connection: process.env.CLEARDB_DATABASE_URL || require('./config.json'),
  pool: {
    max: 7,
    min: 0
  }
})

knex.schema.dropTableIfExists('data')
knex.schema.hasTable('data').then(exists => !exists ? createDataTable() : '')

function createDataTable() {
  knex.schema.createTable('data', column => {
    column.string('start_time')
    column.string('symbol')
    column.decimal('change')
    column.decimal('price', 16, 8)
    column.decimal('target', 16, 8)
    column.string('end_time')
    
  }).then(() => console.log('data table created'))
}

module.exports = knex
