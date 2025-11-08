import { configureStore } from "@reduxjs/toolkit";
import User from "./slice/userSlice"
import Property from "./slice/propertySlice" 
import PropertyContact from "./slice/propertyContactSlice" 
import Admin from "./slice/adminSlice" 
import Contact from "./slice/contactSlice" 
import Review from "./slice/reviewSlice" 
import Service from "./slice/serviceSlice" 
import Car from "./slice/carSlice" 


const store = configureStore({
    reducer:{
        User,
        Property,
        PropertyContact,
        Admin,
        Contact,
        Review,
        Service,
        Car
    }
})

export default store;