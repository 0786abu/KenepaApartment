// import { AttachMoney } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Admin_Side_Bar from './Admin_sidebar';
import Dash_Nav from "../components/Dashboard/Dash_Nav"
import { Button } from '@mui/material';
import { Fetch_Retal_Car, UpdateCar } from '../redux/action/carAction';
import { useNavigate, useParams } from 'react-router-dom';

const cities = ['New York City','Beverly Hills Blvd','Ave, Manhattan', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis', 'Seattle', 'Denver', 'Washington D.C.', 'Boston', 'El Paso', 'Nashville', 'Detroit', 'Oklahoma City', 'Portland', 'Las Vegas', 'Memphis', 'Louisville', 'Baltimore', 'Milwaukee', 'Albuquerque', 'Tucson', 'Fresno', 'Sacramento', 'Kansas City', 'Mesa', 'Atlanta', 'Long Beach', 'Colorado Springs', 'Raleigh', 'Miami', 'Virginia Beach', 'Omaha', 'Oakland', 'Minneapolis', 'Tulsa', 'Arlington', 'New Orleans', 'Wichita', 'Cleveland', 'Bakersfield', 'Tampa', 'Honolulu', 'Anaheim', 'Santa Ana', 'Corpus Christi', 'Riverside', 'Lexington', 'St. Louis', 'Stockton', 'Pittsburgh', 'Saint Paul', 'Cincinnati', 'Anchorage', 'Henderson', 'Greensboro', 'Plano', 'Newark', 'Lincoln', 'Toledo', 'Orlando', 'Chula Vista', 'Buffalo', 'Jersey City', 'Fort Wayne', 'Chandler', 'Madison', 'Lubbock', 'Scottsdale', 'Reno', 'Glendale', 'Norfolk', 'Birmingham', 'San Bernardino', 'Spokane', 'Rochester', 'Des Moines', 'Modesto', 'Fayetteville', 'Shreveport', 'Akron', 'Tacoma', 'Aurora', 'Montgomery', 'Little Rock', 'Columbia', 'Huntsville', 'Grand Rapids', 'Salt Lake City', 'Baton Rouge', 'St. Petersburg', 'Laredo', 'Hillsboro', 'Tallahassee', 'Visalia', 'Wilmington', 'West Valley City', 'Pearland', 'Murrieta', 'Round Rock', 'Blacksburg', 'Port St. Lucie', 'Killeen']

const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']

const carTypes = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Coupe",
  "Convertible",
  "Pickup Truck",
  "Crossover",
  "Station Wagon",
  "Minivan",
  "Sports Car",
  "Electric",
  "Hybrid",
  "Luxury",
  "Off-Road",
  "Compact",
  "Microcar",
  "Roadster",
  "Muscle Car",
  "Diesel",
  "Van"
];
const carModels = [
  "2000", "2001", "2002", "2003", "2004", "2005",
  "2006", "2007", "2008", "2009", "2010",
  "2011", "2012", "2013", "2014", "2015",
  "2016", "2017", "2018", "2019", "2020",
  "2021", "2022", "2023", "2024", "2025"]




const Admin_Update_Car = () => {
    const {id} = useParams();
    const [side, setSide] = useState(false); // Sidebar state
    const {user,actionloading} = useSelector((state)=>state.User);
    const {createcarloading,car} = useSelector((state)=>state.Car);
    const dispatch = useDispatch();
    const [propertyData, setPropertyData] = useState({
        carName:"",
        description:"",
        location:{
        address:"",
        country:"",
        state:"",
        zipcode:"",
        },
        carRentDuration:"",
        price:"",
        google_map_link:"",
        carType:"",
        carModel:""
    })
      const navigate = useNavigate();
   const onlickhandle = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  // Normal text fields append karo
  formData.append("carName", propertyData.carName);
  formData.append("description", propertyData.description);
  formData.append("carRentDuration", propertyData.carRentDuration);
  formData.append("price", propertyData.price);
  formData.append("google_map_link", propertyData.google_map_link);
  formData.append("carType", propertyData.carType);
  formData.append("carModel", propertyData.carModel);

  // Nested location object ke liye stringify karo
    formData.append("location[address]", propertyData.location.address);
formData.append("location[state]", propertyData.location.state);
formData.append("location[country]", propertyData.location.country);
formData.append("location[zipcode]", propertyData.location.zipcode);

  
  // Dispatch redux action me FormData bhejo
  dispatch(UpdateCar(formData,id,navigate));
};

useEffect(()=>{
    dispatch(Fetch_Retal_Car(id))
},[dispatch,id])

useEffect(()=>{
    if(car){
        setPropertyData({
        carName:car.carName,
        description:car.description,
        location:{
            address:car.location.address,
            country:car.location.country,
            state:car.location.state,
            zipcode:car.location.zipcode,
        },
        carRentDuration:car.carRentDuration,        
        price:car.price,        
        google_map_link:car.google_map_link,        
        carType:car.carType,        
        carModel:car.carModel,        
    })
    }
},[car])
  return (
   <div>
    <div>
        <Dash_Nav side={side} setSide={setSide} user={user}/>
    </div>
     <div className="dashboard-wrapper">
            <Admin_Side_Bar side={side} setSide={setSide} user={user} loading={actionloading}/>
      <div className="dashboard-side min-h-screen "> 
      <h2 className="text-center my-10 font-[800] text-3xl font-sans">Add Property</h2>
      <div className="form-wrapper">
        <div className='mt-10 mx-2 md:mx-4'>
            <form onSubmit={onlickhandle} action="" className='max-w-5xl mb-20 mx-auto'>
     <div className=' grid grid-cols-1 sm:grid-cols-2 gap-4'>
     <div>
        <input
          type="text"
          name="carName"
          value={propertyData.carName}
          onChange={(e)=>setPropertyData({...propertyData, carName:e.target.value})}
          placeholder="Enter Car_Name..."
          className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
          required
        />
      </div>
            <div>
        <input
          type="text"
          name="description"
          value={propertyData.description}
          onChange={(e)=>setPropertyData({...propertyData, description:e.target.value})}
          placeholder="Enter Car Description max 100 words"
          className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
          required
        />
      </div>
      <div>
        <select
         name="address"
        id=""
        value={propertyData.location.address}
        onChange={(e) =>
            setPropertyData((prev) => ({
              ...prev,
              location: { ...prev.location, address: e.target.value },
            }))
          }
        className="w-full bg-gray-100 h-12 border outline-none rounded-sm border-gray-50">
            <option value="">Select City</option>
            {cities.map((city,index)=>{
                return <option key={index} value={city}>{city}</option>
            })}
        </select>
      </div>
      <div>
        <select
        value={propertyData.location.state}
        onChange={(e) =>
            setPropertyData((prev) => ({
              ...prev,
              location: { ...prev.location, state: e.target.value },
            }))
          }
        name="state" id="" className="w-full bg-gray-100 h-12 border outline-none rounded-sm border-gray-50">
            <option value="">Select State</option>
            {states.map((state,index)=>{
                return <option key={index} value={state}>{state}</option>
            })}
        </select>
      </div>
      <div>
        <select
        value={propertyData.location.country}
        onChange={(e) =>
            setPropertyData((prev) => ({
              ...prev,
              location: { ...prev.location, country: e.target.value },
            }))
          }
        name="country" id="" className="w-full bg-gray-100 h-12 border outline-none rounded-sm border-gray-50">
            <option value="">Select Country</option>
            <option value="america">America</option>
        </select>
      </div>
      <input
  type="number"
  name="zipcode"
  value={propertyData.location.zipcode}
  onChange={(e) =>
    setPropertyData((prev) => ({
      ...prev,
      location: { ...prev.location, zipcode: e.target.value ? parseInt(e.target.value, 10) : ""},
    }))
  }
  placeholder="Enter zipcode"
  className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
  required
/>

      <div>
       <input
  type="text"
  name="carRentDuration"
  value={propertyData.carRentDuration}
  onChange={(e) => setPropertyData({...propertyData, carRentDuration:e.target.value})  }
  placeholder="Enter Car Rent Duration Limit"
  className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
  required
/>
        
      </div>
      <div>
        <select
        value={propertyData.carType}
        onChange={(e)=>setPropertyData({...propertyData, carType:e.target.value})}
        name="state" id="" className="w-full bg-gray-100 h-12 border outline-none rounded-sm border-gray-50">
            <option value="">Car Type</option>
            {carTypes?.map((type,index)=>{
                return <option key={index} value={type}>{type}</option>
            })}
            
        </select>
      </div>
      <div>
        <select
        value={propertyData.carModel}
        onChange={(e)=>setPropertyData({...propertyData, carModel:e.target.value})}
        name="state" id="" className="w-full bg-gray-100 h-12 border outline-none rounded-sm border-gray-50">
            <option value="">Car Model</option>
            {carModels?.map((model,index)=>{
                return <option key={index} value={model}>{model}</option>
            })}
            
        </select>
      </div>
      <div>
        <input
          type="number"
          name="price"
          value={propertyData.price}
          onChange={(e)=>setPropertyData({...propertyData, price:e.target.value ? parseInt(e.target.value, 10) : ""})}
          placeholder="Enter property price"
          className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="google_map_link"
          value={propertyData.google_map_link}
          onChange={(e)=>setPropertyData({...propertyData, google_map_link:e.target.value})}
          placeholder="Enter property google map link"
          className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
          required
        />
      </div>
     </div>
      <div className="mt-4">
        <Button type='submit' disabled={createcarloading} variant='contained' sx={{background:"#1e2939",width:"100%"}}>
            
  {createcarloading ? (
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
   </div>
   
  )
}

export default Admin_Update_Car