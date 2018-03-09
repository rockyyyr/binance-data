const knex = require('./knex')

function insert(table, data) {
  return new Promise((resolve, reject) => {
    knex(table).insert(data)
      .then(resolve())
      .catch(err => reject(err))
  })
}

function select(table, columns = '*') {
  return new Promise((resolve, reject) => {
    knex.select(columns).from(table)
      .then(result => resolve(result))
      .catch(err => reject(err))
  })
}

function selectWhere(table, key, value, columns = '*') {
  return new Promise((resolve, reject) => {
    knex.select(columns).from(table).where(key, value)
      .then(result => resolve(result))
      .catch(err => reject(err))
  })
}

function update(table, data, key, value) {
  return new Promise((resolve, reject) => {
    knex(table).where(key, value).update(data)
      .then(resolve())
      .catch(err => reject(err))
  })
}

function deleteFrom(table){
  return new Promise((resolve, reject) => {
    knex(table).del()
      .then(resolve())
      .catch(err => reject(err))
  })
}

function deleteWhere(table, key, value){
  return new Promise((resolve, reject) => {
    knex(table).del().where(key, value)
      .then(resolve)
      .catch(reject)
  })
}

module.exports = {
  insert,
  select,
  selectWhere,
  update,
  deleteFrom,
  deleteWhere
}