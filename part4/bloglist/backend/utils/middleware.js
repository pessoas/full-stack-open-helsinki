const morgan = require('morgan')

morgan.token('data', (request, response) => {
  return JSON.stringify(request.body)
})

const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :data')

const unknownEndPoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id ' })
  }
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndPoint,
  errorHandler
}
