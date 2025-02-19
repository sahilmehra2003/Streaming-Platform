import {v2 as cloudinary} from 'cloudinary'
const cloudinaryConnect=()=>{
    try {
        return cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.CLOUD_KEY,
            api_secret:process.env.CLOUD_SECRET
        
        })
    } catch (error) {
        console.log("Error in connecting to cloudinary: ",error);
    }
}
export {cloudinaryConnect}