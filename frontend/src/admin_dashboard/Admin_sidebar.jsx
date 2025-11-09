/* eslint-disable react/prop-types */
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Fence, HandCoins, Settings } from 'lucide-react';
import { LogoutOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { LogoutUser } from '../redux/action/userAction';



const Admin_Side_Bar = ({ side,loading }) => {
    const [isactive, setIsactive] = useState(0)
    const [isopentoggle, setIsopentoggle] = useState(false)
    const isopen = (ind)=>{
        setIsactive(ind)
        setIsopentoggle(!isopentoggle)
    }
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(LogoutUser(navigate))
    }
  return (
    <div>
        <div id="sidebar-wrapper" className={`${side ? "open":""} bg-black`}>
            <div className="sidebar hover:overflow-y-auto h-full scrollbar-hide scrollbar-thin scrollbar-track-transparent scrollbar-thumb-blue-500 hover:scrollbar-thumb-blue-700">
            <ul className=" px-2 py-6 text-white">
                <li id="cc" className={`flex justify-between p-2 rounded-lg my-4 ${isactive===0 ? "text-blue-500" : "text-white"}`} onClick={()=>isopen(0)}>
                  <Link to='/admin-dashboard'>
                  <div className=" flex justify-center space-x-2">
                        <DashboardIcon/> <p className=" cursor-pointer">DashBoard</p>
                    </div>
                  </Link>
                </li>
                    <li className=" my-4">
                    <div id="cc" className={`flex justify-between p-2 rounded-lg ${isactive===1 ? "text-blue-500" : "text-white"}`} onClick={()=>isopen(1)}>
                    <div className=" flex justify-center  space-x-2">
                         <Fence/> <p className=" cursor-pointer">Properties</p>
                     </div>
                     <div className="arrow">
                         {/* {isopentoggle && isactive===1 ? <KeyboardArrowDownIcon/> : <KeyboardArrowRightIcon/>} */}
                         
                         <i className={ `fa-solid fa-chevron-up ${isopentoggle&&isactive===1 ? " rotate-180 duration-300":"rotate-90 duration-500"}`}></i>
                     </div>
                    </div>
                     <div className={`submenu-wrapper ${isactive===1 && isopentoggle===true ? "colaps":"colapsd"}`}>
                         <ul className="submenu text-start pl-8 border-l-2 mt-2">
                         <li className="my-2"><Link to="/admin-dashboard-allproperties">All Properties</Link></li>
                         <li className="my-2"><Link to="/admin-dashboard-addproperty">Add Property</Link></li>
                         </ul>
                     </div>
                 </li>
                    <li className=" my-4">
                    <div id="cc" className={`flex justify-between p-2 rounded-lg ${isactive===22 ? "text-blue-500" : "text-white"}`} onClick={()=>isopen(22)}>
                    <div className=" flex justify-center  space-x-2">
                         <Fence/> <p className=" cursor-pointer">Cars</p>
                     </div>
                     <div className="arrow">
                         {/* {isopentoggle && isactive===22 ? <KeyboardArrowDownIcon/> : <KeyboardArrowRightIcon/>} */}
                         
                         <i className={ `fa-solid fa-chevron-up ${isopentoggle&&isactive===22 ? " rotate-180 duration-300":"rotate-90 duration-500"}`}></i>
                     </div>
                    </div>
                     <div className={`submenu-wrapper ${isactive===22 && isopentoggle===true ? "colaps":"colapsd"}`}>
                         <ul className="submenu text-start pl-8 border-l-2 mt-2">
                         <li className="my-2"><Link to="/admin-dashboard-allcars">All Cars</Link></li>
                         <li className="my-2"><Link to="/admin-dashboard-add_car">Add Car</Link></li>
                         </ul>
                     </div>
                 </li>
                <li id="cc" className={`flex justify-between p-2 rounded-lg my-4 ${isactive===8 ? "activ" : ""}`} onClick={()=>isopen(4)}>
                  <Link to='/admin-dashboard-allcontacts'>
                  <div className=" flex justify-center space-x-2">
                        <HandCoins/> <p className=" cursor-pointer">Contacts</p>
                    </div>
                  </Link>
                </li>
                <li className=" my-4">
                   <div id="cc" className={`flex justify-between p-2 rounded-lg ${isactive===5 ? "text-blue-400" : "text-white"}`} onClick={()=>isopen(5)}>
                   <div className=" flex justify-center  space-x-2">
                        <Settings/> <p className=" cursor-pointer">Setting</p>
                    </div>
                    <div className="arrow">
                        {/* {isopentoggle && isactive===1 ? <KeyboardArrowDownIcon/> : <KeyboardArrowRightIcon/>} */}
                        
                        <i className={ `fa-solid fa-chevron-up ${isopentoggle&&isactive===5 ? " rotate-180 duration-300":"rotate-90 duration-500"}`}></i>
                    </div>
                   </div>
                    <div className={`submenu-wrapper ${isactive===5 && isopentoggle===true ? "colaps":"colapsd"}`}>
                        <ul className="submenu text-start pl-8 border-l-2 mt-2">
                        <li className="my-2"><Link to="/admin-dashboard-change_password">Change Password</Link></li>
                        </ul>
                    </div>
                    <div className={`submenu-wrapper ${isactive===5 && isopentoggle===true ? "colaps":"colapsd"}`}>
                        <ul className="submenu text-start pl-8 border-l-2 mt-2">
                        <li className="my-2"><Link to="/admin-dashboard-update-profile">Update Profile</Link></li>
                        </ul>
                    </div>
                    <div className={`submenu-wrapper ${isactive===5 && isopentoggle===true ? "colaps":"colapsd"}`}>
                        <ul className="submenu text-start pl-8 border-l-2 mt-2">
                        <li className="my-2"><Link to="/admin-dashboard-send-email">Send Email</Link></li>
                        </ul>
                    </div>
                </li>
                <li id="cc" className={`flex justify-between p-2 rounded-lg my-4 ${isactive===6 ? "activ" : ""}`} onClick={()=>isopen(6)}>
                  <div className=" flex justify-center space-x-2" onClick={logout}>
                        <LogoutOutlined/> <p className=" cursor-pointer">{loading ? (
                            <>
                            Logout
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
                        ):"Logout"}</p>
                    </div>
                </li>

            </ul>
            </div>
        </div>
    </div>
  )
}

export default Admin_Side_Bar