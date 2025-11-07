import mongoose from "mongoose";


const {Schema} = mongoose;

const reviewschema = new Schema({
    name:{
        type: String,
        required: true
    },
    position:{
        type: String,
        required: true
    },
    profile:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    }
},{timestamps:true})

const Review = mongoose.model("Review", reviewschema);

export default Review;