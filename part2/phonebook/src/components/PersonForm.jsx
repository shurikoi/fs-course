const PersonForm = ({ handleAddNote, newName, setNewName, newNumber, setNewNumber }) => (
  <form onSubmit={handleAddNote}>
    <div>
      name:{" "}
      <input value={newName} onChange={() => setNewName(event.target.value)} />
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
)

export default PersonForm