import { Schema,model } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()
const userSchema=new Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true //if we want to make a field searchable make it index true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String , //cloudinary url
        required:true,
    },
    coverImage:{
        type:String , //cloudinary url   
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required:[true,"Password is required"],
        min:[8,"Password should atleast of length 8, your {VALUE}"],
    },
    refreshToken:{
        type:String,

    }

},{timestamps:true});

//userSchema.pre("save",()=>{})// wrong as arrow function has no context of this keyword and we need it to access userSchema data

//we  have one problem this prehook will save password again and again every time user will try to update any field as it is a prehook and will run just before data is saved to db
// we only want to change password when we modify password
userSchema.pre("save",async function(next) {
    if (!this.isModified("password")) { // now only password will update when password field is modify
        return next();
    }
    this.password=await bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.isPasswordCorrect=async function (password) {
    return await bcrypt.compare(password,this.password) // gives result in true or false
}
userSchema.methods.generateAccessToken=function(){
    jwt.sign({
        // this is our payload/data
        _id:this._id, // we get from mongodb,
        userName:this.userName,
        fullName:this.fullName,
        email:this.email
    },process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
    }
  )
}
userSchema.methods.generateRefreshToken=function(){
    // refresh token has less info
    jwt.sign({
        _id:this._id,
    },process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
    }
  )
}
export const User=model("User",userSchema);