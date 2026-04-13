import { useState } from 'react'

const App = () => {
   const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
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
      id: persons.length + 1
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

 const personsToShow = filterPerson === '' ? persons : persons.filter(person => 
      person.name.toLowerCase().includes(filterPerson.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={addName}>
        <div>
          filter shown with <input 
                    value={filterPerson} 
                    onChange={(event) => setFilterPerson(event.target.value)} 
                />
        </div>
      </form>
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
        {personsToShow.map(person => 
          <li key={person.id}>{person.name} {person.number}</li>
        )}
      </ul>
    </div>
  )
}

export default App