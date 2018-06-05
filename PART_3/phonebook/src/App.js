import React from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import Notification from './components/Notification'
import Error from './components/Error'
import ContactForm from './components/ContactForm'
import personService from './services/persons'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      showThese: '',
      message: null,
      error: null
    }
  }
  
  componentDidMount() {
    personService.getAll()
    .then(persons => {
      this.setState({ persons })
    })
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }
    if(this.state.persons.some(p => p.name===personObject.name)) {
      if(window.confirm('' + personObject.name +' is already in phonebook. Update number?')) {
        const id = this.state.persons.find(p => p.name===personObject.name).id
        const changedPerson = { ...personObject, number: this.state.newNumber}

        personService.update(id, changedPerson)
        .then(changedPerson => {
          const persons = this.state.persons.filter(p => p.id.toString() !== id.toString())
          this.setState({
          persons: persons.concat(changedPerson),
          newName: '',
          newNumber: '',
          message: changedPerson.name+' succesfully updated!'
          })
          setTimeout(() => {
            this.setState({message: null})
          }, 5000)
        }) //then end   
        .catch(error => {
          const persons = this.state.persons.filter(p => p.id.toString() !== id.toString())
          this.setState({ 
            persons,
            error: 'Item is recently removed from phone book. Try again to add person!',
            })
          setTimeout(() => {
            this.setState({error: null})
          }, 5000)
        })            
      } else {
        this.setState({
          newName: '',
          newNumber: ''
          })
      }

    } else {
      personService.create(personObject)
      .then(person => {
       // const persons = this.state.persons.some(p => p.name===personObject.name) ?
       // this.state.persons:
        const persons = this.state.persons.concat(person)
    
        this.setState({
          persons,
          newName: '',
          newNumber: '',
          message: person.name+' succesfully added to phone book!'
        })
        setTimeout(() => {
          this.setState({message: null})
        }, 5000)
        })
      }
    }      
  

  removePerson = (event) => {
    event.preventDefault()
    const id = event.target.id
    const person = this.state.persons.find(p => p.id.toString()===id.toString())
    if(window.confirm('Confirm removing '+person.name+'?')) {
      personService.remove(id)
      .then(p => {
        //Ao. ei toimi jos !==, selvitä miksei...
        const remainderPersons = this.state.persons.filter(p => p.id.toString() !== id.toString())
        console.log('Then:',remainderPersons)
        this.setState({ 
          persons: remainderPersons,
          message: person.name+' succesfully removed from phone book!'
          })
        setTimeout(() => {
          this.setState({message: null})
        }, 5000)
      })
      .catch(error => {
        personService.getAll()
          .then(persons => {
            this.setState({ 
              persons, 
              error: 'Item is already removed from phone book.'
            })
          })
  
        setTimeout(() => {
          this.setState({error: null})
        }, 5000)
      })
    }
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
        <Notification message={this.state.message} />
        <Error message={this.state.error} />

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
        <table>
          <tbody>
          {personsToShow.map(p => 
            <Person 
              key={p.id}
              person={p}
              buttonHandler={this.removePerson}
            />
          )}
          </tbody>
        </table>     
      </div>
    )
  }
}

export default App