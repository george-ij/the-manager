'use strict'

const Schema = use('Schema')

class GeneralReportSchema extends Schema {
  up () {
    this.create('general_reports', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      // table.string('Goal').notNullable().unique()
      table.string('Title').notNullable()
      table.string('Details').notNullable().unique()
      // table.string('generalReportNumber').notNullable().unique()
      // table.string('Challenges').notNullable().unique()
      // table.string('nextGoal').notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('general_reports')
  }
}

module.exports = GeneralReportSchema
