import { EastOutlined } from "@mui/icons-material"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fetch_Services } from "../../redux/action/serviceAction";
import * as MuiIcons from "@mui/icons-material"; // Import all MUI icons dynamically
import Loader from "../Loader";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";


const Services = () => {
    const dispatch = useDispatch();
    const {services,serviceloading} = useSelector((state)=>state.Service);

    useEffect(()=>{
        dispatch(Fetch_Services())
    },[dispatch])
  return (
    <div className="wrapper mb-20">
        <div className=" text-center">
            <h2 className=" px-4 py-1 bg-[#E8C696] inline-block rounded-full text-white">Our Services</h2>
        </div>
        <div className=" text-center mt-4">
            <h2 className=" text-4xl text-[#E8C696] font-[800]">Our Main Focus</h2>
        </div>
        {serviceloading ? (<Loader/>):(
              <div className="mx-4 mt-20">
              <div className="cards max-w-6xl mx-auto gap-4 md:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {services?.slice(0,3).map((serv,index)=>{
                  const Icon = MuiIcons[serv.service_icon];
                  return(
                      <div key={index} data-aos="fade-up" data-aos-delay="0" data-aos-anchor-placement="bottom-bottom" className="bg-white m-auto sm:w-full w-[350px] max-[400px]:w-full card overflow-hidden relative group shadow-md md:shadow-lg">
                       <div className=" text-center my-8">{Icon && <Icon sx={{fontSize:"50px",color:"#E8C696"}}/>}</div>
                      <div className=" p-4 text-center space-y-4">
                          <h2 className=" text-xl font-[700]">Buy a Home</h2>
                          <p className=" text-gray-600 text-base font-[300]">over 1 million+ homes Available for sale available on the website, we can match you with a house you will want to call home.</p>
                          <p className=" font-[400] group-hover:text-[#E8C696] duration-300 transition-all">Find A Home <span className=" ml-2"><EastOutlined/></span></p>
                      </div>
                      <div className=" absolute h-1 -left-[100%] bottom-0 group-hover:left-0 duration-300 transition-all bg-[#E8C696] w-full ">
      
                      </div>
                  </div>
                  )
              })}
              </div>
              </div>
        )}
       {services?.length>3 && (
         <div className=" text-center my-8">
         <Link to="/services"><Button variant="contained" sx={{backgroundColor:"#E8C696"}}>See More</Button></Link>
     </div>
       )}
    </div>
  )
}

export default Services