import mongoose from "mongoose";


const {Schema} = mongoose;

const carSchema = new Schema({

    carName:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    location:{
        address:{
            type: String,
            required: true
        },
        state:{
            type: String,
            required: true
        },
        country:{
            type: String,
            required: true
        },
        zipcode:{
            type: String,
            required: true
        }
    },
    price:{
        type: Number,
        required: true
    },
    google_map_link:{
        type: String,
        required: true
    },
    carType:{
        type: String,
        required: true
    },
    carRentDuration:{
        type:String,
        required:true
    },
    images:[
        {
            type: String,
            required: true
        }
    ],
    isavailable:{
        type: Boolean,
        default: true
    },
    property_poster:{
        id:{
            type:String,
            required: true
        },
        name:{
            type:String,
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
    },
    carModel:{
        type: String,
        required: true
    },
})

const Car = mongoose.model("Car", carSchema);

export default Car;
