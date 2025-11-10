import express from 'express'
import cors from 'cors'
import 'dotenv/config'
const app=express();
import connectDB from './config/mongodb';
const port=process.env.PORT||4000
connectDB();
app.use(express.json())
app.use(cors())
app.get('/',(req,res)=>{
    res.send('API WORKING');
})
app.listen(port,()=>console.log('Server is strating on PORT: '+port));