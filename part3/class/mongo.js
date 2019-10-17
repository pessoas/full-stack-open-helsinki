const mongoose = require('mongoose')
/*
if ( process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}
*/


const { password } = require('./config')

const url = `mongodb+srv://fullstack:${password}@cluster0-2e1jk.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'Study HARD',
    date: new Date(),
    important: false,
})
/*
note.save().then(response => {
    console.log('note saved!')
    mongoose.connection.close()
})

*/

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})