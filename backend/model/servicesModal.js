import mongoose from "mongoose";


const {Schema} = mongoose;

const serviceschema = new Schema({
    service_title:{
        type: String,
        required: true
    },
    service_description:{
        type: String,
        required: true
    },
    service_icon:{
        type: String,
        required: true
    },
    poster:{
        userid:{
            type:String,
            required:true
        },
        name:{
            type: String,
            required: true
        },
        profile:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        }
    }
},{timestamps:true});


const Service = mongoose.model("Service",serviceschema);

export default Service;    