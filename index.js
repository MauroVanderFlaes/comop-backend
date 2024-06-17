const express = require('express')
const session = require('express-session')
const cors = require('cors');
const app = express()
const port = 3000
const apiGyms = require('./routes/api/v1/gyms')
const apiUsers = require('./routes/api/v1/users')
const apiChallenges = require('./routes/api/v1/challenges')
const apiGymfeed = require('./routes/api/v1/gymfeed')
const apiRewards = require('./routes/api/v1/rewards')
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

app.use(cors());

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Note: set secure to true in production with HTTPS
}));



app.use('/api/v1/gyms', apiGyms)
app.use('/api/v1/users', apiUsers)
app.use('/api/v1/challenges', apiChallenges)
app.use('/api/v1/gymfeed', apiGymfeed)
app.use('/api/v1/rewards', apiRewards)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

