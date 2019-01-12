'use strict'

const Project = use('App/Models/Project')
const TeamMember = use('App/Models/Team')
const User = use('App/Models/User')
const log = use('App/Models/Log')

class ProjectController {
  async projects({ view }) {
    const project = await Project.all()

    return view.render('admin/project', {
      projects: project.toJSON()
    })
  }

  async singleView({ params, view }) {
    const project = await Project.find(params.id)
    await project.loadMany(['tasks', 'taskAssignedTo'])
    // const user = await User.all()

    console.log(`project and it's tasks =====>>>>`, project.toJSON())

    // const checkTeamMember = await TeamMember.query()
    // .where('project_id', project.id)
    // .fetch()

    // console.log(`Team: ${checkTeamMember}`)
    // const profile = await User.findBy('id', checkTeamMember.user_id)

    // console.log(`All team members: ${profile.toJSON()}`)
    // // console.log(`Found Members: ${profile.firstName} ${profile.lastName}`)

    return view.render('project/single', {
      project: project.toJSON(),
      // user: user.toJSON()
      // team_member: profile,
      // team_member_role: checkTeamMember.memberPermission_id
    })
  }

  async createForm({view, auth}) {
    return view.render('project/create', {
      profile_id: auth.user.id
    })
  }

  async createProject({request, response, session, auth}) {
    const createProject = new Project()

    const title = request.input('title')
    const detail = request.input('detail')
    const proposedStartDate = request.input('proposedStartDate')
    const proposedEndDate = request.input('proposedEndDate')
    const actualStartDate = request.input('actualStartDate')
    const actualEndDate = request.input('actualEndDate')

    createProject.title = title
    createProject.details = detail
    createProject.proposedStartDate = proposedStartDate
    createProject.proposedEndDate = proposedEndDate
    createProject.actualStartDate = actualStartDate
    createProject.actualEndDate = actualEndDate
    createProject.status_id = 3

    await createProject.save()

    const newTeamMember = new TeamMember()

    newTeamMember.user_id = auth.user.id
    newTeamMember.project_id = createProject.id
    newTeamMember.memberPermission_id = 4

    await newTeamMember.save()

    const newLog = new log()

    newLog.user_id = auth.user.id
    newLog.action = 'User created a Project and was added to project team'
    newLog.details = `User_ID ${newLog.user_id} created a Project_ID ${createProject.id} and was added to project team`

    newLog.save()
    console.log(`log ========>>>>>>>>`, newLog.toJSON())

    session.flash({
        Message: 'Project created successfully!'
    })

    return response.redirect(`/project/${createProject.id}`)
  }

  async editProject({ params, view }) {
    const project = await Project.find(params.id)

    return view.render('project/edit_project', {
      project: project
    })
  }

  async update({params, request, session, response}) {
      const project = await Project.find(params.id)

      const title = request.input('title')
      const detail = request.input('detail')
      const proposedStartDate = request.input('proposedStartDate')
      const proposedEndDate = request.input('proposedEndDate')
      const actualStartDate = request.input('actualStartDate')
      const actualEndDate = request.input('actualEndDate')
      const status_id = request.input('status_id')

      project.title = title
      project.details = detail
      project.proposedStartDate = proposedStartDate
      project.proposedEndDate = proposedEndDate
      project.actualStartDate = actualStartDate
      project.actualEndDate = actualEndDate
      project.status_id = status_id

      await project.save()

      session.flash({
          Message: 'Project updated successfully!'
      })

      return response.redirect('back')
  }

  // async changePasswordForm ({ params, view, response }) {
  //     const project = await Project.find(params.id)

  //     return view.render('user/change_password', {
  //         project: project
  //     })

  //     return response.redirect('/project')
  // }

  // async changePassword ({request, params, response, session }){
  //     const project = await Project.find(params.id)

  //     const password = request.input('password')
  //     const confirmPassword = request.input('confirmPassword')

  //     if ( password == confirmPassword ) {
  //         project.password = password

  //         await project.save()

  //         session.flash({
  //             Message: 'Password changed successfully!'
  //         })

  //     } else {
  //         session.flash({
  //             Error: 'Password Mismatch!'
  //         })
  //     }
  //     return response.redirect('back')
  // }

  async destroy({params, session, response}){
    const project = await Project.find(params.id)

    await project.delete()

    session.flash({
        Message: `${project.title} deleted successfully`
    })

    return response.redirect('/')

    // if (!project) {
    //     return response.redirect('/')
    // } else {
    //     return response.redirect('back')
    // }
  }
}

module.exports = ProjectController
