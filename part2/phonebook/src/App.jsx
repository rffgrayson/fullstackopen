import { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <div>
      <ul>
        {personsToShow.map(person => 
          <li 
            key={person.id}>{person.name} {person.number}
            <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
          </li>
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
          if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
              const updatedPerson = { ...returnedValue, number: newNumber }

              personService
                .update(returnedValue.id, updatedPerson)
                .then(returnedPerson => {
                    setPersons(persons.map(person => person.id !== returnedValue.id ? person : returnedPerson))
                    setNewName('')
                    setNewNumber('')
            })
          }
        return
    }

      const nameObject = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })


  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App