'use strict'

const Schema = use('Schema')

class NotesSchema extends Schema {
  up () {
    this.create('notes', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('title').notNullable().unique()
      table.string('details').notNullable().unique()
      // and image
      table.timestamps()
    })
  }

  down () {
    this.drop('notes')
  }
}

module.exports = NotesSchema
