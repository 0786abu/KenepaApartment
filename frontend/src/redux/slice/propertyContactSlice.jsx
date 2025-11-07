import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    property_buyers:[],
    property_dealers:[],
    property_buyer:null,
    contact:null,
    create:null,
    pccreateloading: false,
    error: null,
    contactloading: false,
    cancelloading: false,
    confirmloading: false,
    rejectloading: false
}

const propertyContactSlice = createSlice({
    name:"PropertyContact",
    initialState,
    reducers:{
        setCreatePropertyContact:(state,action)=>{
            state.pccreateloading=false
            state.error=null
            state.create=action.payload
        },
        setPropertyBuyrers:(state,action)=>{
            state.contactloading=false
            state.error=null
            state.property_buyers=action.payload
        },
        setPropertyDealers:(state,action)=>{
            state.contactloading=false
            state.error=null
            state.property_dealers=action.payload
        },
        setPropertyBuyrer:(state,action)=>{
            state.contactloading=false
            state.error=null
            state.property_buyer=action.payload
        },
        setAgentContacts:(state,action)=>{
            state.contactloading=false
            state.error=null
            state.agentcontacts=action.payload
        },
        setDeletePropertyContact:(state,action)=>{
            state.pccreateloading=false
            state.error=null
            state.property_buyers=state.property_buyers.filter(pb=>pb._id!==action.payload._id)
        },
        setCancelToggle: (state, action) => {
            state.cancelloading = false;
            state.error = null;
            state.property_dealers = state.property_dealers.map(pb =>
                pb._id === action.payload._id
                    ? { ...pb, actions: { ...pb.actions, cancel: !pb.actions.cancel } }
                    : pb
            );
        },
        setDeleteUserDealer:(state,action)=>{
            state.pccreateloading=false
            state.error=null
            state.property_dealers=state.property_dealers.filter(pb=>pb._id!==action.payload._id)
        },
        setContactLoading:(state)=>{
            state.contactloading=true
        },
        setError:(state,action)=>{
            state.error=action.payload
        },
        setConfirToggle:(state,action)=>{
            state.confirmloading=false
            state.error=null
            state.property_buyers = state.property_buyers.map(pb =>
                pb._id === action.payload._id
                    ? action.payload
                    : pb
            );
        },
        setRejectedToggle:(state,action)=>{
            state.rejectloading=false
            state.error=null
            state.property_buyers = state.property_buyers.map(pb =>
                pb._id === action.payload._id
                    ? action.payload
                    : pb
            );
        },
        setCreateLoading:(state,action)=>{
            if(action.payload=== undefined){
                state.pccreateloading=true
            } else{
                state.pccreateloading=action.payload
            }
        },
        setConfirmLoading:(state,action)=>{
            if(action.payload=== undefined){
                state.confirmloading=true
            } else{
                state.confirmloading=action.payload
            }
        },
        setRejetctLoading:(state,action)=>{
            if(action.payload=== undefined){
                state.rejectloading=true
            } else{
                state.rejectloading=action.payload
            }
        },
        setCancelLoading:(state,action)=>{
            if(action.payload=== undefined){
                state.cancelloading=true
            } else{
                state.cancelloading=action.payload
            }
        }
    }
})

export const { setCreatePropertyContact,setCancelLoading,setCancelToggle,setDeleteUserDealer,setPropertyDealers,setPropertyBuyrer,setPropertyBuyrers,setDeletePropertyContact, setAgentContacts, setContactLoading, setError, setCreateLoading,setConfirToggle,setConfirmLoading,setRejectedToggle,setRejetctLoading } = propertyContactSlice.actions;

export default propertyContactSlice.reducer;