import React from 'react'
import Note from './components/Note'
import axios from 'axios'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      notes: [],
      newNote: '',
      showAll: true
    }
  }

  toggleImportance = () => {
    return () => {
      console.log('importance of needs to be toggled')
    }
  }

  toggleImportanceOf = (id) => {
    return () => {
      const url = `http://localhost:3001/notes/${id}`
      const note = this.state.notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }
  
      axios
        .put(url, changedNote)
        .then(response => {
          this.setState({
            notes: this.state.notes.map(note => note.id !== id ? note : changedNote)
          })
        })
    }
  }

  toggleVisible = () => {
    this.setState({ showAll: !this.state.showAll })
  }

  addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: this.state.newNote,
      date: new Date().new,
      important: Math.random() > 0.5
    }

    axios
      .post('http://localhost:3001/notes', noteObject)
      .then(response => {
        this.setState({
          notes: this.state.notes.concat(response.data),
        newNote: ''
        })
      })
  }

  componentWillMount() {
    console.log('will mount')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ notes: response.data })
      })
  }

  handleNoteChange = (event) => {
    console.log(event.target.value)
    this.setState({ newNote: event.target.value })
  }

  render() {
    const notesToShow =
      this.state.showAll ?
        this.state.notes :
        this.state.notes.filter(note => note.important === true)

    const label = this.state.showAll ? 'vain tärkeät' : 'kaikki'

    return (
      <div>
        <h1>Muistiinpanot</h1>
        <div>
          <button onClick={this.toggleVisible}>
            näytä {label}
          </button>
        </div>
        <ul>
          {notesToShow.map(note => 
            <Note 
              key={note.id} 
              note={note}
              toggleImportance={this.toggleImportance(note.id)} 
            />
          )}
        </ul>
        <form onSubmit={this.addNote}>
          <input 
            value={this.state.newNote} 
            onChange={this.handleNoteChange}
          />
          <button type="submit">tallenna</button>
        </form>
      </div>
    )
  }
}

export default App