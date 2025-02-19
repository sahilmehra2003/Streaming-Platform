import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const uploadOnCloudinary=async(localFilePath,name,quality,height)=>{
     try {
        if (!localFilePath) {
            throw new Error("couldn't find local path")
        }
       
       // instead of multiple if statement we can object spread (...(condition && {key:value})
       const options={
         resource_type:"auto",
         overwrite:false,
         folder:"Streaming Platform",
         ...(name && {public_id:name}),
         ...(height && {height}),
         ...(quality && {quality}),
     }
      //   if (name) {
      //       options.folder=folder; 
      //    }
      //   if (name) {
      //      options.public_id=name; 
      //   }
      //   if (height) {
      //       options.height=height; 
      //    }
      //   if (quality) {
      //      options.quality=quality; 
      //   }
        const response= await cloudinary.uploader.upload(localFilePath,options)
        console.log("file uploaded successfully",response);
        return response;
     } catch (error) {
        // if file is on server and not uploaded it may be because it is corrupt so we need to remove it from server
        fs.unlinkSync(localFilePath)//remove the locally saved temporary file as upload operation failed
        console.error("Error in uploading to cloudinary: ",error);
     }
}



export {uploadOnCloudinary}
