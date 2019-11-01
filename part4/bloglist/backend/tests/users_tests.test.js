const mongoose = require('mongoose')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../tests/test_helper')
const bcrytp = require('bcrypt')

const api = supertest(app)

beforeEach( async () => {
  await User.deleteMany({})

  //const userObjects = helper.initialUsers.map(user => new User(user))
  //const promiseArray = userObjects.map(user => user.save())
  const promiseArray = helper.initialUsers.map(async user => {
    //user.save()
    await api
      .post('/api/users')
      .send(user)
      .expect(200)
  })

  await Promise.all(promiseArray)
  /*for (let user of helper.initialUsers) {
    let saltRounds = 10
    let passwordHash = await bcrytp.hash(user.password, saltRounds)
    let newUser = {
      username: user.username,
      name: user.name,
      passwordHash,
    }
    let userObject = new User(newUser)
    await userObject.save()
  }*/
  /*
  const userObjects = helper.initialUsers.map(async user => {
    const saltRounds = 10
    const passwordHash = await bcrytp.hash(user.password, saltRounds)
    const newUser = new User({
      username: user.username,
      name: user.name,
      passwordHash
    })

    return newUser
  })
  
  await Promise.all(userObjects)
  console.log(userObjects)
  const promiseArray = userObjects.map(user => user.save()) 
  await Promise.all(promiseArray)*/
})

describe('username validations', () => {
  test('if username is already on database return error', async () => {
    const user = {
      username: 'rpessoa',
      name: 'renato',
      password: 'hahaha'
    }

    await api 
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(helper.initialUsers.length)
  })

  test('if username is not passed throw error', async () => {
    const usersAtStart = await helper.usersInDb()
    const user = {
      name: 'renato',
      password: 'hahaha'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('if username is less than 3 characters throw error', async () => {
    const usersAtStart = await helper.usersInDb()
    const user = {
      username: 'rr',
      name: 'renato',
      password: 'hahaha'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('if username is ok adds to database', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'rgalindo',
      name: 'rennan',
      password: 'hahaha'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const username = usersAtEnd.map(user => user.username)
    expect(username).toContain(newUser.username)
  })
}) 

describe('password tests', () => {
  test('if password is not passed an error is thrown', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'rgalindo',
      name: 'rennan',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)

    const username = usersAtEnd.map(u => u.username)
    expect(username).not.toContain(newUser.username)
  })

  test('if password is less than 3 characters throw error', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'rgalindo',
      name: 'rennan',
      password: 'ha'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)

    const username = usersAtEnd.map(u => u.username)
    expect(username).not.toContain(newUser.username)
  })

  test('if everything is correct user is added to db', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'rgalindo',
      name: 'rennan',
      password: 'hahaha'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})