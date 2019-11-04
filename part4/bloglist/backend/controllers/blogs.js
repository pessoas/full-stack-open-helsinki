const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const allBlogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(allBlogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)

    const decodedToken = await jwt.verify(request.token, process.env.SECRET)

    const user = await User.findById(decodedToken.id)

    if (blog.user.toString() === user.id) {
      await Blog.findByIdAndRemove(request.params.id)
      user.blogs = user.blogs.filter(b => !(b.toString() === blog.id))
      await user.save()
      response.status(204).end()
    } else {
      // console.log(blog.user)
      return response.status(401).json({ error: 'user not allowed' })
    }
  } catch (exception) {
    next(exception)
  }
  /*
  try{
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  } */
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  /*
  const token = getTokenFrom(request)

  try{
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!token || !decodedToken.id){
      return response.status(401).json({ error: 'token missing or invalid' })
    } */
  try {
    const decodedToken = await jwt.verify(request.token, process.env.SECRET)

    const user = await User.findById(decodedToken.id)

    // transfer to blog schema
    if (body.url === undefined && body.title === undefined) {
      return response.status(400).json({
        error: 'title or url is missing'
      })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  try {
    const blog = await Blog.findById(request.params.id)
    blog.likes = body.likes

    await blog.save()
    response.json(blog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
