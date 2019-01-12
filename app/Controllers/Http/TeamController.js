'use strict'
const User = use('App/Models/User')
const Project = use('App/Models/Project')
const TeamMember = use('App/Models/Team')

class TeamController {
  async createTeam_form({ view, params }) {
    const user = await User.all()
    const project = await Project.find(params.id) 

    return view.render('/project/add_team_member_form', {
      users: user.toJSON(),
      project: project
    })
  }

  async createTeam({ request, response, session }) {
    const addedTeamMember = new TeamMember()
    
    const selectedMemberID = request.input('selectedMember')
    const project_id = request.input('project_id')

    console.log(`Selected Member IDs: ${selectedMemberID}`)
    console.log(`Selected Member Array Length: ${selectedMemberID.length}`)
    // const random = Math.floor(Math.random() * 2)
    // console.log(`Selected Random Position: ${selectedMemberID.[1]}`)
    
    for (let i = 0; i < selectedMemberID.length; i++) {
      addedTeamMember.user_id = selectedMemberID[i]
      addedTeamMember.project_id = project_id
      addedTeamMember.memberPermission_id = 1
      console.log(`Selected Member ID: ${selectedMemberID[i]}`)
      await addedTeamMember.save()
      console.log(`Saved: ${addedTeamMember.user_id}`)
    }

    // addedTeamMember.user_id = selectedMemberID
    // addedTeamMember.project_id = project_id
    // addedTeamMember.memberPermission_id = 1

    session.flash({ 
        Message: 'Team created successfully!' 
    })

    return response.redirect(`/project/${project_id}`)
  }
}

module.exports = TeamController
