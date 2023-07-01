const connecttoMongo=require('./db');
connecttoMongo();
const express = require('express')
const app = express()
const port = 3000
//MIDDLE WARE
app.use(express.json())

//homepage
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//route for api/auth and api/notes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})