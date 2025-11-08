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
import { Delete_FeaturedCity, Fetch_FeatredCities, Update_FeatiredCity } from '../redux/action/CityAction';

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
const cities = [
  "Amsterdam",       // Capital & most visited city
  "Rotterdam",       // Major port city, modern architecture
  "The Hague",       // Government & royal residence
  "Utrecht",         // Central hub, canals & universities
  "Eindhoven",       // Technology & innovation center (Philips HQ)
  "Tilburg",         // Industrial & student city
  "Groningen",       // Northern cultural & student city
  "Maastricht",      // Historic city near Belgium border
  "Breda",           // Southern vibrant city
  "Nijmegen",        // Oldest city in Netherlands
  "Leiden",          // University town near The Hague
  "Delft",           // Famous for Delft Blue pottery
  "Haarlem",         // Close to Amsterdam, great for living
  "Amersfoort",      // Growing city, good housing demand
  "Almere",          // Modern city near Amsterdam
  "Arnhem",          // Cultural & nature-rich city
  "Zwolle",          // Central charming city
  "Den Bosch",       // Also called ’s-Hertogenbosch
  "Leeuwarden",      // Friesland’s capital, cultural city
  "Enschede",        // Near Germany, student hub
  "Dordrecht",       // Historic port city
  "Helmond",         // Developing tech city near Eindhoven
  "Hoofddorp",       // Close to Schiphol Airport (business area)
  "Zaandam",         // Industrial & residential near Amsterdam
  "Apeldoorn",       // Green city with royal palace
];




const All_FeaturedCities = () => {
    const [side, setSide] = useState(false); // Sidebar state
    const {user,actionloading} = useSelector((state)=>state.User);
    const {cityloading,feat_cities,citydelloading,cityupdateloading} = useSelector((state)=>state.FeaturedCity);
    const dispatch = useDispatch();
    const [itemid, setItemid] = useState("")
    const [citty, setCitty] = useState()
    const [open, setOpen] = useState(false);
    const [contactdata, setContactdata] = useState({
        cityname: "",
        total_properties: Number,
    })
    const handleOpen = (id,cityy) => {
        setOpen(true);
        setItemid(id)
        setCitty(cityy)
    };
    
 
    const handleClose = () => setOpen(false);
    
    const handledelete = (id)=>{
        setItemid(id)
        dispatch(Delete_FeaturedCity(id))
    }
    const handleupdate = async(e)=>{
        e.preventDefault()
        dispatch(Update_FeatiredCity(itemid,contactdata,handleClose))
    }
    useEffect(()=>{
        if(citty){
            setContactdata({
                cityname: citty.cityname,
                total_properties: citty.total_properties
            });
        }
    },[citty])
    useEffect(()=>{
      dispatch(Fetch_FeatredCities());
    },[dispatch])
    
  return (
   <div>
    <div>
        <Dash_Nav side={side} setSide={setSide} user={user}/>
    </div>
     <div className="dashboard-wrapper">
            <Admin_Side_Bar side={side} setSide={setSide} user={user} loading={actionloading}/>
      <div className="dashboard-side min-h-screen ">   
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
                                             <select value={contactdata.cityname} onChange={(e)=>setContactdata({...contactdata,cityname:e.target.value})}className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all">
            <option value="">Select City</option>
            {cities.map((city,index)=>(
                <option value={city} key={index}>{city}</option>
            ))}
    
        </select>
                                         </div>
                                         <div className="input w-full relative my-2">
                                             <input type="text" placeholder="Enter no of properties" value={contactdata.total_properties} onChange={(e)=>setContactdata({...contactdata,total_properties:parseInt(e.target.value)||""})} className=" border-2 border-gray-100 pl-4 outline-none h-14 w-full" />
                                         </div>
                                     <button type="submit" className=" px-6 py-2 z-50 before:duration-300 overflow-hidden after:duration-300 transition-all after:-z-10 before:-z-10 hover:before:right-[-100%] hover:after:left-0  text-white relative before:bg-[#ff5a3c] before:absolute before:top-0 before:bottom-0 before:right-0 after:absolute after:top-0 after:bottom-0 after:left-[-100%] after:w-full after:h-full after:bg-black before:w-full before:h-full mt-6">
                                     {cityupdateloading ? (
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
                                     </button>
                                 </div>
                             </form>
      </Box> 
      </Modal>    
    

        <div className="agents">
        <div className="recent-proerties">
          <div className="wrapper">
            <h2 className="text-center my-6 font-[800] text-3xl font-sans">Customer Reviews</h2>
    {cityloading ? (<Loader/>):(
           <div className="font-[sans-serif] overflow-x-auto m-4 border border-gray-200 rounded-xl shadow-lg">
           <table className="min-w-full bg-white">
             <thead className="whitespace-nowrap">
               <tr>
                 <th className="p-4 text-left text-sm font-semibold text-black">
                   Image
                 </th>
                 <th className="p-4 text-left text-sm font-semibold text-black">
                   City Name
                 </th>
                 <th className="p-4 text-left text-sm font-semibold text-black">
                   No of Properties
                 </th>
                 <th className="p-4 text-left text-sm font-semibold text-black">
                   Creator
                 </th>
                 <th className="p-4 text-left text-sm font-semibold text-black">
                   Actions
                 </th>
               </tr>
             </thead>
             <tbody className="whitespace-nowrap">
               {Array.isArray(feat_cities) && feat_cities.length > 0 ?
              ( feat_cities?.map((item,index)=>{
                 return (
                   <tr key={index} className="">
                 <td className="p-4 text-sm">
                  <img src={`${import.meta.env.VITE_BASE_URL}${item.image}`} className=' w-12 h-12 rounded-full object-cover' alt="" />
                 </td>
                 <td className="p-4 text-sm">
                 {item.cityname}
                 </td>
                 <td className="p-4">
                   {item.total_properties}
                 </td>
                 <td className={`p-4 flex items-center gap-2`}>
                 <img src={`${import.meta.env.VITE_BASE_URL}${item.poster.profile}`} className=' w-12 h-12 rounded-full object-cover' alt="" />
                 <div>
                    <p className="text-sm font-[300] text-gray-600">{item.poster.name}</p>
                    <p className="text-sm font-[300] text-gray-600">{item.poster.email}</p>
                 </div>
                 </td>
                 <td className="p-4">
                   <button className="mr-4" title="Edit" onClick={()=>handleOpen(item._id,item)}>
                     <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-blue-500 hover:fill-blue-700" viewBox="0 0 348.882 348.882">
                       <path d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z" data-original="#000000" />
                       <path d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z" data-original="#000000" />
                     </svg>
                   </button>
                     <button title="Delete" onClick={()=>handledelete(item._id)}>
                  {(citydelloading && item._id === itemid) ? (<Spinnerr/>):(
                     <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
                       <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" data-original="#000000" />
                       <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" data-original="#000000" />
                     </svg>
                  )}
                   </button>
                 </td>
               </tr>
                 )
               })):(
                  <tr>
    <td colSpan="5" className="text-center py-6 text-gray-500">
      No Featured Cities Found
    </td>
  </tr>
               )
               }
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

export default All_FeaturedCities