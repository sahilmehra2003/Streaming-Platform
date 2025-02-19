 import {asyncHandler} from '../utils/asyncHandler.js'
 import {User} from '../models/user.model.js'
import {ApiError, apiError}  from '../utils/ApiError.js'
import {uploadOnCloudinary} from '../utils/fileUpload.js'
import {ApiResponse} from "../utils/ApiResponse.js"
// method created
 const registerUser=asyncHandler(async(req,res)=>{
    // get user details from frontend
    const {fullName,email,userName,password}=req.body 
    
    // validation->fields are not missing
    // if (fullName) {
    //     throw new ApiError(400,"fullName is required")
    // }
    if (
        [fullName,email,userName,password].some((field)=>field?.trim()==="")
    ) {
        throw new ApiError(400,"All fields are required to register user");
    }
    // check if user already exists:username,email
        const existedUser=await User.findOne({
            $or: [{ email },{ userName }]// returns first document that contain email and userName
         })    
         if (existedUser) {
            throw new ApiError(409,"User already exists,move to login page")
         }
         // check for coverImage(optional),check if avatar files(mandatory)
        //  the file is currently at server
         const avatarLocalPath= req.files?.avatar[0]?.path // first propety contains object that contains its path
         console.log(req.files);
         const coverImageLocalPath= req.files?.coverImage[0]?.path
         
         if (!avatarLocalPath) {
            throw new ApiError(400,"Avatar file is required");
         }
    // upload them to cloudinary,avatar
         const avatar=await uploadOnCloudinary(avatarLocalPath,"avatar");
         const coverImage=await uploadOnCloudinary(coverImageLocalPath,"coverImage");
         if (!avatar) {
            throw new ApiError(400,"Avatar file not uploaded to cloudinary");
         }
    // create user object=>create entry in db
    const newUser=await User.create({
        fullName,
        email,
        userName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "", // it is not a required field
        userName:userName.toLowerCase
    })

      const createdUser=await User.findById(newUser._id).select(
        "-password -refreshToken",
      );
    //  remove password and refresh token field from response
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering user");
    }
     // return response
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered Succesfully")
    )
 })

export {registerUser};

