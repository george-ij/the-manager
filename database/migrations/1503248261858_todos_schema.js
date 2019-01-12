'use strict'

const Schema = use('Schema')

class TodosSchema extends Schema {
  up () {
    this.create('todos', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('task_id').unsigned().references('id').inTable('tasks')
      table.integer('status_id').unsigned().references('id').inTable('statuses').defaultTo(3)
      table.string('title', 254).notNullable()
      table.string('details', 254).notNullable()
      // table.string('proposedStartDate', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('todos')
  }
}

module.exports = TodosSchema
