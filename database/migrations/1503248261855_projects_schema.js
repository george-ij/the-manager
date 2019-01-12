'use strict'

const Schema = use('Schema')

class ProjectsSchema extends Schema {
  up () {
    this.create('projects', (table) => {
      table.increments()
      table.string('title', 254).notNullable().unique()
      table.string('details', 254).notNullable().unique()
      table.string('proposedStartDate', 60).notNullable()
      table.string('proposedEndDate', 60).notNullable()
      table.string('actualStartDate', 60).notNullable()
      table.string('actualEndDate', 60).notNullable()
      table.integer('status_id').unsigned().references('id').inTable('statuses').defaultTo(3)
      table.timestamps()
    })
  }

  down () {
    this.drop('projects')
  }
}

module.exports = ProjectsSchema
