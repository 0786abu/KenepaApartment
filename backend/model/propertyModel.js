import mongoose from "mongoose";


const {Schema} = mongoose;

const propertyschema = new Schema({

    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    property_detail:{
        type: String,
        required: true
    },
    location:{
        address:{
            type: String,
            required: true
        },
        featuredcity:{
            type: Boolean,
            default: false
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
    featured:{
        type: Boolean,
        default: false
    },
    property_type:{
        type: String,
        required: true
    },
    propertyDuration:{
        type:String,
        required:true
    },
    posteddate:{
        type: String,
        required: true
    },
    propertyid:{
        type: Number,
        required: true,
        unique: true
    },
    size:{
        type: Number,
        required: true
    },
    images:[
        {
            type: String,
            required: true
        }
    ],
    amenities:[
        {
            type: String,
            required: true
        }
    ],
    isavailable:{
        type: Boolean,
        default: true
    },
    category:{
        type: String,
        required: true
    },
    rooms:{
        type: Number,
        required: true
    },
    bathrooms:{
        type: Number,
        required: true
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
    years_of_build:{
        type: Number,
        required: true
    },
    rating:{
        type: Number
    },
    numofreviews:{
        type: Number
    },
    reviews:[
        {
            userid:String,
            name:String,
            profile:String,
            rating:Number,
            message:String,
            date:{
                type: Date,
                default: Date.now
            }
        }
    ]
})

const Property = mongoose.model("Property", propertyschema);

export default Property;