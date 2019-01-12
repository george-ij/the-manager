'use strict'

const Schema = use('Schema')

class TasksSchema extends Schema {
  up () {
    this.create('tasks', (table) => {
      table.increments()
      table.integer('project_id').unsigned().references('id').inTable('projects')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('status_id').unsigned().references('id').inTable('statuses').defaultTo(3)
      table.string('title', 254).notNullable()
      table.string('detail', 254).notNullable()
      table.string('proposedStartDate', 60).notNullable()
      table.string('proposedEndDate', 60).notNullable()
      table.string('actualStartDate', 60).notNullable()
      table.string('actualEndDate', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TasksSchema
