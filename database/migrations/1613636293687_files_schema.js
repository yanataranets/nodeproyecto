'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FilesSchema extends Schema {
  up () {
    this.create('files', (table) => {
      table.increments()
      table.string('username', 100)
      table.string('filename', 100)
      table.string('id_user').unsigned();
      table.string('id_user').references('users.id')
      table.timestamps()
      //
      // table.dropForeign('id_user', 'id')
      //
      // table.foreign('id_user')
      //   .references('id')
      //   .inTable('users')
      //   .onDelete('CASCADE')
    })

  }


  down () {
    this.drop('files')


    // this.dropForeignKey('id_user', 'id')
    // this.foreign('id_user')
    //   .references('id')
    //   .inTable('users')
    //   .onDelete('RESTRICT')
  }
}

module.exports = FilesSchema
