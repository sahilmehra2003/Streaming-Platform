import express from "express";
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app=express();
// cors>Explore
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
// best practices to handle api data
app.use(express.json({limit:"16k"}));

// url data 
app.use(express.urlencoded({extended:true,limit:"16k"}))//allows nested object
app.use(express.static("public")) //public is folder name
app.use(cookieParser()); 


// routes import
import userRouter from './routes/user.routes.js'


// routes declaration
app.use('/api/v1/users',userRouter);
// http://localhost:5000/api/v1/users/register

// dummy route
app.get('/',(req,res)=>{
    res.send(`<h1>welcome to mega youtube project</h1>`)
})


export default app;
