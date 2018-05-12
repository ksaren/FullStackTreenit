import React from 'react';
import Person from './components/Person'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: props.persons,
      newName: '',
      newNumber: '',
      showThese: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber,
      id: this.state.persons.length + 1,
    }

    const persons = this.state.persons.some(p => p.name===personObject.name) ?
    this.state.persons:
    this.state.persons.concat(personObject)

    this.setState({
      persons,
      newName: '',
      newNumber: ''
    })
  }

  handleNameChange = (event) => {
    this.setState({newName: event.target.value})
  }

  handleNumberChange = (event) => {
    this.setState({newNumber: event.target.value})
  }

  handleRestrictions = (event) => {
    this.setState({showThese: event.target.value})
  }

  render() {
    const personsToShow =
      this.state.showThese.length < 1 ?
        this.state.persons:
        this.state.persons.filter(
          p => p.name
          .toLowerCase()
          .includes(this.state.showThese.toLowerCase())
        )
  


    return (
      <div>
        <h1>Phone Book</h1>

        <Filter 
          value={this.state.showThese}
          handleFilterChange={this.handleRestrictions}
        />
        <ContactForm 
          changeName={this.handleNameChange}
          changeNumber={this.handleNumberChange}
          addContact={this.addPerson}
          nameValue={this.state.newName}
          numberValue={this.state.newNumber}
        />
        <h2>Numbers:</h2>
        <ul>
          {personsToShow.map(p => <Person key={p.id} person={p}/>)}
        </ul>     
      </div>
    )
  }
}

export default App