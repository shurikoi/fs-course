import { useState, useEffect } from "react"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import axios from "axios"
import { getAll } from "./services/notes"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

  useEffect(() => {
    getAll().then((response) =>
      setPersons(response.data)
    )
  }, [])

  const handleAddNote = (event) => {
    event.preventDefault()
    const isUnique = persons.some((person) => person.name == newName)
    const lastDbId = persons.slice(-1)[0]?.id

    if (isUnique) return alert(`${newName} is already added to phonebook`)

    axios
      .post("http://localhost:3001/persons", {
        name: newName,
        number: newNumber,
        id: lastDbId + 1,
      })

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
