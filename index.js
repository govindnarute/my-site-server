const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

//Routes import

const postRoutes = require('./routes/posts')
const userRoute = require('./routes/auth')

//Middleware
app.use(cors())
app.use(bodyParser.json())
app.use('/api/v1/admin/posts', postRoutes)
app.use('/api/v1/admin', userRoute)
//api

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'api working !!!!'
  })
})
mongoose.set('useFindAndModify', false)
mongoose.connect(
  'mongodb+srv://govindnarute:govindnarute@mbcluster-uiku0.mongodb.net/my-site?retryWrites=true&w=majority',
  { useNewUrlParser: true },
  () => {
    console.log('connected to mongo')
  }
)
//running server
app.listen(port, () => {
  console.log('App runnning on port #{port}' + port)
})
