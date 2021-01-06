'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PublishersSchema extends Schema {
  up () {
    this.create('publishers', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('publishers')
  }
}

module.exports = PublishersSchema
