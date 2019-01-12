'use strict'

const Model = use('Model')

class Task extends Model {
  taskAssignedTo (){ 
    return this.belongsTo('App/Models/User')
  }
  project(){ 
    return this.belongsTo('App/Models/Project')
  }
}

module.exports = Task
