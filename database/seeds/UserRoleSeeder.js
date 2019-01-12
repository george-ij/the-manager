'use strict'
const Database = use('Database')

/*
|--------------------------------------------------------------------------
| UserRoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class UserRoleSeeder {
  async run () {
    const user_roles = await Database
    .from('user_roles')
    .insert([
      {role_label: 'Guest'},
      {role_label: 'Students'},
      {role_label: 'Interns'},
      {role_label: 'Staffs'},
      {role_label: 'Admin'}, 
      {role_label: 'Super Admin'}
    ])
  }
}

module.exports = UserRoleSeeder
