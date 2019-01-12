'use strict'

const Schema = use('Schema')

class UserRolesSchema extends Schema {
  up () {
    this.create('user_roles', (table) => {
      table.increments()
      table.string('role_label', 254).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('user_roles')
  }
}

module.exports = UserRolesSchema
