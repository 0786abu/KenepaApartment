// import { AttachMoney } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Admin_Side_Bar from './Admin_sidebar';
import Dash_Nav from "../components/Dashboard/Dash_Nav"
import { Fetch_All_Properties_Admin } from '../redux/action/adminAction';
import Spinnerr from '../components/Spinnerr';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { fetch_Contacts } from '../redux/action/contactAction';

const Admin_Dashboard = () => {
    const [side, setSide] = useState(false); // Sidebar state
    const {user,actionloading} = useSelector((state)=>state.User);
    const {allproperties,p_loading} = useSelector((state)=>state.Admin);
    const {contacts,contactloading} = useSelector((state)=>state.Contact);
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(Fetch_All_Properties_Admin());
      dispatch(fetch_Contacts());
    },[dispatch])


  return (
   <div>
    <div>
        <Dash_Nav side={side} setSide={setSide} user={user}/>
    </div>
     <div className="dashboard-wrapper">
            <Admin_Side_Bar side={side} setSide={setSide} user={user} loading={actionloading}/>
      <div className="dashboard-side min-h-screen ">        
      <div className="card-wrapper md:flex items-center">
          <div className="side-left w-full">
          <div className="card-dash-1-wrapper  grid max-[450px]:grid-cols-1 grid-cols-2 gap-1">     
                <div className="card-dash-4 hover:shadow-2xl border relative  p-2 m-2 rounded-lg shadow-xl"
                data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1400"
                >
                <div className="img absolute top-4 max-md:top-8 mix-blend-screen left-4 max-md:w-[120px] max-md:left-1 w-[200px] h-[200px]">
                <img src="/images/sale-arrow.png" width='100%' alt="" />
                </div>
                  <div className=" flex justify-between items-center">
                  <div>
                   <p>Properties</p>
                   {p_loading ? (<Spinnerr/>):(
                    <p>{allproperties?.length}</p>
                   )}
                   </div>
                   <div>
                   <i className="fa-solid fa-cart-shopping p-2 bg-gray-200 rounded-md"></i>
                   </div>
                  </div>

                 <div className=" flex justify-between items-center mt-16">
                 <div className=" flex gap-2">
                  <p className="px-2 py-1 rounded-sm text-xs bg-gray-500 text-white">96%</p>
                  <span>Last Month</span>
                  </div>
                  <div>
                  <i className="fa-solid fa-arrow-trend-up"></i>
                  </div>
                 </div>
                </div>
                <div className="card-dash-4 hover:shadow-2xl border relative  p-2 m-2 rounded-lg shadow-xl"
                data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1400"
                >
                <div className="img absolute top-4 max-md:top-8 mix-blend-screen left-4 max-md:w-[120px] max-md:left-1 w-[200px] h-[200px]">
                <img src="/images/sale-arrow.png" width='100%' alt="" />
                </div>
                  <div className=" flex justify-between items-center">
                  <div>
                   <p>Contacts</p>
                   {contactloading ? (<Spinnerr/>):(
                    <p>{contacts?.length}</p>
                   )}
                   </div>
                   <div>
                   <i className="fa-solid fa-cart-shopping p-2 bg-gray-200 rounded-md"></i>
                   </div>
                  </div>

                 <div className=" flex justify-between items-center mt-16">
                 <div className=" flex gap-2">
                  <p className="px-2 py-1 rounded-sm text-xs bg-gray-500 text-white">96%</p>
                  <span>Last Month</span>
                  </div>
                  <div>
                  <i className="fa-solid fa-arrow-trend-up"></i>
                  </div>
                 </div>
                </div>
            </div>


          </div>
        </div>

        <div className="recent-proerties">
          <div className="wrapper">
            <h2 className="text-center my-10 font-[800] text-3xl font-sans">Recent Posting</h2>
       <div className="font-[sans-serif] overflow-x-auto m-4 border border-gray-200 rounded-xl shadow-lg">
  <table className="min-w-full bg-white">
    <thead className="whitespace-nowrap">
      <tr>
        <th className="p-4 text-left text-sm font-semibold text-black">
          Property
        </th>
        <th className="p-4 text-left text-sm font-semibold text-black">
          Creator
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 fill-gray-400 inline cursor-pointer ml-2" viewBox="0 0 401.998 401.998">
            <path d="M73.092 164.452h255.813c4.949 0 9.233-1.807 12.848-5.424 3.613-3.616 5.427-7.898 5.427-12.847s-1.813-9.229-5.427-12.85L213.846 5.424C210.232 1.812 205.951 0 200.999 0s-9.233 1.812-12.85 5.424L60.242 133.331c-3.617 3.617-5.424 7.901-5.424 12.85 0 4.948 1.807 9.231 5.424 12.847 3.621 3.617 7.902 5.424 12.85 5.424zm255.813 73.097H73.092c-4.952 0-9.233 1.808-12.85 5.421-3.617 3.617-5.424 7.898-5.424 12.847s1.807 9.233 5.424 12.848L188.149 396.57c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428l127.907-127.906c3.613-3.614 5.427-7.898 5.427-12.848 0-4.948-1.813-9.229-5.427-12.847-3.614-3.616-7.899-5.42-12.848-5.42z" data-original="#000000" />
          </svg>
        </th>
        <th className="p-4 text-left text-sm font-semibold text-black">
          Type
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 fill-gray-400 inline cursor-pointer ml-2" viewBox="0 0 401.998 401.998">
            <path d="M73.092 164.452h255.813c4.949 0 9.233-1.807 12.848-5.424 3.613-3.616 5.427-7.898 5.427-12.847s-1.813-9.229-5.427-12.85L213.846 5.424C210.232 1.812 205.951 0 200.999 0s-9.233 1.812-12.85 5.424L60.242 133.331c-3.617 3.617-5.424 7.901-5.424 12.85 0 4.948 1.807 9.231 5.424 12.847 3.621 3.617 7.902 5.424 12.85 5.424zm255.813 73.097H73.092c-4.952 0-9.233 1.808-12.85 5.421-3.617 3.617-5.424 7.898-5.424 12.847s1.807 9.233 5.424 12.848L188.149 396.57c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428l127.907-127.906c3.613-3.614 5.427-7.898 5.427-12.848 0-4.948-1.813-9.229-5.427-12.847-3.614-3.616-7.899-5.42-12.848-5.42z" data-original="#000000" />
          </svg>
        </th>
        <th className="p-4 text-left text-sm font-semibold text-black">
          Size
        </th>
      </tr>
    </thead>
    <tbody className="whitespace-nowrap">
      {allproperties?.slice(0,6).map((item,index)=>{
        return (
          <tr key={index} className="">
        <td className="p-4 text-sm">
          <div className="flex items-center cursor-pointer w-max">
            <img src={`${import.meta.env.VITE_BASE_URL}${item.images[0]}`} className="w-12 h-12 rounded-full shrink-0" />
            <div className="ml-4">
              <p className="text-sm text-black">{item.property_type}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.location.address}</p>
            </div>
          </div>
        </td>
        <td className="p-4 text-sm">
          <div className="flex items-center cursor-pointer w-max">
            <img src={`${import.meta.env.VITE_BASE_URL}${item.property_poster.profile}`} className="w-9 h-9 rounded-full shrink-0" />
            <div className="ml-4">
              <p className="text-sm text-black">{item.property_poster.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.property_poster.email}</p>
            </div>
          </div>
        </td>
        <td className="p-4">
          {item.property_type}
        </td>
        <td className="p-4">
            sqft {item.size}
        </td>
      </tr>
        )
      })}
    </tbody>
  </table>
</div>
 {allproperties?.length>6 && (
   <div className=' text-center my-4'>
   <Link to="/admin-dashboard-allproperties"> <Button variant='contained'>See All</Button></Link>
  </div>
 )}

          </div>
        </div>

      
        </div>
    </div>
   </div>
   
  )
}

export default Admin_Dashboard