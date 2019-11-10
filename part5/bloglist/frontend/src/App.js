import React, {useState, useEffect} from 'react'

import blogsService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import Notification from './components/Notification'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [mType, setMType] = useState(null)

  useEffect(() => {
    //console.log('loading bloglist')
    blogsService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  },[])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(username)
    console.log(password)
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      blogsService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      setMType('ok')
      setMessage('Successful login')
      setTimeout(() => {setMessage(null)}, 5000)
    }
    catch (exception) {
      setMType('error')
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  } 

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)

    setMType('ok')
    setMessage('User logged out')
    setTimeout(() => {setMessage(null)}, 5000)
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    const response = await blogsService.create(newBlog)
    setBlogs(blogs.concat(response))
    
    setAuthor('')
    setTitle('')
    setUrl('')

    setMType('ok')
    setMessage(`The blog: ${response.title} by ${response.author} was added`)
    setTimeout(() => {setMessage(null)}, 5000)
  }

  const blogList = () => blogs.map(blog => 
    <Blog
      blog={blog} 
      key={blog.id}
    />
  )

  const logout = () => (
    <form onSubmit={handleLogout}> 
      <button type='submit'>logout</button>
    </form>
  )

  const loginForm = () => (
    <div>
      <h3>Login</h3>

      <form onSubmit={handleLogin}>
        username: <input 
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
          placeholder='insert username'
        />
        <br></br>
        password: <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
          placeholder='insert password'
        />
        <br></br>
        <button type='submit'>login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <h3>Add a new blog:</h3>

      <form onSubmit={handleNewBlog}>
        title: <input 
          type='text'
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)}
          placeholder='insert blog title'
          /><br></br>
        author: <input
          type='text'
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)} 
          placeholder='insert blog author'
          /><br></br>
        url: <input
          type='text'
          value={url}
          name='URL'
          onChange={({ target }) => setUrl(target.value)}
          placeholder='insert blog url'
          /><br></br>
        <button type='submit'>add</button>
      </form>
    </div>
  )

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification message={message} type={mType} />
      {
        user === null
          ? loginForm()
          : <div>
              <p>User {user.name} is logged in </p> {logout()}
              {blogForm()}
              <ul>
                {blogList()}
              </ul>
            </div>
      }
    </div>
  )
}

export default App
