// import { AttachMoney } from '@mui/icons-material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Admin_Side_Bar from './Admin_sidebar';
import Dash_Nav from "../components/Dashboard/Dash_Nav"
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Create_Service } from '../redux/action/serviceAction';

const Add_Service = () => {
    const [side, setSide] = useState(false); // Sidebar state
    const {user,actionloading} = useSelector((state)=>state.User);
    const {createserloading} = useSelector((state)=>state.Service);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [service, setService] = useState({
        service_title:"",
        service_description:"",
        service_icon:""
    });
        const handlesubmit = async(e)=>{
            e.preventDefault();
            dispatch(Create_Service(service,navigate));
        }
  return (
   <div>
    <div>
        <Dash_Nav side={side} setSide={setSide} user={user}/>
    </div>
     <div className="dashboard-wrapper">
            <Admin_Side_Bar side={side} setSide={setSide} user={user} loading={actionloading}/>
      <div className="dashboard-side min-h-screen ">      
      <h2 className="text-center my-6 font-[800] text-3xl font-sans">Add Service</h2>  
      <div className="wrapper mx-2">
        <form action="" className="formm max-w-4xl mx-auto space-y-4" onSubmit={handlesubmit}>
        <div>
        <input
          type="text"
          value={service.service_title}
          onChange={(e)=>setService({...service, service_title:e.target.value})}
          placeholder="Enter Service Title"
          className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
          
        />
      </div>
        <div>
        <input
          type="text"
          value={service.service_description}
          onChange={(e)=>setService({...service, service_description:e.target.value})}
          placeholder="Enter Service Description"
          className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
          
        />
      </div>
        <div>
        <input
          type="text"
          value={service.service_icon}
          onChange={(e)=>setService({...service, service_icon:e.target.value})}
          placeholder="Enter Service Icon"
          className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
          
        />
      </div>
           <div className="mt-4">
        <Button type='submit' variant='contained' sx={{background:"#1e2939",width:"100%"}}>
            
  {createserloading ? (
    <>
      Submit
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18px"
        fill="#fff"
        className="ml-2 inline animate-spin"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
          data-original="#000000"
        />
      </svg>
    </>
  ) : (
    "Submit"
  )}
        </Button>
      </div>
        </form>
      </div>
        </div>
    </div>
   </div>
   
  )
}

export default Add_Service