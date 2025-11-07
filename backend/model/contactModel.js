import mongoose from "mongoose";


const {Schema} = mongoose;

const contactschema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    }
})

const Contact = mongoose.model("Contact", contactschema);

export default Contact;