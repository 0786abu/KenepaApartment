// import { AttachMoney } from '@mui/icons-material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Admin_Side_Bar from './Admin_sidebar';
import Dash_Nav from "../components/Dashboard/Dash_Nav"
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Create_FeaturedCity } from '../redux/action/CityAction';
// import { setCreateCityloading } from '../redux/slice/Featured_CitySlice';
const cities = ['New York City','Beverly Hills Blvd','Ave, Manhattan', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis', 'Seattle', 'Denver', 'Washington D.C.', 'Boston', 'El Paso', 'Nashville', 'Detroit', 'Oklahoma City', 'Portland', 'Las Vegas', 'Memphis', 'Louisville', 'Baltimore', 'Milwaukee', 'Albuquerque', 'Tucson', 'Fresno', 'Sacramento', 'Kansas City', 'Mesa', 'Atlanta', 'Long Beach', 'Colorado Springs', 'Raleigh', 'Miami', 'Virginia Beach', 'Omaha', 'Oakland', 'Minneapolis', 'Tulsa', 'Arlington', 'New Orleans', 'Wichita', 'Cleveland', 'Bakersfield', 'Tampa', 'Honolulu', 'Anaheim', 'Santa Ana', 'Corpus Christi', 'Riverside', 'Lexington', 'St. Louis', 'Stockton', 'Pittsburgh', 'Saint Paul', 'Cincinnati', 'Anchorage', 'Henderson', 'Greensboro', 'Plano', 'Newark', 'Lincoln', 'Toledo', 'Orlando', 'Chula Vista', 'Buffalo', 'Jersey City', 'Fort Wayne', 'Chandler', 'Madison', 'Lubbock', 'Scottsdale', 'Reno', 'Glendale', 'Norfolk', 'Birmingham', 'San Bernardino', 'Spokane', 'Rochester', 'Des Moines', 'Modesto', 'Fayetteville', 'Shreveport', 'Akron', 'Tacoma', 'Aurora', 'Montgomery', 'Little Rock', 'Columbia', 'Huntsville', 'Grand Rapids', 'Salt Lake City', 'Baton Rouge', 'St. Petersburg', 'Laredo', 'Hillsboro', 'Tallahassee', 'Visalia', 'Wilmington', 'West Valley City', 'Pearland', 'Murrieta', 'Round Rock', 'Blacksburg', 'Port St. Lucie', 'Killeen']


const Add_Featured_Cities = () => {
    const [side, setSide] = useState(false); // Sidebar state
    const {user,actionloading} = useSelector((state)=>state.User);
    const {citycreateloading} = useSelector((state)=>state.FeaturedCity);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [city, setCity] = useState({
        cityname:"",
        total_properties:Number
    });
    const [image, setImage] = useState("");
    const [previmage, setPrevimage] = useState("");
    const handlechange = (e)=>{
        const file = e.target.files[0];
        setImage(file);
        setPrevimage(URL.createObjectURL(file));
    }

      
        const handlesubmit = async(e)=>{
            e.preventDefault();
            const formData = new FormData();
            formData.append("cityname",city.cityname);
            formData.append("total_properties",city.total_properties);
            formData.append("image",image);
            dispatch(Create_FeaturedCity(formData,navigate));
        }
  return (
   <div>
    <div>
        <Dash_Nav side={side} setSide={setSide} user={user}/>
    </div>
     <div className="dashboard-wrapper">
            <Admin_Side_Bar side={side} setSide={setSide} user={user} loading={actionloading}/>
      <div className="dashboard-side min-h-screen ">      
      <h2 className="text-center my-6 font-[800] text-3xl font-sans">All Users</h2>  
      <div className="wrapper mx-2">
        <form action="" className="formm max-w-4xl mx-auto space-y-4" onSubmit={handlesubmit}>
            {previmage && (
                <img src={previmage} className=' w-12 h-12 rounded-full object-cover m-auto my-4' alt=''/>
            )}
        <div>
        <select value={city.cityname} onChange={(e)=>setCity({...city, cityname:e.target.value})}className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all">
            <option value="">Select City</option>
            {cities.map((city,index)=>(
                <option value={city} key={index}>{city}</option>
            ))}
    
        </select>
      </div>
        <div>
        <input
          type="number"
          name="total_properties"
          value={city.total_properties}
          onChange={(e)=>setCity({...city, total_properties:parseInt(e.target.value)||""})}
          placeholder="Enter number of properties which given in this city"
          className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
          
        />
      </div>
      <input type="file"
       onChange={handlechange}
        className="w-full text-gray-500 font-medium text-base bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded" />
           <div className="mt-4">
        <Button type='submit' variant='contained' sx={{background:"#1e2939",width:"100%"}}>
            
  {citycreateloading ? (
    <>
      Submit
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
    "Submit"
  )}
        </Button>
      </div>
        </form>
      </div>
        </div>
    </div>
   </div>
   
  )
}

export default Add_Featured_Cities