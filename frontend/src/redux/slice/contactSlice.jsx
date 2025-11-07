import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    contacts:[],
    contactloading:false,
    concreateloading:false,
    conupdteloading:false,
    contactdelloading:false,
    error:null
}

const contactSlice = createSlice({
    name:"Contact",
    initialState,
    reducers:{
        setContacts:(state,action)=>{
            state.contactloading=false
            state.error=null
            state.contacts=action.payload
        },
        setCreateContact:(state,action)=>{
            state.concreateloading=false
            state.error=null
            state.contacts.push(action.payload)
        },
        setCreateContactloading:(state,action)=>{
            if(action.payload===undefined){
                state.concreateloading=true
            }else{
                state.concreateloading=action.payload
            }
        },
        setUpdateContactLoading:(state,action)=>{
            if(action.payload===undefined){
                state.conupdteloading=true
            }else{
                state.conupdteloading=action.payload
            }
        },
        setDeleteContactLoading:(state,action)=>{
            if(action.payload===undefined){
                state.contactdelloading=true
            }else{
                state.contactdelloading=action.payload
            }
        },
        setUpdateContact:(state,action)=>{
            state.conupdteloading=false
            state.error=null
            state.contacts=state.contacts.map(contact=>contact._id===action.payload._id? action.payload : contact)
        },
        setDeleteContact:(state,action)=>{
            state.contactdelloading=false
            state.error=null
            state.contacts=state.contacts.filter(contact=>contact._id!==action.payload._id)
        },
        setContactLoading:(state)=>{
            state.contactloading=true
        },
        setError:(state,action)=>{
            state.error=action.payload
        }
    }
})

export const { setContacts, setCreateContact, setCreateContactloading, setError,setContactLoading,setDeleteContact,setUpdateContact,setDeleteContactLoading,setUpdateContactLoading } = contactSlice.actions

export default contactSlice.reducer;