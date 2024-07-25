import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import todosRoute from './routes/todoRoute.js'

import cors from 'cors'
const app = express()
app.use(cors())
app.use(express.json())


dotenv.config()

const PORT = process.env.PORT
const MONGODB_URL = process.env.MONGODB_URL


app.get('/', (req, res) => {

    return res.status(200).send(`welcome to todos app backend`)
})

app.use('/todos', todosRoute)

mongoose.connect(MONGODB_URL).then(() => {
    console.log(`App connected to database`)
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((error) => {
    console.log(error)
})

