const mongoose = require('mongoose')

if(process.argv.length >= 3){
    
    const password = process.argv[2]
    const name = process.argv[3]
    const number = process.argv[4]

    //console.log(`pass:${password} name:${name} num:${number}`)

    const url = `mongodb+srv://fullstack:${password}@cluster0-2e1jk.mongodb.net/phonebook-app?retryWrites=true&w=majority`

    mongoose.connect(url, { useNewUrlParser: true })

    const personSchema = new mongoose.Schema({
            name: String,
            number: Number,
        })

    const Person = mongoose.model('Person', personSchema)
    
    if(process.argv.length === 3) {
        console.log('Phonebook:')
        Person.find({}).then(result => {
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
    }else{
        const person = new Person({
            name: name,
            number: number,
        })
    
        person.save().then(response => {
            console.log('contact saved')
            mongoose.connection.close()
        })
    }
}else {
    console.log('Give password, name and number as arguments in this order. If name has white charecters it must be enclosed in quotes')
    process.exit(1)
}
