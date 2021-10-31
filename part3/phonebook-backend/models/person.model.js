const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(con => {
        console.log('connected to MongoDB');
    })
    .catch(err => {
        console.log(`error connecting to MongoDB: ${err.message}`);
    });

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

personSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
    }
});

// Person model
const Person = mongoose.model('Person', personSchema);


module.exports = Person;