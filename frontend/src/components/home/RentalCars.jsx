import { LocationOnOutlined } from "@mui/icons-material"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { ExternalLink } from "lucide-react";
import { Fetch_Retal_Cars } from "../../redux/action/carAction";


const RentalCars = () => {
    const {cars,carloading} = useSelector((state)=>state.Car);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(Fetch_Retal_Cars({}))
    },[dispatch])

        
  return (
    
    <div>
        <div className="wrapper my-20">
            <div className="header text-center">
            <h2 className=" px-4 py-1 bg-[#8FA282] inline-block rounded-full text-white">Cars</h2>
            <h2 className=" text-3xl md:text-4xl lg:text-5xl mt-4 font-[800]">Our Rental Cars</h2>
            </div>
           {carloading ? (<Loader/>): cars?.length===0 ? (
            <div className="flex justify-center items-center h-[40vh]">
              <div className=" flex flex-col gap-2 max-w-sm">
                <h1>No Cars Found</h1>
              </div>
            </div>
           ) :(
             <div className="card-wrapper mx-4 mt-10">
             <div className=" cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                 {cars?.slice(0,6).map((prop,index)=>{
                     return(
                         <div data-aos="fade-down"  data-aos-delay={`${index*100}`} data-aos-duration="1000" key={index} className="card group overflow-hidden border-gray-200 border">
                    <Link to={`/car/${prop._id}`}>
                    <div className="img relative before:absolute before:h-16 before:w-full before:bottom-0 before:bg-gradient-to-b before:from-[rgba(0,0,0,0)] before:to-[rgba(0,0,0,0.8)] before:z-20 overflow-hidden">
                     <img src={`${import.meta.env.VITE_BASE_URL}${prop?.images[0]}`} className=" w-full aspect-video object-cover group-hover:scale-105 duration-300" alt="" />
                     <div className="absolute bottom-2 z-40 left-[50%] w-[80%] translate-x-[-50%]">
                         <p className=" text-white"><LocationOnOutlined/> {prop.location.address}</p>
                     </div>
                     <div className=" absolute bg-[#8FA282] px-3 text-sm py-1 rounded-full top-2 left-2">
                        <span>{prop.carRentDuration}</span>
                     </div>
                     </div>
                    </Link>
                     <div className=" p-4">
                     <h2 className=' text-xl font-[700] font-sans text-[#8FA282]'>${`${prop.price} ${prop.category==="rent"? <span className=' font-[400] text-base'>/Month</span>:""}`}</h2>
                         <h2 className=" text-xl font-[600] text-black my-3 line-clamp-1 font-sans">{prop.carName}</h2>
                         <p className=" text-gray-500 font-[300] text-[16px] line-clamp-1 font-sans mt-2">{prop.description}</p>
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
                                 <Link to={`/car/${prop._id}`}>
                                   <Button variant="contained" size="small" sx={{background:"#8FA282"}}><ExternalLink/></Button>
                                 </Link>
                             </div>
                         </div>
                     </div>
                 </div>
                     )
                 })}
             </div>
            {cars?.length > 6 && (
  <div className="text-center my-8">
      
 <Link to={"/cars"}>
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

export default RentalCars