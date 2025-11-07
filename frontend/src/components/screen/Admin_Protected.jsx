import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

const Admin_Protected = () => {
  const {user} = useSelector((state)=>state.User);
  
  return user?.role==="admin" ? <Outlet/> : <Navigate to="/login"/>
}

export default Admin_Protected