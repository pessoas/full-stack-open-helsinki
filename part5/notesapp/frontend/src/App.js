import React, {useState, useEffect} from 'react'

import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'
import loginService from './services/login'


const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        console.log('effect')
        noteService
            .getAll()
            .then(initialNote => {
                setNotes(initialNote)
            })
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            noteService.setToken(user.token)
        }
    }, [])
    //add a logout

    console.log(`render ${notes.length} notes`)

    const notesToShow = showAll ? notes : notes.filter(note => note.important)

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
        }

        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote('')
            })

        //setNotes(notes.concat(noteObject))
        //setNewNote('')
    }

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    const toggleImportanceOf = id => {
        console.log(
            `importance of ${id} needs to be toggled`
        )

        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote))
            })
            .catch(error => {
                setErrorMessage(
                    `Note '${note.content}' was already removed from the server`
                )
                setTimeout(() => {
                   setErrorMessage(null) 
                }, 5000)
                setNotes(notes.filter(n => n.id !== id))
            })
    }

    const rows = () => notesToShow.map(note => 
        <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
        />
    )

    const handleLogin = async (event) => {
        event.preventDefault()
        try{
            const user = await loginService.login({
                username, password
            })

            window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(user)
            )

            noteService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = async (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedNoteappUser')
        setUser(null)
    }

    // for later: refactor forms code to their own component

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                type='text'
                value={username}
                name='Username'
                onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                type='password'
                value={password}
                name='Password'
                onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type='submit'>login</button>
        </form>
    )

    const noteForm = () => (
        <form onSubmit={addNote}>
            <input
            value={newNote}
            onChange={handleNoteChange}
            />
            <button type='submit'>save</button>
        </form>
    )

    return (
        <div>
            <h1>Notes</h1>

            <Notification message={errorMessage} />

            <h2>Login</h2>

            {
                user === null 
                    ? loginForm()
                    : <div>
                        <p>{user.name} logged in 
                            <form onSubmit={handleLogout}>
                                <button type='submit'>logout</button> 
                            </form>
                        
                        </p>
                        {noteForm()}
                      </div>
            }

            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {rows()}
            </ul>

            <Footer />
        </div>
    )
}

export default App