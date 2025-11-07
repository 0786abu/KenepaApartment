import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    properties:[],
    property:null,
    create:null,
    createloading: false,
    propertyloading: false,
    feat_p_loading: false,
    feat_toggleloading: false,
    error: null,
}

const propertySlice = createSlice({
    name:"Property",
    initialState,
    reducers:{
        setProperties:(state,action)=>{
            state.propertyloading = false
            state.error=null
            state.properties=action.payload
        },
        setMyProperties:(state,action)=>{
            state.propertyloading = false
            state.error=null
            state.my_properties=action.payload
        },
        setfeaturesProperties:(state,action)=>{
            state.feat_p_loading = false
            state.error=null
            state.features_properties=action.payload
        },
        setProperty:(state,action)=>{
            state.propertyloading = false
            state.error=null
            state.property=action.payload
        },
        setFeaturePropertyToggle:(state,action)=>{
            state.feat_toggleloading = false
            state.error=null
            state.properties =state.properties.map(p=>p._id===action.payload._id ? action.payload : p)
        },
        setCreate_Property:(state,action)=>{
            state.createloading=false
            state.error=null
            state.create=action.payload
        },
        setCreate_rating:(state,action)=>{
            state.propertyloading=false
            state.error=null
            // const propertyy=state.properties.find(p=>p._id===action.payload.propertyId)
            // if(state.property._id === propertyy._id){
                state.property = action.payload
            // }
        },
        setPropertyLoading:(state)=>{
            state.propertyloading=true
        },
        setFeat_p_Loading:(state)=>{
            state.feat_p_loading=true
        },
        setCreateLoading:(state,action)=>{
            if(action.payload=== undefined){
                state.createloading=true
            }else{
                state.createloading=action.payload
            }
        },
        setFeatToggleLoading:(state,action)=>{
            if(action.payload=== undefined){
                state.feat_toggleloading=true
            }else{
                state.feat_toggleloading=action.payload
            }
        },
        setError:(state,action)=>{
            state.error=action.payload
        }
    }
})

export const { setCreateLoading,setMyProperties,setFeat_p_Loading,setfeaturesProperties,setProperty,setCreate_Property,setCreate_rating, setError,setProperties,setPropertyLoading,setFeatToggleLoading,setFeaturePropertyToggle } = propertySlice.actions;

export default propertySlice.reducer;