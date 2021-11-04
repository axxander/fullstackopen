const mongoose = require('mongoose')

// Define Schema and Model
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

// Connect to MongoDB cluster
const password = process.argv[2]
const url =
    `mongodb+srv://fullstack:${password}@cluster0.wveyy.mongodb.net/phonebook-app?retryWrites=true&w=majority`
mongoose.connect(url)

const getAll = async () => {
    return await Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    }).catch(err => {
        throw err
    })
}

const argsLength = process.argv.length
if (argsLength === 3) {
    // fetch all contacts
    try {
        console.log('phonebook:')
        getAll()
    } catch (err) {
        console.log(err)
    }
} else if (argsLength === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })
    person.save().then(() => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
    })
} else {
    console.log('bad request')
}




