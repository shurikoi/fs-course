import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "098" },
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState()

  const handleAddNote = (event) => {
    event.preventDefault()
    const isUnique = persons.some(person => person.name == newName)

    if (isUnique)
      return alert(`${newName} is already added to phonebook`)

    setPersons([...persons, { name: newName, number: newNumber }])
    setNewName("")
    setNewNumber()
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddNote}>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={() => setNewName(event.target.value)}
          />
          <br />
          number:{" "}
          <input
            value={newNumber}
            onChange={() => setNewNumber(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name} {person.number}</p>
      ))}
    </div>
  )
}

export default App
