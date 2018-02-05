import React from 'react';
import InputField from './components/InputField'
import SubmitButton from './components/SubmitButton'
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      limit: '',
      personsToShow: []
    }
  }

  componentWillUpdate() {
    personService
      .getAll()
      .then(p => {
        this.setState({ 
          persons: p,
          personsToShow: p
        })
      })
  }

  componentWillMount() {
    personService
      .getAll()
      .then(p => {
        this.setState({ 
          persons: p,
          personsToShow: p
        })
      })
  }
  
  updatePersonsToShow = (event) => {
    event.preventDefault()
    let newPersonsToShow = this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.limit))
    if (this.state.limit === '') {
      this.setState({
        personsToShow: this.state.persons
      })
    } else {
      this.setState({
        personsToShow: newPersonsToShow,
        limit: ''
      })
    }
  }

  removePerson = (name) => {
    
    personService
      .remove(name)

    this.setState(this.state)
        
  }

  addPerson = (event) => {
    event.preventDefault()
    this.setState({ limit: '' })

    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    let thisPerson = this.state.persons.filter(obj => obj.name === this.state.newName)[0]
    console.log(thisPerson)

    if (this.state.persons.find(obj => obj.name === this.state.newName)) {
      if ((thisPerson.number !== this.state.newNumber) && this.state.newNumber !== '') {

        personService
          .update(thisPerson.id, personObject)

        this.setState(this.state)

      } else {
        alert('The person ' + this.state.newName + ' is already on the list.')
      }
    } else {
      personService
        .create(personObject)
        .then(newPerson => {
          this.setState({
            persons: this.state.persons.concat(newPerson)
          })
        })
    }
    this.setState({
      newName: '',
      newNumber: ''
    })
  }
  
  handleNewNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNewNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleLimitChange = (event) => {
    this.setState({ limit: event.target.value })
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.updatePersonsToShow}>
          <InputField 
            label='rajaa hakusanalla ' 
            value={this.state.limit}
            onChange={this.handleLimitChange}
          />
          <SubmitButton text='rajaa/tyhjä nollaa'/>
        </form>

        <form onSubmit={this.addPerson}>
          <InputField 
            label='nimi: ' 
            value={this.state.newName}
            onChange={this.handleNewNameChange}
          />
          <InputField 
            label='numero: ' 
            value={this.state.newNumber}
            onChange={this.handleNewNumberChange}
          />
          <SubmitButton text='lisää' />
        </form>

        <h2>Numerot</h2>
        <ul>
          {this.state.personsToShow.map(
            person => 
              <li key={person.name}>
                {person.name} 
                {person.number}
                <button onClick={() => this.removePerson(person.id)} >delete this shit</button>
              </li>
            )}
        </ul>
      </div>
    )
  }
}

export default App
