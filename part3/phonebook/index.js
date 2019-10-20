const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

const app = express()


// app uses
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())

//app.use(morgan('tiny'))

morgan.token('data', (request, response) => {
    return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

// app routes

app.get('/', (request, response) => {
    response.send('<h1>Hello There</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons.map(person => person.toJSON()))
    })
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info of ${persons.length} people</p><p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    //console.log(request.params.id)
    Person.findById(request.params.id)
        .then(person => {
            //console.log(person)
            response.json(person.toJSON())
        })
    
})

app.delete('/api/persons/:id', (request, response, next) => {

    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {

    const body = request.body

    if(body.name === undefined || body.number === undefined) {
        return response.status(400).json({
            error: 'name or number is missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson.toJSON())
    })
})



//functions

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  app.use(unknownEndpoint)

const { PORT } = require('./config')
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
