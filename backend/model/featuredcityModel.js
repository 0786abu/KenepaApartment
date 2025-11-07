import mongoose from "mongoose";


const {Schema} = mongoose;

const featuredcityschema = new Schema({
    cityname:{
        type: String,
        required: true
    },
    total_properties:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    poster:{
        id:{
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        profile:{
            type: String,
            required: true
        },
    }
},{timestamps:true})

const Feat_City = mongoose.model("Feat_City", featuredcityschema);

export default Feat_City;