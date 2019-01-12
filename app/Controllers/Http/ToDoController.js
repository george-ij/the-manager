'use strict'
const User = use('App/Models/User')
const Todo = use('App/Models/Todo')

class ToDoController {
  async createTodoForm({ view, auth }) {
    console.log(`Auth ID`, auth.user.id)

    return view.render('user/todo/create_todo', {
        profileID: auth.user.id
    })
}

async createTodo({ request, view, auth }) {
    const newTodo = new Todo()

    const title = request.input('title')
    const details = request.input('details')

    newTodo.user_id = auth.user.id
    newTodo.task_id = null
    newTodo.status_id = 3
    newTodo.title = title
    newTodo.details = details

    await newTodo.save()

    // const reportWriter = await User.find(newTodo.reportWriter)

    return view.render('user/todo/single', {
        todo: newTodo.toJSON()
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
}

module.exports = ToDoController
