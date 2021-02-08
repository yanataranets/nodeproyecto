'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UploadsSchema extends Schema {
  up () {
    this.create('uploads', (table) => {
      table.increments()
      table.string('file')
      table.timestamps()
    })
  }

  down () {
    this.drop('uploads')
  }
}

module.exports = UploadsSchema
