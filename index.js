const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('tiny'))
app.use(express.json())
app.use(express.static('dist'))

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
    
     // Check for duplicate name - SIMPLE!
    if (contacts.find(c => c.name === body.name)) {
        return res.status(400).json({error: 'name must be unique'})
    }
    

    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    contacts = contacts.concat(newPerson)
    res.json(newPerson)
})


app.get('/info', (req, res) => {
    res.send(`
        <h1>Phonebook has info for ${contacts.length} people</h1>
        <p>${new Date()}</p>
        `)
})


app.get('/api/contacts/:id', (req, res) => {
    const id = req.params.id
    const contact = contacts.find(c => c.id === id)

    if (contact) {
        res.json(contact)
    } else {
        res.status(404).end()
    }

})

app.delete('/api/contacts/:id', (req, res) => {
    const id = req.params.id
    contacts = contacts.filter(c => c.id !== id)

    res.status(204).end()
})

app.get('/api/contacts', (req, res) => {
    res.json(contacts)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})