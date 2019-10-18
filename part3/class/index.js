const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const Note = require('./models/note')


const app = express()

app.use(express.static('build'))
app.use(bodyParser.json())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path: ', request.path)
  console.log('Body: ', request.body)
  console.log('---')
  next()
}



app.use(requestLogger)

app.use(cors())

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request,response) =>{
    Note.find({}).then(notes => {
      response.json(notes.map(note => note.toJSON()))
    })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id)
    .then(note => {
      if(note){
        response.json(note.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
    return maxId + 1
}

app.post('/api/notes', (request, response) => {

  const body = request.body

  if(body.content === undefined){
    return response.status(400).json({
      error:'content missing'
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save().then(savedNote => {
    response.json(savedNote.toJSON())
  })
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)


const errorHandler = (errro, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError' && error.king === 'ObjectId'){
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

// handler of request with result to errors
app.use(errorHandler)


//const { port } = require('./config')
const { PORT } = require('./config')
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`)
})
