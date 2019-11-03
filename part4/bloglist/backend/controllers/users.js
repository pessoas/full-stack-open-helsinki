const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1, url: 1 })
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  try{

    const body = request.body
    
    if(!body.password) {
      return response.status(400).json({ error: "password not provided" })
    }else if(body.password.length <= 3){
      return response.status(400).json({ error: "password too short" })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const newUser = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await newUser.save()

    response.json(savedUser)
  }catch(exception){
    next(exception)
  }
})

module.exports = usersRouter