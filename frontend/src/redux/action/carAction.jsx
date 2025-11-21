import axios from "axios";
import { setCarLoading, setCarUpdate, setCreateCarLoading, setDeleteCar, setDeleteCarLoading, setFetchCar, setFetchCars, setUPdateLoading } from "../slice/carSlice";
import { toast } from "react-toastify";



const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const Create_Car = (car)=>async(dispatch)=>{
    dispatch(setCreateCarLoading())
    try {
        const {data} = await axios.post(`${API_BASE_URL}/car/create`,car,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        });
        toast.success(data.message)
    } catch (error) {
        toast.error(error.response?.data?.message || error?.response?.data?.error)
    } finally {
        dispatch(setCreateCarLoading(false))
}
}

export const Fetch_Retal_Cars = (filters = {})=>async(dispatch)=>{
    dispatch(setCarLoading())
    try {
        const { address, carType, carModel ,minPrice, maxPrice } = filters;
        const queryParams = new URLSearchParams();
        if(address) queryParams.append("address", address);
        if(carType) queryParams.append("carType", carType);
        if(carModel) queryParams.append("carModel", carModel);
        if(minPrice) queryParams.append("minPrice", minPrice);
        if(maxPrice) queryParams.append("maxPrice", maxPrice);
        const {data} = await axios.get(`${API_BASE_URL}/car/cars?${queryParams.toString()}`,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setFetchCars({cars:data.cars,allcars:data.allcars}));
    } catch (error) {
        toast.error(error.response?.data?.message || error?.response?.data?.error)
    }
}

export const Fetch_Retal_Car = (id)=>async(dispatch)=>{
    dispatch(setCarLoading())
    try {
        const {data} = await axios.get(`${API_BASE_URL}/car/car/${id}`,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setFetchCar(data.car));
    } catch (error) {
        toast.error(error.response?.data?.message || error?.response?.data?.error)
    }
}

export const DeleteCar = (id)=>async(dispatch)=>{
    dispatch(setDeleteCarLoading())
    try {
        const {data} = await axios.delete(`${API_BASE_URL}/car/delete/${id}`,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setDeleteCar(data.car));
        toast.success(data.message)
    } catch (error) {
        toast.error(error.response?.data?.message || error?.response?.data?.error)
    } finally {
        dispatch(setDeleteCarLoading(false))
    }
}
export const UpdateCar = (car,id,route)=>async(dispatch)=>{
    dispatch(setUPdateLoading())
    try {
        const {data} = await axios.put(`${API_BASE_URL}/car/update/${id}`,car,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        });
        dispatch(setCarUpdate(data.car));
        toast.success(data.message)
        route("/admin-dashboard-allcars")
    } catch (error) {
        toast.error(error.response?.data?.message || error?.response?.data?.error)
    } finally {
        dispatch(setUPdateLoading(false))
    }
}