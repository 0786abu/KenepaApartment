import axios from "axios"
import { setCreate_Property, setCreate_rating, setCreateLoading, setError, setFeat_p_Loading, setFeatToggleLoading, setFeaturePropertyToggle, setfeaturesProperties, setMyProperties, setProperties, setProperty, setPropertyLoading } from "../slice/propertySlice";
import { toast } from "react-toastify";
import { setDelete, setDeletePropLoading } from "../slice/adminSlice";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const Create_Propertyy = (property)=>async(dispatch)=>{
    dispatch(setCreateLoading())
    try {
        const {data} = await axios.post(`${API_BASE_URL}/property/create`,property,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        });
        dispatch(setCreate_Property(data.property));
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

export const Fetch_Properties = (filters = {})=>async(dispatch)=>{
    dispatch(setPropertyLoading())
    try {
        const { amenities, category, property_type, address, propertyDuration, minPrice, maxPrice } = filters;
        const queryParams = new URLSearchParams();
        if(amenities) queryParams.append("amenities", amenities);
        if(category) queryParams.append("category", category);
        if(property_type) queryParams.append("property_type", property_type);
        if(address) queryParams.append("address", address);
        if(propertyDuration) queryParams.append("propertyDuration", propertyDuration);
        if(minPrice) queryParams.append("minPrice", minPrice);
        if(maxPrice) queryParams.append("maxPrice", maxPrice);
        const {data} = await axios.get(`${API_BASE_URL}/property/properties?${queryParams.toString()}`,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setProperties(data.properties));
    } catch (error) {
        dispatch(
            setError(
            error.response?.data?.message || error?.response?.data?.error
            )
            )
    }
}
export const Fetch_Property = (id)=>async(dispatch)=>{
    dispatch(setPropertyLoading())
    try {
        const {data} = await axios.get(`${API_BASE_URL}/property/property/${id}`,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setProperty(data.property));
    } catch (error) {
        dispatch(
            setError(
            error.response?.data?.message || error?.response?.data?.error
            )
            )
    }
}
export const Fetch_Features_Property = ()=>async(dispatch)=>{
    dispatch(setFeat_p_Loading())
    try {
        const {data} = await axios.get(`${API_BASE_URL}/property/featres_properties`,{
            withCredentials:true
        });
        dispatch(setfeaturesProperties(data.features));
    } catch (error) {
        dispatch(
            setError(
            error.response?.data?.message || error?.response?.data?.error
            )
            )
    }
}
export const Fetch_My_Properties = ()=>async(dispatch)=>{
    dispatch(setPropertyLoading())
    try {
        const {data} = await axios.get(`${API_BASE_URL}/property/my_properties`,{
            withCredentials:true
        });
        dispatch(setMyProperties(data.my_properties));
    } catch (error) {
        dispatch(
            setError(
            error.response?.data?.message || error?.response?.data?.error
            )
            )
    }
}

export const Create_Ratingg = (property_id,rating)=>async(dispatch)=>{
    dispatch(setCreateLoading())
    try {
        const {data} = await axios.put(`${API_BASE_URL}/property/rating/${property_id}`,rating,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setCreate_rating(data.property))
        toast.success(data.message)
        console.log(data)
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
export const Update_Propertyy = (property_id,property,navigate)=>async(dispatch)=>{
    dispatch(setCreateLoading())
    try {
        const {data} = await axios.put(`${API_BASE_URL}/property/update_property/${property_id}`,property,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        });
        toast.success(data.message)
        navigate("/admin-dashboard-allproperties")
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
export const Delete_Property = (property_id)=>async(dispatch)=>{
    dispatch(setDeletePropLoading())
    try {
        const {data} = await axios.delete(`${API_BASE_URL}/property/delete/${property_id}`,{
            withCredentials:true
        });
        dispatch(setDelete(data.property))
        toast.success(data.message)
    } catch (error) {
        dispatch(
            setError(
            error.response?.data?.message || error?.response?.data?.error
            )
            )
            toast.error(error.response?.data?.message || error?.response?.data?.error)
    } finally {
        dispatch(setDeletePropLoading(false))
    }
}
export const Featured_Toggle = (property_id,close)=>async(dispatch)=>{
    dispatch(setFeatToggleLoading())
    try {
        const {data} = await axios.get(`${API_BASE_URL}/property/featured/${property_id}`,{
            withCredentials:true
        });
        dispatch(setFeaturePropertyToggle(data.property))
        toast.success(data.message)
        setTimeout(() => {
            close()
        }, 200);
    } catch (error) {
        dispatch(
            setError(
            error.response?.data?.message || error?.response?.data?.error
            )
            )
            toast.error(error.response?.data?.message || error?.response?.data?.error)
    } finally {
        dispatch(setFeatToggleLoading(false))
    }
}