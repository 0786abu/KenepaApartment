/* eslint-disable react/prop-types */
import { LocationCity, MenuOpen } from "@mui/icons-material"
import { Link } from "react-router-dom"


const Dash_Nav = ({side,setSide,user}) => {
  return (
    <div className=" h-[70px] border fixed top-0 left-0 right-0 z-[100] bg-black flex justify-between items-center lg:px-20 md:px-10 px-4">
        <div className="logo flex items-center gap-2 md:gap-4">
        <div className='my-2 bg-gray-800 p-2 min-[950px]:hidden text-white inline-block rounded-md'>
            <MenuOpen className={`${!side ? "rotate-0 duration-300 transition-all ease-in-out":"rotate-180 duration-300 transition-all ease-in-out"}`} onClick={() => setSide(!side)}/>
        </div>
        <Link to="/">
           <span><LocationCity sx={{fontSize:"40px",color:"white"}}/></span>
           </Link>
        </div>
        <div className=" flex items-center gap-4">
            <span className=" text-white font-sans font-[400] text-lg">Hi! {user?.name}</span>
            <img src={ user?.profile==="Profile" || user?.profile===""? "https://avatars.mds.yandex.net/i?id=e1e984c8dfbafa0fbc6fc1b4a191a9d903249a02-7762396-images-thumbs&n=13": `${import.meta.env.VITE_BASE_URL}${user?.profile}` } className=" w-10 h-10 rounded-full object-cover" alt="" />
        </div>
    </div>
  )
}

export default Dash_Nav