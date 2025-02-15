import express from "express"
import dbConnect from "./config/database.js "
import { cloudinaryConnect } from "./config/cloudinary";
const app=express()
// require('dotenv').config({path:'./env'}); // one way-> but this way takes away consistency of code
// we can use improved version
import dotenv from "dotenv";
dotenv.config({
    path:'./env'
})
const Port=process.env.PORT || 8000
//connecting to db->this will return promise
dbConnect()
.then(()=>{
    app.listen(Port,()=>{
        console.log(`server is running at http://localhost:${Port}`)
    })
})
.catch((err)=>{
    console.log("MongoDB connection failed !!",err);
})
// connecting to cloudinary
cloudinaryConnect();
