'use strict'
const Note = use('App/Models/Note')

class NoteController {
  async noteForm({ view, auth }){
    return view.render('user/note/create_note', {
      profileID: auth.user.id,
    })
  }
  
  async createNote({ request, view, auth }){
      const newNote = new Note()
  
      const title = request.input('title')
      const details = request.input('details')
      
      newNote.user_id = auth.user.id  
      newNote.title = title 
      newNote.details = details 
      
      await newNote.save()

      return view.render('user/note/single', {
          dateNoteCreated: newNote.created_at,
          dateNoteUpdated: newNote.updated_at,
          title: newNote.title,
          details: newNote.details
      })
  }
}

module.exports = NoteController
