const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(err => {
        console.log(`error connecting to MongoDB: ${err.message}`)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
        unique: true,
    },
    number: {
        type: String,
        minLength: 8,
        required: true,
    },
})

personSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
    }
})

// Plugin uniqueValidator
personSchema.plugin(uniqueValidator)

// Person model
const Person = mongoose.model('Person', personSchema)


module.exports = Person