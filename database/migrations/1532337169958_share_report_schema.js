'use strict'

const Schema = use('Schema')

class ShareReportSchema extends Schema {
  up () {
    this.create('share_reports', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('generalReport_id').unsigned().references('id').inTable('general_reports')
      table.integer('contactReport_id').unsigned().references('id').inTable('contact_reports')
      table.timestamps()
    })
  }

  down () {
    this.drop('share_reports')
  }
}

module.exports = ShareReportSchema
