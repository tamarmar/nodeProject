const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const bodyParsr = require('body-parser')

const UserRouter = require('./UserRouter')

app.get('/',(req,res)=>{res.send('Hello world!!')});

app.use(cors())

app.use(bodyParsr.json())

app.use('/users', UserRouter)


// const connectionParams = {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// }

// mongoose.connect("mongodb://localhost:27017/ProjectData", connectionParams)
//     .then(() => {
//         console.log('connected to db')
//     }).catch(err => {
//         console.log(err)
//     })


// app.listen(process.env.PORT, () => { console.log(`listening port ${process.env.PORT}`) })
app.listen(5005, () => { console.log(`listening port ${5005}`) })