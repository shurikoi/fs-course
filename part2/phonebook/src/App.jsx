import { useState, useEffect } from "react"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import { createNote, getAllNotes } from "./services/notes"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    getAllNotes().then((response) => setPersons(response.data))
    console.log(persons)
  }, [])

  const handleAddNote = (event) => {
    event.preventDefault()
    const isUnique = persons.some((person) => person.name == newName)
    const lastDbId = persons.slice(-1)[0]?.id

    if (isUnique) return alert(`${newName} is already added to phonebook`)
    createNote({
      name: newName,
      number: newNumber
    }).then((response) => {
      setPersons([...persons, response.data])
      setErrorMessage(`Added ${response.data.name}`)
      setTimeout(() => setErrorMessage(null), 5000)
    })

    setNewName("")
    setNewNumber("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
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
