const mongoose = require('mongoose')

const { url } = require('../config')

console.log(`Connecting to ${url}`)

mongoose.connect(url, { useNewUrlParser: true })
    .then(response => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log(`Error connecting to MongoDB: ${error.message}`)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)

