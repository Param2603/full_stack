import express from 'express'
import 'dotenv/config'
import connectDB from './config/db.js'
import userRouter from './routes/userRouter.js'
import cors from 'cors'
import productRouter from './routes/productRouter.js'
const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.urlencoded({ extended: true })) 
app.use(express.json())

app.use('/api/v1/user', userRouter)
app.use('/api/v1/product', productRouter)

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log("server is not connected")
    }
    connectDB()
    console.log("server is connected:", process.env.PORT)
})