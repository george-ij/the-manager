'use strict'

const Model = use('Model')

class Project extends Model {
  tasks () {
    return this.hasMany('App/Models/Task')
  }

  taskAssignedTo(){ 
    return this.belongsToMany('App/Models/User', 'project_id', 'user_id')
    .pivotTable('tasks')
  }
}

module.exports = Project
