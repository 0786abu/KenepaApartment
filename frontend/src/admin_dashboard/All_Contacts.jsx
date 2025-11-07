// import { AttachMoney } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Admin_Side_Bar from './Admin_sidebar';
import Dash_Nav from "../components/Dashboard/Dash_Nav"
import Loader from '../components/Loader';
import Spinnerr from '../components/Spinnerr';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { Delete_Contact, fetch_Contacts, Update_Contact } from '../redux/action/contactAction';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  '@media screen and (max-width:600px)':{
    width:300
  },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxHeight:"80vh",
  overflow:'auto'
};


const All_Contacts = () => {
    const [side, setSide] = useState(false); // Sidebar state
    const {user,actionloading} = useSelector((state)=>state.User);
    const {contactloading,contacts,conupdateloading,contactdelloading} = useSelector((state)=>state.Contact);
    const dispatch = useDispatch();
    const [itemid, setItemid] = useState("")
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [message, setMessage] = useState("");
    const [contactdata, setContactdata] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        message: ""
    })
    const [contact, setContact] = useState();
    const handleOpen = (id,contactt) => {
        setOpen(true);
        setItemid(id)
        setContact(contactt)
    };
    const handleClose = () => setOpen(false);
    const handleClose1 = () => setOpen1(false);

    const handlesee = (msg)=>{
        setMessage(msg)
        setOpen1(true)
    }


    useEffect(()=>{
      dispatch(fetch_Contacts());
    },[dispatch])
    const handledelete = (id)=>{
        setItemid(id)
        dispatch(Delete_Contact(id))
    }
    const handleupdate = (e)=>{
        e.preventDefault()
        dispatch(Update_Contact(itemid,contactdata,handleClose))
    }
    useEffect(()=>{
        if(contact){
            setContactdata({
                name: contact.name,
                email: contact.email,
                phone: contact.phone,
                address: contact.address,
                message: contact.message
            })
        }
    },[contact])

  return (
   <div>
    <div>
        <Dash_Nav side={side} setSide={setSide} user={user}/>
    </div>
     <div className="dashboard-wrapper">
            <Admin_Side_Bar side={side} setSide={setSide} user={user} loading={actionloading}/>
      <div className="dashboard-side min-h-screen ">   
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Message
          </Typography>
          <p>{message}</p>
          </Box>
          </Modal>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Contact
          </Typography>
          {/* <form action=""> */}
           <form className="formm border p-2 md:p-4 w-full shadow-md" onSubmit={handleupdate}>
                                 <div className="wrapper">
                                     <h2 className=" text-3xl font-sans font-[600] mb-4">Get A Quote</h2>
                                         <div className="input w-full relative my-2">
                                             <input type="text" placeholder="Enter Your Name" value={contactdata.name} onChange={(e)=>setContactdata({...contactdata,name:e.target.value})} className=" border-2 border-gray-100 pl-4 outline-none h-14 w-full" />
                                         </div>
                                         <div className="input w-full relative my-2">
                                             <input type="text" placeholder="Enter Email Address" value={contactdata.email} onChange={(e)=>setContactdata({...contactdata,email:e.target.value})} className=" border-2 border-gray-100 pl-4 outline-none h-14 w-full" />
                                         </div>
                                         <div className="input w-full my-2">
                                         <input type="text" placeholder="Enter Address" value={contactdata.address} onChange={(e)=>setContactdata({...contactdata,address:e.target.value})} className=" border-2 border-gray-100 pl-4 outline-none h-14 w-full" />
                                         </div>
                                         <div className="input w-full relative my-2">
                                             <input type="text" placeholder="Enter Phone Number" value={contactdata.phone} onChange={(e)=>setContactdata({...contactdata,phone:parseInt(e.target.value)||""})} className=" w-full border-2 border-gray-100 outline-none h-14 pl-4" />
                                         </div>
                                     <div className=" relative w-full mt-8">
                                         <textarea name="" id="" className=" w-full h-32 border-2 p-4 border-gray-100 outline-none" placeholder="Enter Message " value={contactdata.message} onChange={(e)=>setContactdata({...contactdata,message:e.target.value})}></textarea>
                                     </div>
                                     <div className=" mt-4 space-x-2 flex items-center">
                                         <input type="checkbox" name="" id="" required/>
                                         <label htmlFor="" className=" text-gray-500 font-[350] font-sans">Save my name, email, and website in this browser for the next time I comment.</label>
                                     </div>
                                     <button type="submit" className=" px-6 py-2 z-50 before:duration-300 overflow-hidden after:duration-300 transition-all after:-z-10 before:-z-10 hover:before:right-[-100%] hover:after:left-0  text-white relative before:bg-[#ff5a3c] before:absolute before:top-0 before:bottom-0 before:right-0 after:absolute after:top-0 after:bottom-0 after:left-[-100%] after:w-full after:h-full after:bg-black before:w-full before:h-full mt-6">
                                     {conupdateloading ? (
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
                                     </button>
                                 </div>
                             </form>
          {/* </form> */} <br />
          <Button variant='contained' onClick={handleupdate}>
            
  {conupdateloading ? (
    <>
      Update
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
    "Update"
  )}
          </Button>
      </Box> 
      </Modal>    
    

        <div className="agents">
        <div className="recent-proerties">
          <div className="wrapper">
            <h2 className="text-center my-6 font-[800] text-3xl font-sans">All Contacts</h2>
    {contactloading ? (<Loader/>):(
           <div className="font-[sans-serif] overflow-x-auto m-4 border border-gray-200 rounded-xl shadow-lg">
           <table className="min-w-full bg-white">
             <thead className="whitespace-nowrap">
               <tr>
                 <th className="p-4 text-left text-sm font-semibold text-black">
                   Profile
                 </th>
                 <th className="p-4 text-left text-sm font-semibold text-black">
                   Type
                 </th>
                 <th className="p-4 text-left text-sm font-semibold text-black">
                   Address
                 </th>
                 <th className="p-4 text-left text-sm font-semibold text-black">
                   Role
                 </th>
                 <th className="p-4 text-left text-sm font-semibold text-black">
                   isVerified
                 </th>
                 <th className="p-4 text-left text-sm font-semibold text-black">
                   Actions
                 </th>
               </tr>
             </thead>
             <tbody className="whitespace-nowrap">
               {contacts?.map((item,index)=>{
                 return (
                   <tr key={index} className="">
                 <td className="p-4 text-sm">
                  {item.name}
                 </td>
                 <td className="p-4 text-sm">
                 {item.email}
                 </td>
                 <td className="p-4">
                   {item.address}
                 </td>
                 <td className="p-4 uppercase">
                   {item.phone}
                 </td>
                 <td className={`p-4`}>
                    {item.message.slice(0,20)}... <span className="text-cyan-500 hover:underline cursor-pointer" onClick={()=>handlesee(item.message)}>See more</span>
                 </td>
                 <td className="p-4">
                   <button className="mr-4" title="Edit" onClick={()=>handleOpen(item._id,item)}>
                     <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-blue-500 hover:fill-blue-700" viewBox="0 0 348.882 348.882">
                       <path d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z" data-original="#000000" />
                       <path d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z" data-original="#000000" />
                     </svg>
                   </button>
                     <button title="Delete" onClick={()=>handledelete(item._id)}>
                  {(contactdelloading && item._id === itemid) ? (<Spinnerr/>):(
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
      
        </div>
    </div>
   </div>
   
  )
}

export default All_Contacts