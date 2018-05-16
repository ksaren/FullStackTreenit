import React from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import axios from 'axios'
import noteService from './services/notes'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      newNote: 'uusi muistiinpano...',
      showAll: true,
      error: null
    }
    console.log('constructor')
  } 
  componentDidMount() {
    noteService.getAll()
      .then(notes => {
        this.setState({notes})
      })
  }
addNote = (event) => {
  event.preventDefault()
  const noteObject = {
    content: this.state.newNote,
    date: new Date().new,
    important: Math.random() > 0.5
  }
  noteService.create(noteObject)
    .then(newNote =>
      this.setState({
        notes: this.state.notes.concat(newNote),
        newNote: ''
      })
    )  
}

handleNoteChange = (event) =>{
  console.log(event.target.value)
  this.setState({newNote: event.target.value})
}

toggleVisible = () => {
  this.setState({showAll: !this.state.showAll})
}

toggleImportanceOf = (id) => {
  return () => {
    const note = this.state.notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService.update(id, changedNote)
      .then(changedNote => {
        const notes = this.state.notes.filter(n => n.id !== id)
        this.setState({
          notes: notes.concat(changedNote)
        })
      })
      .catch(error => {
        this.setState({ 
          notes: this.state.notes.filter(n => n.id !== id),
          error: `Note '${note.content}' has already removed from server.` 
        })
        setTimeout(() => {
          this.setState({error: null})
        }, 5000)
      })      
  }
}

  render() {
    console.log('rendering...')
    const notesToShow =
      this.state.showAll ?
        this.state.notes:
        this.state.notes.filter(note => note.important)
  

    const label = this.state.showAll ? 'only important': 'all'

    return (
      <div>
        <h1>Notes</h1>
        <Notification message={this.state.error} />
        <div>
          <button onClick={this.toggleVisible}>
          {label}
          </button>
        </div>
        <ul>
          {notesToShow.map(note =>
             <Note
               key={note.id} 
               note={note}
               toggleImportance={this.toggleImportanceOf(note.id)}
              />
          )}
        </ul>
        <form onSubmit={this.addNote}>
          <input 
            value={this.state.newNote}
            onChange={this.handleNoteChange}
          />
          <button type='submit'>save</button>
        </form>
      </div>
    )
  }
  
}

export default App
