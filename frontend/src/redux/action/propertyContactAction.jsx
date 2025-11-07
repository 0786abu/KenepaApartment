/* eslint-disable react-refresh/only-export-components */
import axios from "axios"
import { setCancelLoading, setCancelToggle, setConfirmLoading, setConfirToggle, setContactLoading, setCreateLoading, setCreatePropertyContact, setDeletePropertyContact, setDeleteUserDealer, setPropertyBuyrer, setPropertyBuyrers, setPropertyDealers, setRejectedToggle, setRejetctLoading } from "../slice/propertyContactSlice";
import { toast } from "react-toastify";
import { setError } from "../slice/userSlice";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const CreatePropertyContact = (id,dataa)=>async(dispatch)=>{
    dispatch(setCreateLoading())
    try {
        const {data} = await axios.post(`${API_BASE_URL}/p_contact/create/${id}`,dataa,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setCreatePropertyContact(data.property));
        toast(data.message)
    } catch (error) {
        toast.error(error.response?.data?.message || error?.response?.data?.error)   
    } finally {
        dispatch(setCreateLoading(false))
    }
}

export const Fetch_Agent_Contacts = ()=>async(dispatch)=>{
    dispatch(setContactLoading())
    try {
        const {data} = await axios.get(`${API_BASE_URL}/p_contact/agent_contacts`,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setPropertyBuyrers(data.contacts));
    } catch (error) {
          dispatch(
          setError(
          error.response?.data?.message || error?.response?.data?.error
         )
    )
    }
}
export const Fetch_Agent_Contact = (id)=>async(dispatch)=>{
    dispatch(setContactLoading())
    try {
        const {data} = await axios.get(`${API_BASE_URL}/p_contact/agent_contact/${id}`,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setPropertyBuyrer(data.contact));
    } catch (error) {
          dispatch(
          setError(
          error.response?.data?.message || error?.response?.data?.error
         )
    )
    }
}

export const Delete_Agent_Property_Contact = (id)=>async(dispatch)=>{
    dispatch(setCreateLoading())
    try {
        const {data} = await axios.delete(`${API_BASE_URL}/p_contact/delete/${id}`,{
            withCredentials:true
        });
        dispatch(setDeletePropertyContact(data.contact));
        toast(data.message)
    } catch (error) {
          dispatch(
          setError(
          error.response?.data?.message || error?.response?.data?.error
         )
        )
        toast.error(error.response?.data?.message || error?.response?.data?.error)   
    } finally {
        dispatch(setCreateLoading(false))
    }
}
export const Delete_User_Property_Contact = (id)=>async(dispatch)=>{
    dispatch(setCreateLoading())
    try {
        const {data} = await axios.delete(`${API_BASE_URL}/p_contact/delete/${id}`,{
            withCredentials:true
        });
        dispatch(setDeleteUserDealer(data.contact));
        toast(data.message)
    } catch (error) {
          dispatch(
          setError(
          error.response?.data?.message || error?.response?.data?.error
         )
        )
        toast.error(error.response?.data?.message || error?.response?.data?.error)   
    } finally {
        dispatch(setCreateLoading(false))
    }
}

export const Property_Dealerss = ()=>async(dispatch)=>{
    dispatch(setContactLoading())
    try {
        const {data} = await axios.get(`${API_BASE_URL}/p_contact/dealers`,{
            withCredentials:true
        });
        dispatch(setPropertyDealers(data.dealers));
    } catch (error) {
        dispatch(setError(error.response?.data?.message || error.response?.data?.error))
    }
}
export const Cancel_Toggle = (id)=>async(dispatch)=>{
    dispatch(setCancelLoading())
    try {
        const {data} = await axios.get(`${API_BASE_URL}/p_contact/canceltoggle/${id}`,{
            withCredentials:true
        });
        dispatch(setCancelToggle(data.property));
        toast(data.message)
    } catch (error) {
        dispatch(setError(error.response?.data?.message || error.response?.data?.error))
        toast.error(error.response?.data?.message || error.response?.data?.error)
    } finally {
        dispatch(setCancelLoading(false))
    }
}
export const Confirm_Toffle = (id)=>async(dispatch)=>{
    dispatch(setConfirmLoading())
    try {
        const {data} = await axios.get(`${API_BASE_URL}/p_contact/confirm/${id}`,{
            withCredentials:true
        });
        dispatch(setConfirToggle(data.property));
        toast(data.message)
        localStorage.setItem("real_estate_user",JSON.stringify(data.user))
    } catch (error) {
        dispatch(setError(error.response?.data?.message || error.response?.data?.error))
        toast.error(error.response?.data?.message || error.response?.data?.error)
    } finally {
        dispatch(setConfirmLoading(false))
    }
}
export const Rejetced_Toggle = (id)=>async(dispatch)=>{
    dispatch(setRejetctLoading())
    try {
        const {data} = await axios.get(`${API_BASE_URL}/p_contact/rejected/${id}`,{
            withCredentials:true
        });
        dispatch(setRejectedToggle(data.property));
        toast(data.message)
    } catch (error) {
        dispatch(setError(error.response?.data?.message || error.response?.data?.error))
        toast.error(error.response?.data?.message || error.response?.data?.error)
    } finally {
        dispatch(setRejetctLoading(false))
    }
}