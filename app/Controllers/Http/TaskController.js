'use strict'
const Task = use('App/Models/Task')
const User = use('App/Models/User')
const Project = use('App/Models/Project')
const log = use('App/Models/Log')

class TaskController {
  async singleView({ view, params }){
    const viewTask = await Task.find(params.id) 
    await viewTask.load('project') 
    const user = await User.all()

    return view.render('project/tasks/single', {
      task: viewTask.toJSON(),
      users: user.toJSON()
    })
  }

  async createTaskForm({params, view}) {
    const project = await Project.find(params.id)
    const user = await User.all()

    return view.render('/project/tasks/create_task_form', {
      users: user.toJSON(),
      project: project.toJSON()
    }) 
  }

  async createTask ({ request, session, response, auth }){
    const task = new Task()

    const title = request.input('title')
    const detail = request.input('detail')
    const proposedStartDate = request.input('proposedStartDate')
    const proposedEndDate = request.input('proposedEndDate')
    const actualStartDate = request.input('actualStartDate')
    const actualEndDate = request.input('actualEndDate')
    const project_id = request.input('project_id')
    const user_id = request.input('user_id')

    task.project_id = project_id
    task.user_id = user_id
    task.title = title
    task.detail = detail
    task.proposedStartDate = proposedStartDate
    task.proposedEndDate = proposedEndDate
    task.actualStartDate = actualStartDate
    task.actualEndDate = actualEndDate
    task.status_id = 3

    await task.save()

    const newLog = new log()

    newLog.user_id = auth.user.id
    newLog.action = 'User created a task under a project'
    newLog.details = `User_ID ${newLog.user_id} created task task_id ${task.id}, under Project Project_ID ${task.project_id}.`
    
    newLog.save()
    console.log(`log ========>>>>>>>>`, newLog.toJSON())

    session.flash({ 
        Message: 'Task created successfully!' 
    })

    return response.redirect(`/project/${project_id}`)
  }
}

module.exports = TaskController
