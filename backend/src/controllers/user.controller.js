 import {asyncHandler} from '../utils/asyncHandler.js'

// method created
 const registerUser=asyncHandler(async(req,res)=>{
     res.status(200).json({
        success:true,
        message:"route working"
    })
 })

export {registerUser};

