import express from "express"
import dbConnect from "./config/database.js "
const app=express()
// require('dotenv').config({path:'./env'}); // one way-> but this way takes away consistency of code
// we can use improved version
import dotenv from "dotenv";
dotenv.config()

//connecting to db
dbConnect();
