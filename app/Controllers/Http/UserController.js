'use strict'
const User = use('App/Models/User')

class UserController {
    async redirect_profile({ response, auth }) {
        response.redirect(`/profile/${auth.user.id}`)
    }

    async index({view}) {
        return view.render('user/app')
    }

    async profile({view, params}) {
        const profile = await User.find(params.id)
        await profile.load('projects')
        await profile.load('todos')
        await profile.load('note')
        await profile.load('generalReport')
        await profile.load('contactReport')

        console.log(`profile, todos, notes and team=====>>>>`, profile.toJSON())

        // const checkTeamMember = await TeamMember.findBy('user_id', profile.id)

        // let createdProjectName, createdProjectID, ProjectName, ProjectID
        // if (checkTeamMember) {
        //     console.log(`Team Member ID: ${checkTeamMember.id}`)
        //     const foundProject = await Project.find(checkTeamMember.project_id)
        //     console.log(`Found project: ${foundProject.title}`)

        //     if (foundProject) {
        //         if (checkTeamMember.memberPermission_id == 4) {
        //          createdProjectName = foundProject.title
        //          createdProjectID = foundProject.id
        //         }

        //         if(checkTeamMember.memberPermission_id >= 1 && checkTeamMember.memberPermission_id !== 4) {
        //          ProjectName = foundProject.title
        //          ProjectID = foundProject.id
        //         }
        //     }
        // }

        return view.render('user/profile', {
            profile: profile.toJSON(),
            // created_project_name: createdProjectName,
            // created_project_id: createdProjectID,
            // project_name: ProjectName,
            // project_id: ProjectID
        })
    }

    async editProfile({ params, view }) {
        const profile = await User.find(params.id)

        return view.render('user/edit_profile', {
            profile: profile
        })
    }

    async update({params, request, session, response}) {
        const profile = await User.find(params.id)

        const firstName = request.input('firstName')
        const lastName = request.input('lastName')
        const email = request.input('email')
        const phoneNo = request.input('phoneNo')

        profile.firstName = firstName
        profile.lastName = lastName
        profile.email = email
        profile.phoneNo = phoneNo

        await profile.save()

        session.flash({
            Message: 'Profile updated successfully!'
        })

        return response.redirect(`/profile/${profile.id}`)
    }

    async changePasswordForm ({ params, view, response }) {
        const profile = await User.find(params.id)

        return view.render('user/change_password', {
            profile: profile
        })
    }

    async changePassword ({request, params, response, session }){
        const profile = await User.find(params.id)

        const password = request.input('password')
        const confirmPassword = request.input('confirmPassword')

        if ( password == confirmPassword ) {
            profile.password = password

            await profile.save()

            session.flash({
                Message: 'Password changed successfully!'
            })

        } else {
            session.flash({
                Error: 'Password Mismatch!'
            })
        }
        return response.redirect(`/profile/${profile.id}`)
    }

    async destroy({params, session, response}){
        const profile = await User.find(params.id)

        await profile.delete()

        session.flash({
            Message: `${profile.firstName} ${profile.lastName} deleted successfully`
        })

        return response.redirect('/')

        // if (!profile) {
        //     return response.redirect('/')
        // } else {
        //     return response.redirect('back')
        // }
    }
}

module.exports = UserController
