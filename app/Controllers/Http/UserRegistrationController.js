'use strict'
const User = use('App/Models/User')
const log = use('App/Models/Log')
// const Mail = use('Mail')

class UserRegistrationController {
  async registerForm({view}) {
    return view.render('user/register_user')
  }

  async registerUser({request, response, session, auth}) {
    const newUser = new User()

    const firstName = request.input('firstName')
    const lastName = request.input('lastName')
    const email = request.input('email')
    const phoneNo = request.input('phoneNo')
    const password = request.input('password')
    const confirmPassword = request.input('confirmPassword')

    newUser.firstName = firstName
    newUser.lastName = lastName
    newUser.email = email
    newUser.phoneNo = phoneNo
    
    if ( password == confirmPassword ) {
        newUser.password = password
        

        // const oldUser = await User.findBy('password', password)
        // const user = await Hash.verify( request.input('password'), oldUser.password )
        
        
        // if ( user ) {
        //     session.flash({ 
        //        registerError: 'User Already Exist!'
        // })
        
        //     return response.redirect('back')
        
        // }

        // newUser.role_id = 'Guest'         

        await newUser.save()

        // await Mail.send('emails.welcome', newUser.toJSON(), (message) => {
        //     message
        //     .to(newUser.email)
        //     .from('wherever@gmail.com')
        //     .subject('Welcome to Crenet')
        // })

        session.flash({ 
            Message: 'User registered successfully!' 
        })

        await auth.login(newUser)
        
        const newLog = new log()

        newLog.user_id = auth.user.id
        newLog.action = 'User Sign Up and In session'
        newLog.details = `User_ID ${newLog.user_id} signed up and in`
        
        newLog.save()
        console.log(`log ========>>>>>>>>`, newLog.toJSON())

        const profile = `/profile/${newUser.id}`
        
        return response.redirect(profile)
        
        // // return response.redirect('/profile')
          
      } else {
          session.flash({ 
              Error: 'Password Mismatch!' 
          })
          
          return response.redirect('back')
          
      }
  }
}

module.exports = UserRegistrationController
