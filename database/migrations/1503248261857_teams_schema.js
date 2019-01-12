'use strict'

const Schema = use('Schema')

class TeamsSchema extends Schema {
  up () {
    this.create('teams', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('project_id').unsigned().references('id').inTable('projects')
      table.integer('memberPermission_id').unsigned().references('id').inTable('team_member_permissions').defaultTo(1)
      table.timestamps()
    })
  }

  down () {
    this.drop('teams')
  }
}

module.exports = TeamsSchema
