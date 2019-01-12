'use strict'

const Schema = use('Schema')

class MeetingScheduleSchema extends Schema {
  up () {
    this.create('meeting_schedules', (table) => {
      table.increments()
      table.integer('scheduleWriter').unsigned().references('id').inTable('users').notNullable()
      table.string('Subject').notNullable().unique()
      table.string('Location').notNullable()
      table.string('meetingDate').notNullable()
      table.string('companyName').notNullable()
      table.string('clientAttendees')
      table.integer('agencyAttendees').unsigned().references('id').inTable('users').notNullable()
      table.string('thirdPartyAttendees')
      table.timestamps()
    })
  }

  down () {
    this.drop('meeting_schedules')
  }
}

module.exports = MeetingScheduleSchema
