import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , number: '01232424' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
      number: newNumber
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }
  return (
    <div>
      <h2>Phonebook</h2>
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
      
      <h2>Numbers</h2>
       <ul>
      {persons.map((person) => (
       <li key={person.name}>{person.name} {person.number}</li>
      ))}
    </ul>
    </div>
  )
}

export default App