const express = require('express')
const app = express()
const port = 3000
const apiGyms = require('./routes/api/v1/gyms')
const apiUsers = require('./routes/api/v1/users')
require('dotenv').config()

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// }) 

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

app.use(express.json());
app.use('/api/v1/gyms', apiGyms)
app.use('/api/v1/users', apiUsers)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

