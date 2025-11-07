import mongoose from "mongoose";
import validator from "validator";


const {Schema} = mongoose;

const userschema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate:[validator.isEmail,"please enter a valid email"]
    },
    password:{
        type: String,
        required: true,
        minlength: 8,
        select: false,
    },
    isverified:{
        type: Boolean,
        default: false,
    },
    role:{
        type: String,
        enum: ['user', 'admin',"agent"],
        default: 'user'
    },
    otpCode:{
        type: Number,
        default: null
    },
    otpCodeExpiredAt:{
        type: Date,
        default: null
    },
    profile:{
        type:String
    },
    finance:{
        completedProperties:{
            type: Number,
            default: 0
        },
        totalProperties:{
            type: Number,
            default: 0
        }
    },
    address:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
        unique: true,
    },

    // agent fields

    facebook_link:{
        type: String
    },
    twitter_link:{
        type: String
    },
    linkedin_link:{
        type: String
    },
    agent_type:{
        type: String,
        enum: ['rental', 'seller',"buyer","commercial","individual","dual"]
    },
    yourself:{
        type: String
    },
    agent_experience:{
        type: String
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
            rating:Number,
            message:String
        }
    ]

})
userschema.pre("save", function (next) {
    if (this.role === "user") {
        this.reviews = undefined;
        this.numofreviews = undefined;
        this.rating = undefined;
    }
    next();
});



const User = mongoose.model("User", userschema);

export default User;