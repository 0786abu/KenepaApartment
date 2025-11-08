import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cars:[],
    totalCars:null,
    car:null,
    createcarloading:false,
    carloading:false,
    deletecarloading:false,
    updateloading:false
}

const carSlice = createSlice({
    name:"Car",
    initialState,
    reducers:{
        setCreateCarLoading:(state,action)=>{
            if(action.payload=== undefined){
                state.createcarloading=true
            }else{
                state.createcarloading=action.payload
            }
        },
        setFetchCars:(state,action)=>{
            state.carloading = false,
            state.cars = action.payload.cars
            state.totalCars = action.payload.allcars
        },
        setCarLoading:(state)=>{
            state.carloading = true
        },
        setFetchCar:(state,action)=>{
            state.carloading = false;
            state.car = action.payload
        },
        setDeleteCar:(state,action)=>{
          state.cars = state.cars.filter(car=>car._id !== action.payload._id)  
        },
        setCarUpdate:(state,action)=>{
            state.cars = state.cars.map((car)=>car._id === action.payload._id ? action.payload : car)
        },
        setDeleteCarLoading:(state,action)=>{
            if(action.payload=== undefined){
                state.deletecarloading=true
            }else{
                state.deletecarloading=action.payload
            }
        },
        setUPdateLoading:(state,action)=>{
            if(action.payload=== undefined){
                state.updateloading=true
            }else{
                state.updateloading=action.payload
            }
        },
    }
})
export const {setCreateCarLoading,setFetchCars, setCarLoading, setDeleteCar,setDeleteCarLoading, setFetchCar, setCarUpdate,setUPdateLoading} = carSlice.actions
export default carSlice.reducer