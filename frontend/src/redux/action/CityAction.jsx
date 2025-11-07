import axios from "axios";
import { toast } from "react-toastify";
import { setCityLoading, setCreateCityloading, setDeleteCity, setDeleteCityLoading, setFeaturedCities, setUpdateCity, setUpdateCityLoading } from "../slice/Featured_CitySlice";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const Create_FeaturedCity = (revieww,navigate)=>async(dispatch)=>{
    dispatch(setCreateCityloading())
    try {
        const {data} = await axios.post(`${API_BASE_URL}/review/city/create`,revieww,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        });
        dispatch(setFeaturedCities(data.featureCity));
        toast(data.message);
        navigate("/admin-dashboard-featuredcities")
    } catch (error) {
        toast.error(error?.response?.data?.message || error.response?.data?.error)
    } finally {
        dispatch(setCreateCityloading(false))
    }
}

export const Fetch_FeatredCities = ()=>async(dispatch)=>{
    dispatch(setCityLoading())
    try {
        const {data} = await axios.get(`${API_BASE_URL}/review/city/cities`);
        dispatch(setFeaturedCities(data.featureCities));
    } catch (error) {
        toast.error(error?.response?.data?.message || error.response?.data?.error)
        dispatch(error?.response?.data?.message || error.response?.data?.error)
    }
}

export const Update_FeatiredCity = (id, revieww,close)=>async(dispatch)=>{
    dispatch(setUpdateCityLoading())
    try {
        const {data} = await axios.put(`${API_BASE_URL}/review/city/update/${id}`,revieww,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setUpdateCity(data.featureCity));
        toast(data.message);
        setTimeout(() => {
            close()
        }, 200);
    } catch (error) {
        toast.error(error?.response?.data?.message || error.response?.data?.error);
    } finally {
        dispatch(setUpdateCityLoading(false))
    }
}
export const Delete_FeaturedCity = (id)=>async(dispatch)=>{
    dispatch(setDeleteCityLoading())
    try {
        const {data} = await axios.delete(`${API_BASE_URL}/review/city/delete/${id}`,{
            withCredentials:true
        });
        dispatch(setDeleteCity(data.featureCity));
        toast(data.message);
        close()
    } catch (error) {
        toast.error(error?.response?.data?.message || error.response?.data?.error);
    } finally {
        dispatch(setDeleteCityLoading(false))
    }
}