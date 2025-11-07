import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const Mini_Nav = () => {
  return (
    <div>
        <nav className="navbar flex justify-between pt-2 md:pt-4 border-b pb-4 border-white items-center md:px-10 px-6 lg:px-20">
            <ul className=' md:flex items-center'>
               <li className=' flex items-center gap-2'>
               <span>
                <MailOutlineIcon sx={{color:"#E8C696"}}/>
                </span>
                <span className=' text-white font-[500] md:font-[600]'> info@webmail.com</span>
               </li>
               <li className=' flex items-center gap-2'>
               <span>
               <LocationOnIcon sx={{color:"#E8C696"}}/>
                </span>
                <span className=' text-white font-[500] md:font-[600]'> 15/A, Nest Tower, NYC</span>
               </li>
            </ul>
            <ul>
                <li className=' grid gap-1 md:gap-2 md:grid-cols-4 grid-cols-2'>
                    <span><FacebookIcon sx={{color:"white"}}/></span>
                    <span><InstagramIcon sx={{color:"white"}}/></span>
                    <span><YouTubeIcon sx={{color:"white"}}/></span>
                    <span><XIcon sx={{color:"white"}}/></span>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Mini_Nav