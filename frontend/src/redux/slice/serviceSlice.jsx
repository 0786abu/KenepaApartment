import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    services:[],
    serviceloading: false,
    createserloading: false,
    servicedelloading: false,
    serviceupdateloading: false,
    error: null
}

const serviceSlice = createSlice({
    name:"Service",
    initialState,
    reducers:{
        setCraeteService:(state,action)=>{
            state.createserloading=false
            state.error=null
            state.services.push(action.payload)
        },
        setServices:(state,action)=>{
            state.serviceloading=false
            state.error=null
            state.services=action.payload
        },
        setDeleteService:(state,action)=>{
            state.serviceloading=false
            state.error=null
            state.services = state.services.filter((item)=>item._id!==action.payload._id)
        },
        setUpdateService:(state,action)=>{
            state.serviceloading=false
            state.error=null
            state.services = state.services.map((item)=>item._id === action.payload._id?action.payload:item)
        },
        setCreateServiceLoading:(state,action)=>{
            if(action.payload===undefined){
                state.createserloading=true
            } else{
                state.createserloading=action.payload
            }
        },
        setDeleteServiceLoading:(state,action)=>{
            if(action.payload===undefined){
                state.servicedelloading=true
            } else{
                state.servicedelloading=action.payload
            }
        },
        setServiceUpdateLoading:(state,action)=>{
            if(action.payload===undefined){
                state.serviceupdateloading=true
            } else{
                state.serviceupdateloading=action.payload
            }
        },
        setServiceLoading:(state)=>{
            state.serviceloading = true
        },
        setError:(state,action)=>{
            state.error=action.payload
        }
    }
})

export const { setCraeteService, setServices, setCreateServiceLoading, setServiceLoading,setError,setDeleteService,setDeleteServiceLoading,setServiceUpdateLoading,setUpdateService } = serviceSlice.actions;

export default serviceSlice.reducer;