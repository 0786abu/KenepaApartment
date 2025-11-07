import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    reviews:[],
    reviewloading:false,
    revcreateloading:false,
    revupdateloading:false,
    reviewdelloading:false,
    error:null
}

const reviewSlice = createSlice({
    name:"Review",
    initialState,
    reducers:{
        setReviews:(state,action)=>{
            state.reviewloading=false
            state.error=null
            state.reviews=action.payload
        },
        setCreateReview:(state,action)=>{
            state.revcreateloading=false
            state.error=null
            state.reviews.push(action.payload)
        },
        setCreateReviewloading:(state,action)=>{
            if(action.payload===undefined){
                state.revcreateloading=true
            }else{
                state.revcreateloading=action.payload
            }
        },
        setUpdateReviewLoading:(state,action)=>{
            if(action.payload===undefined){
                state.revupdateloading=true
            }else{
                state.revupdateloading=action.payload
            }
        },
        setDeleteReviewLoading:(state,action)=>{
            if(action.payload===undefined){
                state.reviewdelloading=true
            }else{
                state.reviewdelloading=action.payload
            }
        },
        setUpdateReview:(state,action)=>{
            state.revupdateloading=false
            state.error=null
            state.reviews=state.reviews.map(review=>review._id===action.payload._id? action.payload : review)
        },
        setDeleteReview:(state,action)=>{
            state.reviewdelloading=false
            state.error=null
            state.reviews=state.reviews.filter(review=>review._id!==action.payload._id)
        },
        setReviewLoading:(state)=>{
            state.reviewloading=true
        },
        setError:(state,action)=>{
            state.error=action.payload
        }
    }
})

export const {
    setReviews,
    setCreateReview,
    setCreateReviewloading,
    setUpdateReviewLoading,
    setDeleteReviewLoading,
    setUpdateReview,
    setDeleteReview,
    setReviewLoading,
    setError
} = reviewSlice.actions

export default reviewSlice.reducer;