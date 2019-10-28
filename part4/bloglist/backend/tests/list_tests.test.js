const listHelper = require('../utils/list_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

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
  //console.log(blog)
  const blogObjects = blog.body
  const promiseArray = blogObjects.map(blog => expect(blog.id).toBeDefined())
  //expect(blog.body[0].id).toBeDefined()
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

afterAll(() => {
  mongoose.connection.close()
})


test('dummy return one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)

  expect(result).toBe(1)
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
})

