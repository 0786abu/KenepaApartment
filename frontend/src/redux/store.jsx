import { configureStore } from "@reduxjs/toolkit";
import User from "./slice/userSlice"
import Property from "./slice/propertySlice" 
import PropertyContact from "./slice/propertyContactSlice" 
import Admin from "./slice/adminSlice" 
import Contact from "./slice/contactSlice" 
import Car from "./slice/carSlice" 


const store = configureStore({
    reducer:{
        User,
        Property,
        PropertyContact,
        Admin,
        Contact,
        Car
    }
})

export default store;