import React, {useState, useEffect} from 'react'

import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'


const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState('some error happened...')

    useEffect(() => {
        console.log('effect')
        noteService
            .getAll()
            .then(initialNote => {
                setNotes(initialNote)
            })
    }, [])

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
    return (
        <div>
            <h1>Notes</h1>

            <Notification message={errorMessage} />

            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {rows()}
            </ul>
            <form onSubmit={addNote}>
                <input 
                    value={newNote}
                    onChange={handleNoteChange}
                    placeholder='insert note'
                />
                <button type='submit'>save</button>
            </form>
        </div>
    )
}

export default App