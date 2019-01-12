'use strict'

const Schema = use('Schema')

class TeamMemberPermissionsSchema extends Schema {
  up () {
    this.create('team_member_permissions', (table) => {
      table.increments()
      table.string('permission_label', 254).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('team_member_permissions')
  }
}

module.exports = TeamMemberPermissionsSchema
