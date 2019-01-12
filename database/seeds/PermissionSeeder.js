'use strict'
const Database = use('Database')

/*
|--------------------------------------------------------------------------
| PermissionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class PermissionSeeder {
  async run () {
    const permissions = await Database
    .from('team_member_permissions')
    .insert([
      {permission_label: 'Guest'}, 
      {permission_label: 'Editor'}, 
      {permission_label: 'Developer'}, 
      {permission_label: 'Creator'}, 
      {permission_label: 'Manager'}
    ])
  }
}

module.exports = PermissionSeeder
