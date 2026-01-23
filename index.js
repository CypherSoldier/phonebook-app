const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const app = express()

app.use(morgan('tiny'))
app.use(express.json())
app.use(express.static('dist'))

const Contact = require('./models/contact')

// obj
let contacts = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
    const maxId = Math.floor(Math.random() * 100)
    return String(maxId + 1)
}


app.post('/api/contacts', (req, res) => {
    const body = req.body
    
    if (!body.name  || !body.number) {
        return res.status(400).json({error: 'name must be unique' })
    }

    const contact = new Contact({
        id: generateId(),
        name: body.name,
        number: body.number
    })

    contact.save().then(savedContact => {
        response.json(savedContact)
    })
})


app.get('/api/contacts/:id', (req, res) => {
    const id = req.params.id

    Contact.findById(id).then(contact => {
    res.json(contact)
  })

})

app.delete('/api/contacts/:id', (req, res) => {
    const id = req.params.id
    contacts = contacts.filter(c => c.id !== id)

    res.status(204).end()
})

app.get('/api/contacts', (req, res) => {
    Contact.find({}).then(contact => {
        res.json(contact)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})