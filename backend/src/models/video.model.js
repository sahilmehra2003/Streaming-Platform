import { Schema,model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
const videoSchema=new Schema({
     videoFile:{
        type:String, //cloudinary url
        required:true,
     },
     thumbnail:{
        type:String,
        required:true,
        trim:true
     },
     owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
     },
     title:{
        type:String,
        required:true,
     },
     description:{
        type:String,
     },
     duration:{
        type:Number, // you will get it from cloudinary data
        required:true
     },
     views:[
        {
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true,
            default:0
        }
     ],
     isPublished:{
        type:Boolean,
        required:true
     }



},{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video=model("Video",videoSchema)