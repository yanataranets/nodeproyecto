'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MaterialSchema extends Schema {
  up () {
    this.create('materials', (table) => {
      table.increments()
      table.string('cantidad')
      table.string('descripcion')
      table.timestamps()
    })
  }

  down () {
    this.drop('materials')
  }
}

module.exports = MaterialSchema
