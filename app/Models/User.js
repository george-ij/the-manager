'use strict'

const Hash = use('Hash')
const Model = use('Model')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  projects () {
    return this
    .belongsToMany('App/Models/Project', 'user_id', 'project_id')
    .pivotTable('teams')
  }

  todos () {
    return this.hasMany('App/Models/Todo')
  }

  note () {
    return this.hasMany('App/Models/Note')
  }

  generalReport () {
    return this.hasMany('App/Models/GeneralReport')
  }

  contactReport () {
    return this.hasMany('App/Models/ContactReport')
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = User
