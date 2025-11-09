import { BathtubOutlined, BedOutlined, DisabledByDefault, LocationOnOutlined } from "@mui/icons-material"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Fetch_Properties } from "../../redux/action/propertyAction";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { ExternalLink } from "lucide-react";

const Featured_listing = () => {
    const {properties,propertyloading} = useSelector((state)=>state.Property);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(Fetch_Properties())
    },[dispatch])

        
  return (
    
    <div>
        <div className="wrapper my-8">
            <div className="header text-center">
            <h2 className=" px-4 py-1 bg-[#8FA282] inline-block rounded-full text-white">Properties</h2>
            <h2 className=" text-3xl md:text-4xl lg:text-5xl mt-4 font-[800]">Our Properties</h2>
            </div>
           {propertyloading ? (<Loader/>):(
             <div className="card-wrapper mx-4 mt-10">
             <div className=" cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                 {properties?.slice(0,6).map((prop,index)=>{
                     return(
                         <div data-aos="fade-down"  data-aos-delay={`${index*100}`} data-aos-duration="1000" key={index} className="card group overflow-hidden border-gray-200 border">
                    <Link to={`/detail/${prop._id}`}>
                    <div className="img relative before:absolute before:h-16 before:w-full before:bottom-0 before:bg-gradient-to-b before:from-[rgba(0,0,0,0)] before:to-[rgba(0,0,0,0.8)] before:z-20 overflow-hidden">
                     <img src={`${import.meta.env.VITE_BASE_URL}${prop?.images[0]}`} className=" w-full group-hover:scale-105 duration-300" alt="" />
                     <div className="absolute bottom-2 z-40 left-[50%] w-[80%] translate-x-[-50%]">
                         <p className=" text-white"><LocationOnOutlined/> {prop.location.address}</p>
                     </div>
                     <div className=" absolute bg-[#8FA282] px-3 text-sm py-1 rounded-full top-2 left-2">
                        <span>{prop.propertyDuration==="Short-Term" ? "3 Days" : prop.propertyDuration==="Mid-Term" ? "1-Month" : "1-Year"}</span>
                     </div>
                     </div>
                    </Link>

                     <div className=" p-4">
                     <h2 className=' text-xl font-[700] font-sans text-[#8FA282]'>${`${prop.price} For Rent`}</h2>
                         <h2 className=" text-xl font-[600] text-black my-3 line-clamp-1 font-sans">{prop.title}</h2>
                         <p className=" text-gray-500 font-[300] text-[16px] line-clamp-1 font-sans mt-2">{prop.description}</p>
                         <div className=" mt-6 grid grid-cols-3 pb-4">
                             <div className=" sec-1 border-r-2 text-black">
                                 <p className=" flex items-center">{prop.rooms} <span className=" ml-2"><BedOutlined sx={{color:"#6b7280"}}/></span></p>
                                 <p className=" text-sm font-[300] text-[#6b7280] font-sans">Bedrooms</p>
                             </div>
                             <div className=" sec-1 border-r-2 pl-2 text-black">
                                 <p className=" flex items-center">{prop.bathrooms} <span className=" ml-2"><BathtubOutlined sx={{color:"#6b7280"}}/></span></p>
                                 <p className=" text-sm font-[300] text-[#6b7280] font-sans">Bathrooms</p>
                             </div>
                             <div className=" sec-1 pl-2 text-black">
                                 <p className=" flex items-center">{prop.size} <span className=" ml-2"><DisabledByDefault sx={{color:"#6b7280"}}/></span></p>
                                 <p className=" text-sm font-[300] text-[#6b7280] font-sans">square Fit</p>
                             </div>
                         </div>
                         <hr />
                         <div className=" flex justify-between items-center mx-2 mt-4">
                             <div className="profile flex justify-center gap-2 items-center">
                                 <img src={`${import.meta.env.VITE_BASE_URL}${prop.property_poster.profile}`} className=" w-10 h-10 rounded-full object-cover" alt="" />
                                 <div>
                                     <p className=" text-sm font-[600] text-gray-400 font-sans">{prop.property_poster.name}</p>
                                     <p className=" text-xs text-gray-400 font-sans">{prop.property_poster.email}</p>
                                 </div>
                             </div>
                             <div className="icons flex items-center gap-2">
                                 <Link to={`/detail/${prop._id}`}>
                                   <Button variant="contained" size="small" sx={{background:"#8FA282"}}><ExternalLink/></Button>
                                 </Link>
                             </div>
                         </div>
                     </div>
                 </div>
                     )
                 })}
             </div>
            {properties?.length > 6 && (
  <div className="text-center my-8">
      <Link to={"/properties"}>
        <Button 
        sx={{ backgroundColor: "#8FA282" }} 
        variant="contained"
      >
        See More
      </Button>
      </Link>
    
  </div>
)}
         </div>
           )}
        </div>
    </div>
  )
}

export default Featured_listing