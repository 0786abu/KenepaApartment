import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    feat_cities:[],
    cityloading:false,
    citycreateloading:false,
    cityupdateloading:false,
    citydelloading:false,
    error:null
}

const FeaturedCitySlice = createSlice({
    name:"FeaturedCity",
    initialState,
    reducers:{
        setFeaturedCities:(state,action)=>{
            state.cityloading=false
            state.error=null
            state.feat_cities=action.payload
        },
        setCreateFeatredCity:(state,action)=>{
            state.citycreateloading=false
            state.error=null
            state.feat_cities.push(action.payload)
        },
        setCreateCityloading:(state,action)=>{
            if(action.payload===undefined){
                state.citycreateloading=true
            }else{
                state.citycreateloading=action.payload
            }
        },
        setUpdateCityLoading:(state,action)=>{
            if(action.payload===undefined){
                state.cityupdateloading=true
            }else{
                state.cityupdateloading=action.payload
            }
        },
        setDeleteCityLoading:(state,action)=>{
            if(action.payload===undefined){
                state.citydelloading=true
            }else{
                state.citydelloading=action.payload
            }
        },
        setUpdateCity:(state,action)=>{
            state.cityupdateloading=false
            state.error=null
            state.feat_cities=state.feat_cities.map(city=>city._id===action.payload._id? action.payload : city)
        },
        setDeleteCity:(state,action)=>{
            state.citydelloading=false
            state.error=null
            state.feat_cities=state.feat_cities.filter(city=>city._id!==action.payload._id)
        },
        setCityLoading:(state)=>{
            state.cityloading=true
        },
        setError:(state,action)=>{
            state.error=action.payload
        }
    }
})

export const { setFeaturedCities, setCreateFeatredCity, setCreateCityloading, setUpdateCityLoading, setDeleteCityLoading, setUpdateCity, setDeleteCity, setCityLoading, setError } = FeaturedCitySlice.actions

export default FeaturedCitySlice.reducer;