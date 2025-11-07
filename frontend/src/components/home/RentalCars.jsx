import { LocationOnOutlined } from "@mui/icons-material"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { ExternalLink, Trash } from "lucide-react";
import { Fetch_Retal_Cars } from "../../redux/action/carAction";

const locations = [
    "Beverly Hills Blvd",
    "Ave, Manhattan",
    "Miami",
    "Houston",
    "Chicago",
    "San Francisco"
]
const carTypes = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Coupe",
  "Convertible",
  "Pickup Truck",
  "Crossover",
  "Station Wagon",
  "Minivan",
  "Sports Car",
  "Electric",
  "Hybrid",
  "Luxury",
  "Off-Road",
  "Compact",
  "Microcar",
  "Roadster",
  "Muscle Car",
  "Diesel",
  "Van"
];
const carModels = [
  "2000", "2001", "2002", "2003", "2004", "2005",
  "2006", "2007", "2008", "2009", "2010",
  "2011", "2012", "2013", "2014", "2015",
  "2016", "2017", "2018", "2019", "2020",
  "2021", "2022", "2023", "2024", "2025"]

const RentalCars = () => {
    const {cars,carloading} = useSelector((state)=>state.Car);
    const dispatch = useDispatch();
    const [address, setAddress] = useState("");
    const [carType, setCarType] = useState("");
    const [carModel, setCarModel] = useState("")
    const [count, setCount] = useState(9)

    useEffect(()=>{
        dispatch(Fetch_Retal_Cars({address,carType,carModel}))
    },[dispatch,address,carType,carModel])

    const clearFilter = ()=>{
        setAddress("");
        setCarModel("")
        setCarType("")
    }
    const seeMoreHandle = ()=>{
        setCount(prev=>prev+6)
    }
        
  return (
    
    <div>
        <div className="wrapper my-20">
            <div className="header text-center">
            <h2 className=" px-4 py-1 bg-[#8FA282] inline-block rounded-full text-white">Properties</h2>
            <h2 className=" text-3xl md:text-4xl lg:text-5xl mt-4 font-[800]">Our Rental Cars</h2>
            </div>
            <div className="max-w-lg grid grid-cols-2 sm:grid-cols-14 gap-2 m-auto my-4">
                <div className="relative sm:col-span-4">
            <select
              aria-label="Location or City"
              className="appearance-none w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 pr-10 text-gray-800 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
              defaultValue=""
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
            >
              <option value="" disabled>Choose city</option>
              {locations.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* chevron icon */}
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
              <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
                <div className="relative sm:col-span-4">
            <select
              aria-label="Location or City"
              className="appearance-none w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 pr-10 text-gray-800 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
              value={carType}
              onChange={(e)=>setCarType(e.target.value)}
            >
              <option value="" disabled>Car Type</option>
              {carTypes.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* chevron icon */}
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
              <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
                <div className="relative sm:col-span-4">
            <select
              aria-label="Location or City"
              className="appearance-none w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 pr-10 text-gray-800 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
              value={carModel}
              onChange={(e)=>setCarModel(e.target.value)}
            >
              <option value="" disabled>Model</option>
              {carModels.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* chevron icon */}
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
              <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          {(address || carType || carModel) && (
            <div className="sm:col-span-2">
            <button onClick={clearFilter} className="p-2 rounded-full bg-[#8FA282]" title="Clear Filter"><Trash className="text-white max-sm:hidden"/> <span className="text-sm sm:hidden text-white">Clear Filter</span></button>
          </div>
          )}
            </div>
           {carloading ? (<Loader/>):(
             <div className="card-wrapper mx-4 mt-10">
             <div className=" cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                 {cars?.slice(0,count).map((prop,index)=>{
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
                         <h2 className=" text-xl font-[600] text-black my-3 line-clamp-1 font-sans">{prop.title}</h2>
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
            {cars?.length > 9 && (
  <div className="text-center my-8">
    {count < cars.length ? (
      <Button 
        onClick={seeMoreHandle} 
        sx={{ backgroundColor: "#8FA282" }} 
        variant="contained"
      >
        See More
      </Button>
    ) : (
      <Button 
        onClick={() => setCount(9)} 
        sx={{ backgroundColor: "#8FA282" }} 
        variant="contained"
      >
        Show Less
      </Button>
    )}
  </div>
)}
         </div>
           )}
        </div>
    </div>
  )
}

export default RentalCars