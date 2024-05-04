const express = require("express")
const app = express()
const PORT = process.env.PORT || 3001
const morgan = require("morgan")
const cors = require("cors")

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(morgan("tiny"))

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
]

const generateId = () => {
  return Math.floor(Math.random() * 10 ** 10)
}

app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
  )
})

app.get("/api/persons", (req, res) => {
  res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find((note) => note.id === id)
  if (!person) res.status(404).end()
  res.json(person)
})

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter((note) => note.id !== id)
  res.status(204).end()
})

app.post("/api/persons/", (req, res) => {
  const { name, number } = req.body
  const isNameUnique = persons.find((note) => note.name === name)

  if (!(name && number))
    res.status(400).json({
      error: "some field(s) are missing",
    })

  if (isNameUnique)
    res.status(400).json({
      error: "name must be unique",
    })

  const person = {
    id: generateId(),
    name,
    number,
  }

  persons.push(person)
  res.json(person)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
