import { deleteNote } from "../services/notes"

const handleDeleteNote = ({ name, id }) => {
  if (window.confirm(`Delete ${name}`))
    deleteNote(id)
}

const Persons = ({ persons }) =>
  persons.map((person) => (
    <div key={person.name}>
      {person.name} {person.number}{" "}
      <button onClick={() => handleDeleteNote(person)}>Detele</button>
    </div>
  ))

export default Persons
