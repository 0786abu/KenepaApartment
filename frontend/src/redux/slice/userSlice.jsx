import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: JSON.parse(localStorage.getItem('real_estate_user')) || null,
    isAuthenticated: false,
    actionloading: false,
    resendloading: false,
    updateloading: false,
    error: null,
    // agents
    agents:[],
    agent:null,
    agentloading:false
}

const userSlice = createSlice({
    name:"User",
    initialState,
    reducers:{
        setRegister:(state,action)=>{
            state.actionloading=false
            state.error=null
            state.isAuthenticated=true
            state.user=action.payload
        },
        setUPdateProfile:(state,action)=>{
            state.actionloading=false
            state.error=null
            state.isAuthenticated=true
            state.user=action.payload
        },
        setAdminUPdateProfile:(state,action)=>{
            state.actionloading=false
            state.error=null
            state.isAuthenticated=true
            state.user=action.payload
        },
        setActionLoading:(state,action)=>{
            if(action.payload=== undefined){
                state.actionloading=true
            }else{
                state.actionloading=action.payload
            }
        },
        setResendLoading:(state,action)=>{
            if(action.payload=== undefined){
                state.resendloading=true
            }else{
                state.resendloading=action.payload
            }
        },
        setUpdateLoading:(state,action)=>{
            if(action.payload=== undefined){
                state.updateloading=true
            }else{
                state.updateloading=action.payload
            }
        },
        setError:(state,action)=>{
            state.error=action.payload
        },
        setAgents:(state,action)=>{
            state.agentloading = false
            state.error=null
            state.agents=action.payload
        },
        setAgent:(state,action)=>{
            state.agentloading = false
            state.error=null
            state.agent=action.payload
        },
        setAgentLoading:(state)=>{
            state.agentloading = true
        }
    }
})

export const { setRegister,setAgent,setAgentLoading,setAgents,setUPdateProfile, setActionLoading, setError,setUpdateLoading, setResendLoading, setAdminUPdateProfile } = userSlice.actions;

export default userSlice.reducer;