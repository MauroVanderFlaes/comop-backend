const express = require('express')
const app = express()
const port = 3000
const apiGyms = require('./routes/api/v1/gyms')

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// }) 

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/comop').then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

app.use(express.json());
app.use('/api/v1/gyms', apiGyms)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

