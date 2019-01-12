'use strict'
const log = use('App/Models/Log')

class AuthenticatedController {
    async logout({ auth, response }) {
        const newLog = new log()

        newLog.user_id = auth.user.id
        newLog.action = 'Log Out session'
        newLog.details = `User_ID ${newLog.user_id} logged out`
        
        newLog.save()
        console.log(`log ========>>>>>>>>`, newLog.toJSON())

        await auth.logout()

        return response.redirect('/')
  
    }
}


module.exports = AuthenticatedController
