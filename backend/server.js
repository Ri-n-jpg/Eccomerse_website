import express from 'express'
import cors from 'cors'
import 'dotenv/config'
const app=express();
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
const port=process.env.PORT||4000
connectDB();
connectCloudinary();
app.use(express.json())
app.use(cors())
app.use('/api/user',userRouter)
app.get('/',(req,res)=>{
    res.send('API WORKING');
})
app.listen(port,()=>console.log('Server is strating on PORT: '+port));