// import { AttachMoney } from '@mui/icons-material';
import { useState } from 'react';
import Dash_Nav from './Dash_Nav';
import { useDispatch, useSelector } from 'react-redux';
import { Change_Passwordd } from '../../redux/action/userAction';
import Admin_Side_Bar from '../../admin_dashboard/Admin_sidebar';

const Change_Password = () => {
    const [side, setSide] = useState(false); // Sidebar state
    const {user,updateloading,actionloading} = useSelector((state)=>state.User);
    const dispatch = useDispatch();
    const [change, setChange] = useState({
        oldPassword: '',
        newPassword: '',
        confirm_Password: ''
    });
    const handlechange = (e)=>{
        e.preventDefault();
        dispatch(Change_Passwordd(change))
    }

  return (
   <div>
    <div>
        <Dash_Nav side={side} setSide={setSide} user={user}/>
    </div>
     <div className="dashboard-wrapper">
            <Admin_Side_Bar side={side} setSide={setSide} user={user} loading={actionloading}/>
      <div className="dashboard-side min-h-screen ">
        
      
       <div className="mt-2 text-center" data-aos="fade-right"  data-aos-easing="linear" data-aos-duration="1800">
       <h2 className="text-2xl font-extrabold bg-black inline-block px-16 rounded-full text-white py-4">Change Password</h2>
       </div>

       <div className="formm mt-20 mx-2">
    <form className="space-y-4 font-[sans-serif] max-w-md mx-auto" onSubmit={handlechange}>
  <input type="password" value={change.oldPassword} onChange={(e)=>setChange({...change,oldPassword:e.target.value})} placeholder="Enter Old Password" className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded" />
  <input type="password"value={change.newPassword} onChange={(e)=>setChange({...change,newPassword:e.target.value})} placeholder="Enter New Password" className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-transparent focus:border-blue-500 rounded" />
  <input type="password"value={change.confirm_Password} onChange={(e)=>setChange({...change,confirm_Password:e.target.value})} placeholder="Enter Confirm Password" className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-transparent focus:border-blue-500 rounded" />
  <div className="flex">
    <input type="checkbox" className="w-4" required/>
    <label className="text-sm ml-4 ">Remember me</label>
  </div>
  <button type="submit" className="!mt-8 w-full px-4 py-2.5 mx-auto block text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
  {updateloading ? (
                      <>
                      Change
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
                    "Change"
                  )}
  </button>
</form>

       </div>

        </div>
    </div>
   </div>
   
  )
}

export default Change_Password