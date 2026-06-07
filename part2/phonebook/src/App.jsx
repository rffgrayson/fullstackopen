import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filterPerson, setFilterPerson }) => {
  return (
    <div>
      filter shown with <input 
        value={filterPerson} 
        onChange={(event) => setFilterPerson(event.target.value)} 
      />
    </div>
  )
}

const PersonForm = ({ addName, newName, setNewName, newNumber, setNewNumber }) => {
  return ( 
    <div>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName} 
            onChange={(event) => setNewName(event.target.value)} 
          />
        </div>
        <div>
          number: <input 
            value={newNumber} 
            onChange={(event) => setNewNumber(event.target.value)} 
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = ({ personsToShow }) => {
  return (
    <div>
      <ul>
        {personsToShow.map(person => 
          <li key={person.id}>{person.name} {person.number}</li>
        )}
      </ul>
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPerson, setFilterPerson] = useState('')

  const addName = (event) => {
      
      event.preventDefault() 

      const returnedValue = persons.find(
      person => person.name.toLowerCase() === newName.trim().toLowerCase()
      )

      if (returnedValue) {
        alert (`${newName} is already added to phonebook`)
        return
      }

      const nameObject = {
        name: newName,
        number: newNumber,
      }
      axios
        .post('http://localhost:3001/persons', nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
      })
  }

  const hook = () => {
  axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
}

  useEffect(hook, [])
  
 const personsToShow = filterPerson === '' ? persons : persons.filter(person => 
      person.name.toLowerCase().includes(filterPerson.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterPerson={filterPerson} setFilterPerson={setFilterPerson} />
      <h2>Phonebook</h2>
      <PersonForm addName={addName} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App