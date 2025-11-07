
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Admin_Side_Bar from './Admin_sidebar';
import Dash_Nav from "../components/Dashboard/Dash_Nav"
import { Delete_Service, Fetch_Services, Update_Service } from '../redux/action/serviceAction';
import Loader from '../components/Loader';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Spinnerr from '../components/Spinnerr';
import { Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const All_Services = () => {
    const [side, setSide] = useState(false); // Sidebar state
    const {user,actionloading} = useSelector((state)=>state.User);
    const {serviceloading,services,servicedelloading,serviceupdateloading} = useSelector((state)=>state.Service);
    const dispatch = useDispatch();
    const [description, setDescription] = useState()
    const [itemid, setItemid] = useState("");
    const [updated, setUpdated] = useState({
      service_title: "",
      service_description: "",
      service_icon: ""
    });
    const [service, setService] = useState()
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const handleOpen = (desc) => {
      setDescription(desc);
      setOpen(true);
    }
    const handleOpen1 = (servicee) => {
      setItemid(servicee._id)
      setOpen1(true);
      setService(servicee);
    }
    const handleClose = () => setOpen(false);
    const handleClose1 = () => setOpen1(false);
    const handledelete = (id) => {
       setItemid(id);
       dispatch(Delete_Service(id));
    }
    const handleupdate = (e) => {
      e.preventDefault();
      dispatch(Update_Service(itemid,updated,handleClose1));
    }


    useEffect(()=>{
      dispatch(Fetch_Services());
    },[dispatch])

    
    useEffect(()=>{
      if(service){
        setUpdated({
          service_title: service.service_title,
          service_description: service.service_description,
          service_icon: service.service_icon
        })
      }
    },[service])


  return (
   <div>
    <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      {description}
    </Typography>
   
  </Box>
</Modal>
    <Modal
  open={open1}
  onClose={handleClose1}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Update Service
    </Typography>
    <form action="" className=' space-y-2' onSubmit={handleupdate}>
    <div>
        <input
          type="text"
          name="name"
          value={updated.service_title}
          onChange={(e)=>setUpdated({...updated, service_title:e.target.value})}
          placeholder="Enter Member name"
          className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
          
        />
      </div>
    <div>
        <textarea
          type="text"
          name="name"
          value={updated.service_description}
          onChange={(e)=>setUpdated({...updated, service_description:e.target.value})}
          placeholder="Enter Member name"
          className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
          
        />
      </div>
    <div>
        <input
          type="text"
          name="name"
          value={updated.service_icon}
          onChange={(e)=>setUpdated({...updated, service_icon:e.target.value})}
          placeholder="Enter Member name"
          className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
          
        />
      </div>
      <Button variant='contained' type='submit'>{serviceupdateloading ? (
         <>
         update
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
      ):"Update"}</Button>
    </form>
  </Box>
</Modal>
    <div>
        <Dash_Nav side={side} setSide={setSide} user={user}/>
    </div>
     <div className="dashboard-wrapper">
            <Admin_Side_Bar side={side} setSide={setSide} user={user} loading={actionloading}/>
      <div className="dashboard-side min-h-screen ">
      <h2 className="text-center my-6 font-[800] text-3xl font-sans">All Services</h2>        
     {serviceloading ? (<Loader/>):(
       <div className="font-[sans-serif] overflow-x-auto m-4 border border-gray-200 rounded-xl shadow-lg">
       <table className="min-w-full bg-white">
         <thead className="whitespace-nowrap">
           <tr>
             <th className="p-4 text-left text-sm font-semibold text-black">
               Creator
             </th>
             <th className="p-4 text-left text-sm font-semibold text-black">
               Title
             </th>
             <th className="p-4 text-left text-sm font-semibold text-black">
               Description
             </th>
             <th className="p-4 text-left text-sm font-semibold text-black">
               Icon
             </th>
             <th className="p-4 text-left text-sm font-semibold text-black">
               Actions
             </th>
           </tr>
         </thead>
         <tbody className="whitespace-nowrap">
           {services?.map((item,index)=>{
             return (
               <tr key={index} className="">
             <td className="p-4 text-sm">
               <div className="flex items-center cursor-pointer w-max">
                 <img src={`${import.meta.env.VITE_BASE_URL}${item.poster.profile}`} className="w-10 h-10 rounded-full shrink-0 object-cover" />
                 <div className="ml-4">
                   <p className="text-sm text-black">{item.poster.name}</p>
                   <p className="text-xs text-gray-500 mt-0.5">{item.poster.email}</p>
                 </div>
               </div>
             </td>
             <td className="p-4 text-sm uppercase">
               {item.service_title}
             </td>
             <td className="p-4">
               {item.service_description.slice(0,20)}... <span onClick={()=>handleOpen(item.service_description)} className='text-cyan-500 hover:underline cursor-pointer'>See More</span>
             </td>
             <td className={`p-4`}>
                {item.service_icon}
             </td>
             <td className="p-4">
               <button className="mr-4" title="Edit" onClick={()=>handleOpen1(item)}>
                 <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-blue-500 hover:fill-blue-700" viewBox="0 0 348.882 348.882">
                   <path d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z" data-original="#000000" />
                   <path d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z" data-original="#000000" />
                 </svg>
               </button>
               <button title="Delete" onClick={()=>handledelete(item._id)}>
                {(itemid === item._id && servicedelloading) ? <Spinnerr/> : (
                   <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
                   <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" data-original="#000000" />
                   <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" data-original="#000000" />
                 </svg>
                )}
               </button>
             </td>
           </tr>
             )
           })}
         </tbody>
       </table>
     </div>
     )}
        </div>
    </div>
   </div>
   
  )
}

export default All_Services