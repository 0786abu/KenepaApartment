"use client";
import { useEffect, useState } from "react";
import Admin_Side_Bar from "./Admin_sidebar";
import { useDispatch, useSelector } from "react-redux";
import Dash_Nav from "../components/Dashboard/Dash_Nav";
import { toast } from "react-toastify";
import { Admin_Send_Email, Fetch_All_Users } from "../redux/action/adminAction";
import { Loader } from "lucide-react";

export default function SendEmailPage() {
    const {user,actionloading} = useSelector((state)=>state.User)
    const {allusers,userloading,send_email_loading} = useSelector((state)=>state.Admin)
   const [side, setSide] = useState(false);
  const dispatch = useDispatch();

  const [selectedUser, setSelectedUser] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedUser || !message.trim()) {
      toast.warn("Please select a user and write a message.");
      return;
    }
    dispatch(Admin_Send_Email({to:selectedUser,message}))
  };

  useEffect(()=>{
    dispatch(Fetch_All_Users());
  },[dispatch]);

  return (
    
    <div>
        <div>
        <Dash_Nav side={side} setSide={setSide} user={user}/>
    </div>
     <div className="dashboard-wrapper">
            <Admin_Side_Bar side={side} setSide={setSide} user={user} loading={actionloading}/>
      <div className="dashboard-side min-h-screen "> 
        <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Send Email to User
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Select */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Select User
            </label>
            {userloading ? (
                <div className="my-4 text-center">
                    <Loader className=" animate-spin w-5 h-5" />
                </div>
            ) : (
                <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#98B783] outline-none"
            >
              <option value="">-- Choose a User --</option>
              {allusers?.filter(u=>u.role !== "admin")?.map((user) => (
                <option key={user._id} value={user.email}>
                  {user.name} ({user.email}) {`-- ${user.role} --`}
                </option>
              ))}
            </select>
            )}
          </div>

          {/* Message Textarea */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="Write your email message here..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#E8C696] outline-none resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={send_email_loading}
            className={`w-full py-2.5 rounded-lg font-medium text-white transition-all duration-200 ${
              send_email_loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#98B783] hover:bg-[#88A774]"
            }`}
          >
            {send_email_loading ? "Sending..." : "Send Email"}
          </button>
        </form>
      </div>
    </div>
      
        </div>
    </div>
    </div>
  );
}
