import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    allusers:[],
    allbuyers:[],
    allsellers:[],
    allwhishlists:[],
    allproperties:[],
    send_email_loading:false,
    whishloadingg:false,
    userloading:false,
    buyerloading:false,
    p_loading:false,
    sellerloading:false,
    userdelloading:false,
    updateloading:false,
    error: null,
    deleteloading:false
}

const adminSlice = createSlice({
    name:"Admin",
    initialState,
    reducers:{
        setAllUsers:(state,action)=>{
            state.userloading = false
            state.error=null
            state.allusers=action.payload
        },
        setAllBuyers:(state,action)=>{
            state.buyerloading = false
            state.error=null
            state.allbuyers=action.payload
        },
        setAllProperties:(state,action)=>{
            state.p_loading = false
            state.error=null
            state.allproperties=action.payload
        },
        setDelete:(state,action)=>{
            state.createloading = false
            state.error=null
            state.allproperties = state.allproperties.filter((item)=>item._id !==action.payload._id)
        },
        setSendEmailLoading:(state,action)=>{
             if(action.payload===undefined){
                state.send_email_loading=true
            }else{
                state.send_email_loading = action.payload
            }
        },
        setAllSellers:(state,action)=>{
            state.sellerloading = false
            state.error=null
            state.allsellers=action.payload
        },
        setAdmin_User_Update:(state,action)=>{
            state.updateloading = false
            state.error=null
            state.allusers = state.allusers.map((item)=>item._id === action.payload._id ? {...item,role:action.payload.role} :item)
        },
        setuserloading:(state)=>{
            state.userloading = true
        },
        setAllPropertyLoading:(state)=>{
            state.p_loading = true
        },
        setsellerloading:(state)=>{
            state.sellerloading = true
        },
        setbuyerloading:(state)=>{
            state.buyerloading = true
        },
        setWhishLoadingg:(state)=>{
            state.whishloadingg = true
        },
        setError:(state,action)=>{
            state.error=action.payload
        },
        setAdminUpdateLoading:(state,action)=>{
            if(action.payload===undefined){
                state.updateloading=true
            }else{
                state.updateloading = action.payload
            }
        },
        setDeletePropLoading:(state,action)=>{
            if(action.payload===undefined){
                state.deleteloading=true
            }else{
                state.deleteloading = action.payload
            }
        }
    }
})

export const { setAllUsers, setuserloading, setError,setAllBuyers,setbuyerloading,setAllSellers,setsellerloading,setDeleteUser,setDeleteUserLoading,setAdminUpdateLoading,setAdmin_User_Update,setAllWhishLists,setWhishLoadingg,setAllProperties,setAllPropertyLoading, setSendEmailLoading, setDelete, setDeletePropLoading } = adminSlice.actions;

export default adminSlice.reducer;