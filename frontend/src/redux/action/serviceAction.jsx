import axios from "axios"
import { setCraeteService, setCreateServiceLoading,setServices,setServiceLoading, setDeleteService, setDeleteServiceLoading, setUpdateService, setServiceUpdateLoading } from "../slice/serviceSlice";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const Create_Service = (servicee)=>async(dispatch)=>{
    dispatch(setCreateServiceLoading())
    try {
        const {data} = await axios.post(`${API_BASE_URL}/service/create`,servicee,{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        });
        dispatch(setCraeteService(data.service));
        toast(data.message);
    } catch (error) {
        toast.error(error.response?.data?.message || error.response?.data?.error);
    } finally {
        dispatch(setCreateServiceLoading(false))
    }
}
export const Fetch_Services = ()=>async(dispatch)=>{
    dispatch(setServiceLoading())
    try {
        const {data} = await axios.get(`${API_BASE_URL}/service/services`,{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        });
        dispatch(setServices(data.services));
    } catch (error) {
        toast.error(error.response?.data?.message || error.response?.data?.error);
    }
}
export const Delete_Service = (id)=>async(dispatch)=>{
    dispatch(setDeleteServiceLoading())
    try {
        const {data} = await axios.delete(`${API_BASE_URL}/service/delete/${id}`,{
            withCredentials:true
        });
        dispatch(setDeleteService(data.service));
        toast(data.message);
    } catch (error) {
        toast.error(error.response?.data?.message || error.response?.data?.error);
    } finally {
        dispatch(setDeleteServiceLoading(false))
    }
}
export const Update_Service = (id,servicee,close)=>async(dispatch)=>{
    dispatch(setServiceUpdateLoading())
    try {
        const {data} = await axios.put(`${API_BASE_URL}/service/update/${id}`,servicee,{
            withCredentials:true
        });
        dispatch(setUpdateService(data.service));
        toast(data.message);
        setTimeout(() => {
            close()
        }, 200);
    } catch (error) {
        toast.error(error.response?.data?.message || error.response?.data?.error);
    } finally {
        dispatch(setServiceUpdateLoading(false))
    }
}