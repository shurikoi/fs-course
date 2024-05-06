require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.get('/info', (req, res) => {
  Person.countDocuments({}).then((length) =>
    res.send(
      `<p>Phonebook has info for ${length} people</p><p>${new Date()}</p>`
    )
  )
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => res.json(persons))
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findOne({ _id: id })
    .then((person) => {
      if (person) res.json(person)
      else res.status(404).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons/', (req, res) => {
  const { name, number } = req.body
  // const findName = await Person.findOne({ name })
  // let isNameExists = !!findName

  if (!(name && number))
    res.status(400).json({
      error: 'some field(s) are missing',
    })

  // if (isNameExists)
  //   res.status(400).json({
  //     error: "name must be unique",
  //   })

  Person.insertMany([
    {
      name,
      number,
    },
  ]).then((person) => res.json(person[0]))
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error, next) => next(error))
})

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
