/* eslint-disable react-refresh/only-export-components */
import axios from "axios"
import { setActionLoading, setAdminUPdateProfile, setAgent, setAgentLoading, setAgents, setError, setRegister, setUpdateLoading, setUPdateProfile } from "../slice/userSlice";
import { toast } from "react-toastify";
import { setDeleteUser, setDeleteUserLoading } from "../slice/adminSlice";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const RegisterUser = (userData,navigate)=>async(dispatch)=>{
    dispatch(setActionLoading())
    try {
        const {data} = await axios.post(`${API_BASE_URL}/user/register`,userData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        });
        dispatch(setRegister(data.user));
        toast(data.message)
        navigate("/")
        localStorage.setItem("real_estate_user",JSON.stringify(data.user))
        window.location.reload();
    } catch (error) {
        dispatch(
            setError(
                error.response?.data?.message || error?.response?.data?.error
            )
        )
        toast.error(error.response?.data?.message || error?.response?.data?.error)
    } finally {
        dispatch(setActionLoading(false))
    }
}



export const LogoutUser = (navigate)=>async(dispatch)=>{
    dispatch(setActionLoading())
    try {
        const {data} = await axios.get(`${API_BASE_URL}/user/logout`,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        toast(data.message)
        localStorage.removeItem("real_estate_user")
        navigate("/")
        window.location.reload();
    } catch (error) {
        toast.error(error.response?.data?.message || error?.response?.data?.error)
        dispatch(setError(error.response?.data?.message || error?.response?.data?.error))
    } finally{
        dispatch(setActionLoading(false))
    }
}

export const LoginUser = (userData,navigate)=>async(dispatch)=>{
    dispatch(setActionLoading())
    try {
        const {data} = await axios.post(`${API_BASE_URL}/user/login`,userData,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        toast(data.message)
        dispatch(setRegister(data.user));
        localStorage.setItem("real_estate_user",JSON.stringify(data.user))
        navigate("/")
    } catch (error) {
        dispatch(
            setError(
                error.response?.data?.message || error?.response?.data?.error
            )
        )
        toast.error(error.response?.data?.message || error?.response?.data?.error)
    } finally{
        dispatch(setActionLoading(false))
    }
}



export const Update_Profile = (updatedata,close)=>async(dispatch)=>{
    dispatch(setUpdateLoading())
    try {
        const {data} = await axios.put(`${API_BASE_URL}/user/updateprofile`,updatedata,{
            withCredentials:true,
            headers:{
                "Content-Type":"multipart/form-data"
            }
        });
        dispatch(setUPdateProfile(data.user))
        localStorage.setItem("real_estate_user",JSON.stringify(data.user));
        toast(data.message)
        close()
    } catch (error) {
        dispatch(
            setError(
                error.response?.data?.message || error?.response?.data?.error
            )
        )
        toast.error(error.response?.data?.message || error?.response?.data?.error)
    } finally{
        dispatch(setUpdateLoading(false))
    }
}

export const Admin_Update_Profile = (updatedata)=>async(dispatch)=>{
    dispatch(setUpdateLoading())
    try {
        const {data} = await axios.put(`${API_BASE_URL}/user/admin-update-profile`,updatedata,{
            withCredentials:true,
            headers:{
                "Content-Type":"multipart/form-data"
            }
        });
        dispatch(setAdminUPdateProfile(data.admin))
        localStorage.setItem("real_estate_user",JSON.stringify(data.admin));
        toast(data.message)
    } catch (error) {
        dispatch(
            setError(
                error.response?.data?.message || error?.response?.data?.error
            )
        )
        toast.error(error.response?.data?.message || error?.response?.data?.error)
    } finally{
        dispatch(setUpdateLoading(false))
    }
}


export const Change_Passwordd = (dataa)=>async(dispatch)=>{
    dispatch(setUpdateLoading())
    try {
        const {data} = await axios.put(`${API_BASE_URL}/user/changepassword`,dataa,{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        });
        toast(data.message)
        setTimeout(() => {
            window.location.reload();
        }, 100);
    } catch (error) {
        dispatch(
            setError(
                error.response?.data?.message || error?.response?.data?.error
            )
        )
        toast.error(error.response?.data?.message || error?.response?.data?.error)
    } finally{
        dispatch(setUpdateLoading(false))
    }
}

export const Forgot_Password = (email)=>async(dispatch)=>{
    dispatch(setUpdateLoading())
    try {
        const {data} = await axios.post(`${API_BASE_URL}/user/forgot`, {email}, {
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        toast(data.message);        
    } catch (error) {
        dispatch(
            setError(
                error.response?.data?.message || error?.response?.data?.error
            )
        )
        toast.error(error.response?.data?.message || error?.response?.data?.error)
    } finally{
        dispatch(setUpdateLoading(false))
    }
}
export const Reset_Password = (newPassword,token)=>async(dispatch)=>{
    dispatch(setUpdateLoading())
    try {
        const {data} = await axios.put(`${API_BASE_URL}/user/reset-password/${token}`,{newPassword},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        toast(data.message);        
        setTimeout(() => {
            window.location.href="/login"
        }, 100);
    } catch (error) {
        dispatch(
            setError(
                error.response?.data?.message || error?.response?.data?.error
            )
        )
        toast.error(error.response?.data?.message || error?.response?.data?.error)
    } finally{
        dispatch(setUpdateLoading(false))
    }
}

export const Fetch_Agents = (agent_type)=>async(dispatch)=>{
    dispatch(setAgentLoading())
    try {
        const queryParams = new URLSearchParams();
        if(agent_type) queryParams.append("agent_type", agent_type)
        const {data} = await axios.get(`${API_BASE_URL}/user/fetch_agents?${queryParams.toString()}`);
        dispatch(setAgents(data.agents));
    } catch (error) {
        dispatch(setError(error.response?.data?.message || error?.response?.data?.error))
    }
}
export const Fetch_Agent = (id)=>async(dispatch)=>{
    dispatch(setAgentLoading())
    try {
        const {data} = await axios.get(`${API_BASE_URL}/user/fetch_agent/${id}`);
        dispatch(setAgent(data.agent));
    } catch (error) {
        dispatch(setError(error.response?.data?.message || error?.response?.data?.error))
    }
}

export const User_Delete = (id)=>async(dispatch)=>{
    dispatch(setDeleteUserLoading())
    try {
        const {data} = await axios.delete(`${API_BASE_URL}/user/delete/${id}`,{
            withCredentials: true
        });
        dispatch(setDeleteUser(data.user));
        toast(data.message);
    } catch (error) {
        toast.error(error.response?.data?.message || error?.response?.data?.error)
    } finally {
        dispatch(setDeleteUserLoading(false))
    }
}