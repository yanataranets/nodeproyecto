'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FilesSchema extends Schema {
  up () {
    this.create('files', (table) => {
      table.increments()
      table.string('username', 100)
      table.string('filename', 100)
      table.timestamps()
    })
  }

  down () {
    this.drop('files')
  }
}

module.exports = FilesSchema
