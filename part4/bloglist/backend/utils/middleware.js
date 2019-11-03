const morgan = require('morgan')

morgan.token('data', (request, response) => {
  return JSON.stringify(request.body)
})

const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :data')

const unknownEndPoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request, res, next) => {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    //return authorization.substring(7)
    request.token = authorization.substring(7)
    //return request.token
  }
  next()
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
  }else if(error.name === 'JsonWebTokenError'){
    return response.status(401).json({ error: 'invalid token' })
  }
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndPoint,
  errorHandler,
  tokenExtractor
}
