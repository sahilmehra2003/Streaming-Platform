import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";
import dotenv from "dotenv";
dotenv.config() // we need to config dotenv file to read env variables

const MongoDBUri=process.env.MONGODB_URI;
const dbConnect=async()=>{
     try {
        const connectionInstance= await mongoose.connect(`${MongoDBUri}/${DB_NAME}`)
        
        console.log(`\n MongoDb connected !! DB Host: ${connectionInstance.connection.host}`)
        
     } catch (error) {
      // console.log("connection string",`${MongoDBUri}/${DB_NAME}`);
        console.log("MongoDb connection error: ",error)
        process.exit(1);
     }
}
export default dbConnect;