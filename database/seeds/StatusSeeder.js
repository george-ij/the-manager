'use strict'
const Database = use('Database')

/*
|--------------------------------------------------------------------------
| StatusSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class StatusSeeder {
  async run () {
    const statuses = await Database
    .from('statuses')
    .insert([
      {status_label: 'Cancelled'},
      {status_label: 'Suspended'},
      {status_label: 'Ongoing'},
      {status_label: 'Completed'}
    ])
  }
}

module.exports = StatusSeeder
