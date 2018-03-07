const config = require('./config.json')
const knex = require('knex')(config)

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
