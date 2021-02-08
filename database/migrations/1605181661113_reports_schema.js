'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReportsSchema extends Schema {
  up () {
    this.create('reports', (table) => {
      table.increments()
      table.string('numerodeproyecto', 100)
      table.string('algo', 100)
      table.string('numerodedocumento', 100)
      table.string('num', 100)
      table.string('ed', 100)
      table.string('cliente', 100)
      table.string('cif', 100)
      table.string('dirrecion', 100)
      table.string('codigopostal', 100)
      table.string('poblacion', 100)
      table.string('provincia', 100)
      table.string('telefono', 100)
      table.string('tecnico', 100)
      table.string('trabajosrealizados', 100)
      table.string('cantidadadds', 100)
      table.timestamps()
    })
  }

  down () {
    this.drop('reports')
  }
}

module.exports = ReportsSchema
