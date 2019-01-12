'use strict'
const User = use('App/Models/User')
const Hash = use('Hash')
const log = use('App/Models/Log')

class LoginController {
    async login ({ request, auth, session, response }) {

    // Get Form Data
    const email = request.input('email')
    const password = request.input('password')

    // Find user based on email submitted
    const user = await User.findBy('email', email)

    // If user is found, verify password provided against that stored in the DB
    if ( user ) {
        // Verify the password
        const passwordVerified = await Hash.verify( password, user.password )

        // If verified, login user
        if ( passwordVerified ) {
        await auth.login(user)

        const newLog = new log()

        newLog.user_id = auth.user.id
        newLog.action = 'Log In session'
        newLog.details = `User_ID ${newLog.user_id} logged in`
        
        newLog.save()
        console.log(`log ========>>>>>>>>`, newLog.toJSON())

        return response.route(`/profile/${user.id}`)
        }
    }

    // If user isn't found,display an error message
    session.flash({
        Error: `We could't verify your credentials. Please ensure you typed in the right details`
    })

    return response.redirect('back')

    }
}

module.exports = LoginController