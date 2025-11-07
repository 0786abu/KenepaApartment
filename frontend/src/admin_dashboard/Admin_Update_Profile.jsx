"use client";
import { useEffect, useState } from "react";
import Admin_Side_Bar from "./Admin_sidebar";
import { useDispatch, useSelector } from "react-redux";
import Dash_Nav from "../components/Dashboard/Dash_Nav";
import { Loader } from "lucide-react";
import { Admin_Update_Profile } from "../redux/action/userAction";

export default function AdminProfileUpdate() {
    const {user,actionloading,updateloading} = useSelector((state)=>state.User);
    const [side, setSide] = useState(false); // Sidebar state
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+92 300 1234567",
    address: "123 Main Street, Karachi",
  });
  const dispatch = useDispatch();

  const [profile, setProfile] = useState("");
  const [preview, setPreview] = useState("");
console.log(profile)
  const handleChange = (e) => {
    const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };
  const handleImageChange = (e)=>{
    const file = e.target.files[0];
    setProfile(file);
    setPreview(URL.createObjectURL(file));
  }

  useEffect(()=>{
    setFormData({
        name:user?.name,
        email:user?.email,
        phone:user?.phone,
        address:user?.address,
    });
    setProfile(user?.profile);
  },[user])

  const handleSubmit = async (e) => {
  e.preventDefault();
  const formDataa = new FormData();
  formDataa.append("name", formData.name)
  formDataa.append("email", formData.email)
  formDataa.append("phone", formData.phone)
  formDataa.append("address", formData.address)
  if(profile && profile instanceof File){
    formDataa.append("profile", profile)
  }else if(typeof profile === "string"){
    formDataa.append("profile", profile)
  }

  dispatch(Admin_Update_Profile(formDataa));
};


  return (
    <div>
         <div>
                <Dash_Nav side={side} setSide={setSide} user={user}/>
            </div>
             <div className="dashboard-wrapper">
                    <Admin_Side_Bar side={side} setSide={setSide} user={user} loading={actionloading}/>
              <div className="dashboard-side min-h-screen ">        
              <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Admin Profile Update
        </h1>

        {/* Profile Image Preview */}
        <div className="flex flex-col items-center mb-6">
            <img
              src={preview ? preview : `${import.meta.env.VITE_BASE_URL}${profile}`}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full object-cover mb-3"
            />

          <label
            htmlFor="profile"
            className="cursor-pointer text-sm font-medium text-[#98B783] hover:underline"
          >
            Change Profile
          </label>
          <input
            type="file"
            id="profile"
            name="profile"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#98B783] outline-none"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#98B783] outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#98B783] outline-none"
              placeholder="Enter your phone"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#98B783] outline-none"
              placeholder="Enter your address"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-900 transition-all duration-200"
          >
            {updateloading ? (<span className="flex items-center justify-center text-center"><Loader className="animate-spin w-4 h-4 mr-1"/> Update Profile</span>):"Update Profile"}
          </button>
        </form>
      </div>
    </div>
                </div>
            </div>
    </div>
  );
}
