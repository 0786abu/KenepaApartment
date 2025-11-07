import { House } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { Fetch_Services } from "../redux/action/serviceAction";
import * as MuiIcons from "@mui/icons-material"; // Import all MUI icons dynamically
import Loader from "./Loader";


const Services = () => {
    const dispatch = useDispatch();
    const {services,serviceloading} = useSelector((state)=>state.Service);

    useEffect(()=>{
        dispatch(Fetch_Services())
    },[dispatch])
  return (
    <div>
        <div className="wrapper">
 <div className="header relative mt-16 h-[300px] bg-[url(https://tunatheme.com/tf/html/quarter-preview/quarter/img/bg/14.jpg)] bg-cover bg-no-repeat bg-center">
          <div className=" w-[200px] text-center absolute top-[50%] -translate-y-[50%] left-[50%] z-40 -translate-x-[50%]">
            <h2 className=" text-4xl mb-6 font-[800] text-black font-sans">Services</h2>
            <div className=" flex justify-start items-center gap-2">
              <span><House sx={{color:"#E8C696",fontSize:"30px"}}/></span>
              <span className=" text-black font-[600] font-sans text-lg">Home {">"} </span>
              <span className=" font-[600] text-black font-sans text-lg">Services</span>
            </div>
          </div>
        </div>

        <div className="cards-wrapper my-20 mx-0 sm:mx-2">
            <div className="serv_section max-w-6xl mx-auto flex max-[920px]:flex-col max-[920px]:w-[90%] max-sm:w-[95%] justify-center gap-8">
                <div className="imgs min-[920px]:w-[50%] w-full m-auto flex items-center">
                    <div className=" w-full">
                        <img src="https://ultra-agency.b-cdn.net/wp-content/uploads/sites/11/2023/08/cta-1.jpg" alt="" className="w-full hover:-translate-y-2 duration-300 transition-all p-1 object-cover"/>
                        <img src="https://ultra-agency.b-cdn.net/wp-content/uploads/sites/11/2023/08/cta-2.0.jpg" className="w-full p-1 object-cover hover:translate-y-2 duration-300 transition-all" alt="" />
                    </div>
                    <div className=" w-full">
                    <img src="https://ultra-agency.b-cdn.net/wp-content/uploads/sites/11/2023/08/cta-3.jpg" alt="" className="w-full hover:-translate-y-2 duration-300 transition-all p-1 object-cover"/>
                    <img src="https://ultra-agency.b-cdn.net/wp-content/uploads/sites/11/2023/08/cta-4.jpg" className="w-full p-1 object-cover hover:translate-y-2 duration-300 transition-all" alt="" />
                    </div>
                </div>
                <div className=" min-[920px]:w-[50%] w-full m-auto">
                    <h2 className=" px-4 py-1 bg-[#E8C696] text-white inline-block rounded-full font-bold mb-4">Services</h2>
                    <h2 className=" text-3xl md:text-4xl font-bold font-sans">We are your partner in creating a legacy building facade.</h2>
                    <p className=" text-lg md:text-xl font-[300] font-sans my-4 lg:my-8">We are one of the leading developers in europe providing exquisitely designed modern living villas in unique locations. We have made out quality development an hallmark by incorporating the latest in contemporary architecture to suit your tastes and budget.</p>
                    <p className=" text-lg md:text-xl font-[300] font-sans my-4 lg:my-8">Over 39,000 people work for us in more than 70 countries all over the This breadth of global coverage, combined with specialist services</p>
                    <button className=" px-6 py-4 z-50 before:duration-300 overflow-hidden after:duration-300 transition-all after:-z-10 before:-z-10 hover:before:right-[-100%] hover:after:left-0  text-white relative before:bg-[#E8C696] before:absolute before:top-0 before:bottom-0 before:right-0 after:absolute after:top-0 after:bottom-0 after:left-[-100%] after:w-full after:h-full after:bg-[#8FA282] before:w-full before:h-full mt-6">Read More</button>
                </div>
            </div>
        </div>

       {serviceloading ? (<Loader/>):(
         <div className="services-wrapper bg-[#F2F6F7] py-20 mb-10 min-h-screen flex justify-center items-center">
         <div>
         <div className="header text-center">
          <h2 className=" px-6 py-1 bg-[#E8C696] text-white inline-block rounded-full mb-4">Our Services</h2>
          <h2 className=" text-5xl font-extrabold font-sans">Our Core Services</h2>
          </div>
          <div className="cards-wrapper max-w-6xl mt-10 mx-auto grid gap-4 p-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {services?.map((serv,index)=>{
              const Icon = MuiIcons[serv.service_icon]
              return(
                  <div key={index} className="card max-[650px]:w-[350px] mx-auto max-[400px]:w-full relative before:h-1 before:w-full before:absolute before:left-[-100%] before:bg-[#E8C696] before:bottom-0 overflow-auto hover:before:left-0 before:duration-300 transition-all p-4 lg:p-6 bg-white">
                  <div className=" text-center my-8">{Icon && <Icon sx={{fontSize:"50px",color:"#E8C696"}}/>}</div>
                  <div className="content text-center">
                      <h2 className=" text-[26px] font-[800] font-sans mb-6 cursor-pointer hover:text-[#E8C696] duration-300 transition-all">{serv.service_title}</h2>
                      <p className=" font-sans font-[300]">{serv.service_description}</p>
                  </div>
              </div>
              )
            })}
          </div>
         </div>
      </div>

       )}
        </div>
    </div>
  )
}

export default Services