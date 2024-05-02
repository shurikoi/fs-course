import { useState } from "react"
import PersonForm from "./PersonForm"
import Persons from "./Persons"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "098" },
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

  const handleAddNote = (event) => {
    event.preventDefault()
    const isUnique = persons.some((person) => person.name == newName)

    if (isUnique) return alert(`${newName} is already added to phonebook`)

    setPersons([...persons, { name: newName, number: newNumber }])
    setNewName("")
    setNewNumber("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm
        handleAddNote={handleAddNote}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App
