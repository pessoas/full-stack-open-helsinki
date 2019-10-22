const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const { url } = require('../config')

console.log(`Connecting to ${url}`)

//connect to MongoDb
mongoose.connect(url, { useNewUrlParser: true })
    .then(response => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log(`Error connecting to MongoDB: ${error.message}`)
    })

//Define the schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },
    number: {
        type: Number,
        min: 10000000,
        required: true,
    },
})


// Apply uniqueValidator to schema
personSchema.plugin(uniqueValidator)


personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)

