import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }, { name: "Artoe Hellas" }])
  const [newName, setNewName] = useState("")
  console.log(newName)

  const handleAddNote = (event) => {
    event.preventDefault()
    setPersons([...persons, { name: newName }])
    setNewName("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddNote}>
        <div>
          name: <input value={newName} onChange={() => setNewName(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App
