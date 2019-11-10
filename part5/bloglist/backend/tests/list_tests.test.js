const listHelper = require('../utils/list_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const returnedBlogs = await api.get('/api/blogs')
  expect(returnedBlogs.body.length).toBe(helper.initialBlogs.length)
})

test('unique identifier is named id', async () => {
  const blog = await api.get('/api/blogs')
  // console.log(blog)
  const blogObjects = blog.body
  const promiseArray = blogObjects.map(blog => expect(blog.id).toBeDefined())
  // expect(blog.body[0].id).toBeDefined()
  await Promise.all(promiseArray)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'A List of Fun Things You Can Build as a Developer',
    author: 'Daan',
    url: 'https://medium.com/better-programming/a-list-of-fun-things-you-can-build-as-a-developer-bc07fd21c6e3',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const title = blogsAtEnd.map(blog => blog.title)
  expect(title).toContain('A List of Fun Things You Can Build as a Developer')
})

test('if valid blog without likes is passed, likes equal 0', async () => {
  const newBlog = {
    title: 'A List of Fun Things You Can Build as a Developer',
    author: 'Daan',
    url: 'https://medium.com/better-programming/a-list-of-fun-things-you-can-build-as-a-developer-bc07fd21c6e3'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const savedNote = blogsAtEnd[blogsAtEnd.length - 1]
  expect(savedNote.likes).toBe(0)
})

test('if title of url are missing server returns error 400', async () => {
  const newBlogNoUrlNoTitle = {
    author: 'Daan',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlogNoUrlNoTitle)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
})

test('if deleted return status code 204', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)
})

test('updating a blogs number of likes', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  blogToUpdate.likes = 100

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const blogUpdated = blogsAtEnd[0]

  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  expect(blogUpdated.likes).toBe(100)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(helper.initialBlogs)
    expect(result).toBe(36)
  })
})

describe('favourite blog', () => {
  const control = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12
  }

  test('of a empty list is null', () => {
    const result = listHelper.favouriteBlog([])
    expect(result).toEqual(null)
  })

  test('when list has only one blog equals to it', () => {
    const result = listHelper.favouriteBlog(helper.listWithOneBlog)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.favouriteBlog(helper.initialBlogs)
    expect(result).toEqual(control)
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})
