'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('firstName', 80).notNullable()
      table.string('lastName', 80).notNullable()
      table.string('email', 254).notNullable()
      table.string('phoneNo', 254).notNullable()
      table.string('password', 60).notNullable().unique()
      table.integer('role_id').unsigned().references('id').inTable('user_roles').defaultTo(1)
      table.timestamps('deleted_at')
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
