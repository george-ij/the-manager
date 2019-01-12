'use strict'

const User = use('App/Models/User')

class AdminController {
  async all_users({ view }) {
    const user = await User.all()

    return view.render('admin/dashboard', {
      users: user.toJSON()
    })
  }
}

module.exports = AdminController
