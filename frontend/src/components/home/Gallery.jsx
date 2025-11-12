import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Fetch_Properties } from "../../redux/action/propertyAction";
import {Loader} from "lucide-react"
import { ArrowRightAlt } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Gallery = () => {
    const {properties,propertyloading} = useSelector((state)=>state.Property);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(Fetch_Properties());
    },[dispatch])
    
  return (
    <div className="py-16 max-w-6xl m-auto">
        {propertyloading ? (
            <div className="h-[60vh] flex justify-center items-center">
                        <Loader className="w-8 h-8 animate-spin"/>
                    </div>
        ) : (
            <div className="grid grid-cols-3 gap-6">
            {properties?.slice(0,6)?.map((property)=>{
                return(
                    <div key={property._id} className="p-4 rounded-md overflow-hidden bg-[#AD795B]">
                        <div>
                           <Link to={`/detail/${property._id}`}>
                              <img src={`${import.meta.env.VITE_BASE_URL}${property.images[0]}`} alt={property.title} className=" aspect-video w-full rounded-md"/>
                           </Link>
                        </div>
                        <div className="mt-6 mx-6 mb-2 text-center">
                            <h2 className="text-xl font-bold leading-tight tracking-tight text-white">{property.title}</h2>
                            <Link to={`/detail/${property._id}`}>
                              <button className="bg-[#EFEBE7] px-4 py-2 cursor-pointer text-black mt-3 rounded-md">More Info <ArrowRightAlt/></button>
                            </Link>
                        </div>
                    </div>
                )
            })}
        </div>
        )}
    </div>
  )
}

export default Gallery