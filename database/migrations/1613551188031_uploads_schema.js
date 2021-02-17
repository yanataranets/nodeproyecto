'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UploadsSchema extends Schema {
  up () {
    this.create('uploads', (table) => {
      table.increments()
      table.string('usuario_nombre')
      table.string('file_nombre')
      table.timestamps()
    })
  }
  down () {
    this.drop('uploads')
  }
}
module.exports = UploadsSchema
