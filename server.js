const express = require('express')
const app = express()

// Connect to Mongo
require('./config/db')()

// Middleware
app.use(express.json({ extended: true }))

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the api' })
})

// Routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
