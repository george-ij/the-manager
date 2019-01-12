'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use('Route')

Route.on('/').render('index')
Route.post('/login', 'LoginController.login').as('adminLogin')
Route.get('/logout', 'AuthenticatedController.logout')

Route.get('/registerform', 'UserRegistrationController.registerForm')
Route.post('/register', 'UserRegistrationController.registerUser')

Route.group(() => {
    Route.get('/redirect_profile', 'UserController.redirect_profile').as('redirect_profile')
    Route.get('/:id', 'UserController.profile').as('userProfile')
    Route.get('/:id/edit', 'UserController.editProfile')
    Route.get('/:id/password_form', 'UserController.changePasswordForm')
    Route.get('/:id/change_password', 'UserController.changePassword')
    Route.put('/:id', 'UserController.update')
    Route.delete('/:id/delete', 'UserController.destroy')

    Route.get('/:id/create_note_form', 'NoteController.noteForm')
    Route.post('/:id/create_note', 'NoteController.createNote')
    Route.get('/note/:id', 'NoteController.singleView')

    Route.get('/:id/create_todo_form', 'TodoController.createTodoForm')
    Route.post('/:id/create_todo', 'TodoController.createTodo')
    Route.get('/todo/:id', 'TodoController.singleView')

    Route.get('/:id/create_general_report_form', 'ReportController.generalReportForm')
    Route.post('/:id/create_general_report', 'ReportController.createGeneralReport')
    Route.get('/general-report/:id', 'GeneralReport.singleView')

    Route.get('/:id/create_contact_report_form', 'ReportController.contactReportForm')
    Route.post('/:id/create_contact_report', 'ReportController.createContactReport')
    Route.get('/contact-report/:id', 'contactReport.singleView')
}).prefix('/profile')

Route.group(() => {
    Route.get('/app', 'UserController.index')
}).middleware(['auth'])

Route.group(() => {
    Route.get('', 'AdminController.all_users')
    Route.get('/projects', 'ProjectController.projects')
}).prefix('/dashboard')

Route.group(() => {
    Route.get('/create_project_form', 'ProjectController.createForm')
    Route.post('/create_project', 'ProjectController.createProject')
    Route.get('/:id', 'ProjectController.singleView')
    Route.get('/:id/edit', 'ProjectController.editProject')
    Route.put('/:id', 'ProjectController.update')
    Route.delete('/delete/:id', 'ProjectController.destroy')

    Route.get('/single/:id', 'TaskController.singleView')

    Route.get('/:id/team_form', 'TeamController.createTeam_form')
    Route.post('/:id/create_team', 'TeamController.createTeam')

    Route.get('/:id/create_task_form', 'TaskController.createTaskForm')
    Route.post('/:id/create_task', 'TaskController.createTask')
}).prefix('/project')
