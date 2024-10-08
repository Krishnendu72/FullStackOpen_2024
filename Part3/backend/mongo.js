const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    content: /[0-9]+-[0-9]+/g,
    required: true
  }
})

const Person = mongoose.model('person', personSchema)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = Person