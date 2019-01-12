'use strict'

const Schema = use('Schema')

class ContactReportSchema extends Schema {
  up () {
    this.create('contact_reports', (table) => {
      table.increments()
      table.string('contactReportNumber').notNullable().unique()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.string('Subject').notNullable().unique()
      table.string('meetingLocation').notNullable()
      table.string('meetingDate').notNullable()
      table.string('companyName').notNullable()
      table.string('clientAttendees').notNullable()
      table.integer('agencyAttendees').unsigned().references('id').inTable('users').notNullable()
      table.string('thirdPartyAttendees')
      table.string('meetingSummary').notNullable().unique()
      table.string('actionPoint').notNullable().unique()
      table.integer('actionAssignedUser').unsigned().references('id').inTable('users').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('contact_reports')
  }
}

module.exports = ContactReportSchema
