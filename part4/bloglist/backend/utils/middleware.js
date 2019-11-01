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
  //console.error(error)
  //console.error(error.name)
  //console.error(error.errors.username.kind)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id ' })
  }else if(error.name === 'ValidationError' && error.errors.username.kind === 'required'){
    return response.status(400).send({ error: 'username is required' })
  }else if(error.name === 'ValidationError' && error.errors.username.kind === 'minlength'){
    return response.status(400).send({ error: 'username is too short' })
  }else if(error.name === 'ValidationError' && error.errors.username.kind === 'unique'){
    return response.status(400).send({ error: 'username already registered '})
  }
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndPoint,
  errorHandler
}
