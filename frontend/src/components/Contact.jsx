import { Edit, House, LocalPhone, MailOutline, Person, PinDrop } from "@mui/icons-material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Create_Contact } from "../redux/action/contactAction";

const Contact = () => {
    const {concreateloading} = useSelector((state)=>state.Contact);
    const [contact, setContact] = useState({
        name:"",
        email:"",
        phone:Number,
        address:"",
        message:""
    });
    const dispatch = useDispatch();
    const handlesumbit = (e)=>{
        e.preventDefault();
        dispatch(Create_Contact(contact))
    }
  return (
    <div className=" min-h-screen">
        <div className="header relative mt-16 h-[300px] bg-[url(https://tunatheme.com/tf/html/quarter-preview/quarter/img/bg/14.jpg)] bg-cover bg-no-repeat bg-center">
                  <div className=" max-[450px]:w-[250px] min-w-[200px] text-center absolute top-[50%] -translate-y-[50%] left-[50%] z-40 -translate-x-[50%]">
                    <h2 className=" text-4xl mb-6 font-[800] text-black font-sans">Contact</h2>
                    <div className=" flex justify-start items-center gap-2">
                      <span><House sx={{color:"#8FA282",fontSize:"30px"}}/></span>
                      <span className=" text-black font-[600] font-sans text-lg">Home {">"} </span>
                      <span className=" font-[600] text-black font-sans text-lg">Contact Us</span>
                    </div>
                  </div>
                </div>

                <div className="details max-w-6xl mx-auto sm:p-4 p-2 my-28">
                    <div className="cards grid lg:grid-cols-3 sm:grid-cols-2 gap-6 grid-cols-1">
                        <div className="card p-6 w-full border max-[640px]:w-[350px] mx-auto max-[400px]:w-full">
                            <div className=" text-center my-6"><MailOutline sx={{fontSize:"80px",color:"#8FA282"}}/></div>
                            <div className=" text-center">
                                <h2 className="text-2xl font-[700]">Email Address</h2>
                                <p className=" text-gray-500 text-lg font-[350] font-sans mt-4">Keneparesort@gmail.com</p>
                            </div>
                        </div>
                        <div className="card p-6 w-full border max-[640px]:w-[350px] mx-auto max-[400px]:w-full">
                            <div className=" text-center my-6"><LocalPhone sx={{fontSize:"80px",color:"#8FA282"}}/></div>
                            <div className=" text-center">
                                <h2 className="text-2xl font-[700]">Ph Number</h2>
                                <p className=" text-gray-500 text-lg font-[350] font-sans mt-4">+31655518120</p>
                            </div>
                        </div>
                        <div className="card p-6 w-full border max-[640px]:w-[350px] mx-auto max-[400px]:w-full">
                            <div className=" text-center my-6"><PinDrop sx={{fontSize:"80px",color:"#8FA282"}}/></div>
                            <div className=" text-center">
                                <h2 className="text-2xl font-[700]">Address</h2>
                                <p className=" text-gray-500 text-lg font-[350] font-sans mt-4">Kenepaweg 15, Curaçao. </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contact-form-wrapper max-w-6xl p-2 mx-auto my-20">
                    <form className="formm border p-2 md:p-6 w-full shadow-md" onSubmit={handlesumbit}>
                        <div className="wrapper">
                            <h2 className=" text-3xl font-sans font-[600] mb-8">Get A Quote</h2>
                            <div className=" style flex max-md:flex-col gap-8 w-full">
                                <div className="input w-full relative">
                                    <input type="text" placeholder="Enter Your Name" value={contact.name} onChange={(e)=>setContact({...contact,name:e.target.value})} className=" border-2 border-gray-100 pl-4 outline-none h-14 w-full" />
                                    <span className=" absolute top-[50%] -translate-y-[50%] right-2"><Person sx={{color:"#8FA282"}}/></span>
                                </div>
                                <div className="input w-full relative">
                                    <input type="text" placeholder="Enter Email Address" value={contact.email} onChange={(e)=>setContact({...contact,email:e.target.value})} className=" border-2 border-gray-100 pl-4 outline-none h-14 w-full" />
                                    <span className=" absolute top-[50%] -translate-y-[50%] right-2"><MailOutline sx={{color:"#8FA282"}}/></span>
                                </div>
                            </div>
                            <div className=" style mt-8 flex max-md:flex-col gap-8">
                                <div className="input w-full">
                                <input type="text" placeholder="Enter Address" value={contact.address} onChange={(e)=>setContact({...contact,address:e.target.value})} className=" border-2 border-gray-100 pl-4 outline-none h-14 w-full" />
                                <span className=" absolute top-[50%] -translate-y-[50%] right-2"><MailOutline sx={{color:"#8FA282"}}/></span>
                                </div>
                                <div className="input w-full relative">
                                    <input type="text" placeholder="Enter Phone Number" value={contact.phone} onChange={(e)=>setContact({...contact,phone:parseInt(e.target.value)||""})} className=" w-full border-2 border-gray-100 outline-none h-14 pl-4" />
                                    <span className=" absolute top-[50%] -translate-y-[50%] right-2"><LocalPhone sx={{color:"#8FA282"}}/></span>
                                </div>
                            </div>
                            <div className=" relative w-full mt-8">
                                <textarea name="" id="" className=" w-full h-32 border-2 p-4 border-gray-100 outline-none" placeholder="Enter Message " value={contact.message} onChange={(e)=>setContact({...contact,message:e.target.value})}></textarea>
                                <span className=" absolute top-2 right-2"><Edit sx={{color:"#8FA282"}}/></span>
                            </div>
                            <div className=" mt-8 space-x-2 flex items-center">
                                <input type="checkbox" name="" id="" required/>
                                <label htmlFor="" className=" text-gray-500 font-[350] font-sans">Save my name, email, and website in this browser for the next time I comment.</label>
                            </div>
                            <button type="submit" className=" px-6 py-2 z-50 before:duration-300 overflow-hidden after:duration-300 transition-all after:-z-10 before:-z-10 hover:before:right-[-100%] hover:after:left-0  text-white relative before:bg-[#8FA282] before:absolute before:top-0 before:bottom-0 before:right-0 after:absolute after:top-0 after:bottom-0 after:left-[-100%] after:w-full after:h-full after:bg-[#E8C696] before:w-full before:h-full mt-6">
                            {concreateloading ? (
    <>
      Contact Now
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
    "Contact Now"
  )}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="map mt-10 w-full">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d77953.51621413286!2d5.25021345!3d52.36956085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c616e3d4cb2cf5%3A0x23dba3457b40cff8!2sAlmere%2C%20Netherlands!5e0!3m2!1sen!2s!4v1762165568695!5m2!1sen!2s"  width="100%" height={600} style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />

                </div>
    </div>
  )
}

export default Contact