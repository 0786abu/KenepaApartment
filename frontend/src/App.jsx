import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Footer from "./components/Footer"
import Property_detail from "./components/Property_detail"
import Services from "./components/Services"
import Contact from "./components/Contact"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/screen/Login"
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Change_Password from "./components/Dashboard/Change_Password"
import Scroll from "./components/Scroll"
import Update_Property from "./components/Dashboard/Update_Property"
import Admin_Dashboard from "./admin_dashboard/Admin_dashboard"
import Admin_All_Properties from "./admin_dashboard/Admin_All_Properties"
import Admin_Add_Property from "./admin_dashboard/Admin_Add_Properties"
import All_Contacts from "./admin_dashboard/All_Contacts"
import All_Reviews from "./admin_dashboard/All_Reviews"
import CreateReview from "./components/CreateReview"
import All_FeaturedCities from "./admin_dashboard/All_Featured_Cities"
import Add_Featured_Cities from "./admin_dashboard/Add_Featured_Cities"
import Add_Service from "./admin_dashboard/Add_Service"
import All_Services from "./admin_dashboard/All_Services"
import AdminProfileUpdate from "./admin_dashboard/Admin_Update_Profile"
import SendEmailPage from "./admin_dashboard/Admin_Send_Email"
import Admin_Protected from "./components/screen/Admin_Protected"
import Admin_Add_Car from "./admin_dashboard/Admin_Add_Car"
import Admin_All_Cars from "./admin_dashboard/Admin_All_Cars"
import Admin_Update_Car from "./admin_dashboard/ADmin_UPdate_Car"
import CarDetail from "./components/CarDetail"
const App = () => {
  const location = useLocation();
    
  const hideNavbarRoutes = ["/dashboard","/change_password","/create_Property","/agent-contacts","/dealers","/my-properties","/sellers","/agents_contact","/admin-dashboard","/admin-dashboard-allproperties","/admin-dashboard-myproperties","/admin-dashboard-addproperty","/admin-dashboard-allcontacts","/admin-dashboard-allreviews","/admin-dashboard-featuredcities","/admin-dashboard-addfeaturedcity","/admin-dashboard-addservice","/admin-dashboard-allservices","/admin-dashboard-update-profile","/admin-dashboard-send-email","/admin-dashboard-change_password","/admin-dashboard-add_car","/admin-dashboard-allcars"];
  const dynamicRoutePatterns = [
    /^\/buyer-detail\/.+$/,
    /^\/update-property\/.+$/,
    /^\/admin-dashboard-buyerdetail\/.+$/,
    /^\/admin\/dashboard\/update_side\/.+$/,
    /^\/admin\/dashboard\/update_desert\/.+$/,
    /^\/admin\/dashboard\/update_order\/.+$/,
    /^\/admin\/dashboard\/singleuser\/.+$/,
    /^\/admin-dashboard-updateproperty\/.+$/,
    /^\/admin-dashboard-updatecar\/.+$/,
  ];
  const shouldShowNavbar = !(
    hideNavbarRoutes.includes(location.pathname) ||
    dynamicRoutePatterns.some((pattern) => pattern.test(location.pathname))
  );
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Adjust duration and other options if needed
  }, []);

  // useEffect(()=>{
  //   document.addEventListener("contextmenu",handleContextMenu);
  //   return () => document.removeEventListener("contextmenu", handleContextMenu);
  // })
  
  // const handleContextMenu = (e) => {
  //   e.preventDefault();
  //   alert("Right click disabled");
  // };
  
  return (
    <div>
      <Scroll/>
      {shouldShowNavbar && <Navbar/>}
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/detail/:id" element={<Property_detail/>}></Route>
        <Route path="/car/:id" element={<CarDetail/>}></Route>
        <Route path="/services" element={<Services/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/create-review" element={<CreateReview/>}></Route>

        {/* Dashboard */}
        

        {/* admin dashboard */}
        <Route element={<Admin_Protected/>}>
          <Route path="/admin-dashboard" element={<Admin_Dashboard/>}></Route>
        <Route path="/admin-dashboard-allproperties" element={<Admin_All_Properties/>}></Route>
        <Route path="/admin-dashboard-addproperty" element={<Admin_Add_Property/>}></Route>
        <Route path="/admin-dashboard-allcontacts" element={<All_Contacts/>}></Route>
        <Route path="/admin-dashboard-allreviews" element={<All_Reviews/>}></Route>
        <Route path="/admin-dashboard-featuredcities" element={<All_FeaturedCities/>}></Route>
        <Route path="/admin-dashboard-addfeaturedcity" element={<Add_Featured_Cities/>}></Route>
        <Route path="/admin-dashboard-allservices" element={<All_Services/>}></Route>
        <Route path="/admin-dashboard-addservice" element={<Add_Service/>}></Route>
        <Route path="/admin-dashboard-update-profile" element={<AdminProfileUpdate/>}></Route>
        <Route path="/admin-dashboard-change_password" element={<Change_Password/>}></Route>
        <Route path="/admin-dashboard-send-email" element={<SendEmailPage/>}></Route>
        <Route path="/admin-dashboard-add_car" element={<Admin_Add_Car/>}></Route>
        <Route path="/admin-dashboard-allcars" element={<Admin_All_Cars/>}></Route>
        <Route path="/admin-dashboard-updateproperty/:id" element={<Update_Property/>}></Route>
        <Route path="/admin-dashboard-updatecar/:id" element={<Admin_Update_Car/>}></Route>
        </Route>
      </Routes>
      {shouldShowNavbar && <Footer/>}
      <ToastContainer autoClose={1500} />
    </div>
  )
}

export default App