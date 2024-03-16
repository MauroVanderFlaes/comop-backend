const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
}) 

app.get('/api/v1/challenges', (req, res) => {res.send('This are the challenges')})

app.put('/api/v1/challenges/:id', (req, res) => {res.send('UPDATE CHALLENGES' + req.params.id)})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

