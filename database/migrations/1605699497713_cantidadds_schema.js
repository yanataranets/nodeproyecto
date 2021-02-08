'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CantidaddsSchema extends Schema {
  up () {
    this.create('cantidadds', (table) => {
      table.increments()
      table.string('dia', 100)
      table.date('fecha',100)
      table.time('horasentrada')
      table.time('horassalida')
      table.string('horasservicio')
      table.string('horasviaje')
      table.string('km')
      table.bool('comida')
      table.bool('percrocta')
      table.timestamps()
    })
  }

  down () {
    this.drop('cantidadds')
  }
}

module.exports = CantidaddsSchema
