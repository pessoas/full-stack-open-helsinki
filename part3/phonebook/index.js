const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

// hardcoded list of contacts
let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]


// app uses
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
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info of ${persons.length} people</p><p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if(person){
        response.json(person)
    }else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {

    const body = request.body

    //const person = persons.find(person => person.name.toUpperCase() === body.name.toUpperCase())

    if(body.name.length === 0 || body.number.length === 0){
        return response.status(400).json({
            error:'name or number is missing'
        })
    }else if(persons.find(person => person.name.toUpperCase() === body.name.toUpperCase())){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    //console.log('ini')

    const newContact = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
    //console.log('end')

    persons = persons.concat(newContact)

    response.json(newContact)
})



//functions
const generateId = () => {
    const id = persons.length > 0 
        ? Math.floor(Math.random() * (999999) + 1)
        : 1
    
    const person = persons.find(person => person.id === id)   
    
    //console.log(id)
    
    if(!person){
        return id
    }else{
        generateId()
    }
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
