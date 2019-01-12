'use strict'
const Database = use('Database')
const Hash = use('Hash')

/*
|--------------------------------------------------------------------------
| SuperAdminSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class SuperAdminSeeder {
  async run () {
    await Database.raw('SET FOREIGN_KEY_CHECKS = 0;')
    await Database.truncate('users')
    const encryptedPassword = await Hash.make('p@55')

    const SuperAdmin = await Database
    .table('users')
    .insert({
      firstName: 'Super',
      lastName: 'Admin',
      email: 'geordola@gmail.com',
      phoneNo: '07010134810',
      password: encryptedPassword,
      role_id: 6
    })
    await Database.raw('SET FOREIGN_KEY_CHECKS = 1;')
  }
}

module.exports = SuperAdminSeeder
