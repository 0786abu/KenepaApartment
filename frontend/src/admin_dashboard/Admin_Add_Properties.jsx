// import { AttachMoney } from '@mui/icons-material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Admin_Side_Bar from './Admin_sidebar';
import Dash_Nav from "../components/Dashboard/Dash_Nav"
import { Create_Propertyy } from '../redux/action/propertyAction';
import { toast } from 'react-toastify';
// import { setCreateLoading } from '../redux/slice/propertySlice';
import ReactQuill from 'react-quill';
import { Button } from '@mui/material';

const cities = ['New York City','Beverly Hills Blvd','Ave, Manhattan', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis', 'Seattle', 'Denver', 'Washington D.C.', 'Boston', 'El Paso', 'Nashville', 'Detroit', 'Oklahoma City', 'Portland', 'Las Vegas', 'Memphis', 'Louisville', 'Baltimore', 'Milwaukee', 'Albuquerque', 'Tucson', 'Fresno', 'Sacramento', 'Kansas City', 'Mesa', 'Atlanta', 'Long Beach', 'Colorado Springs', 'Raleigh', 'Miami', 'Virginia Beach', 'Omaha', 'Oakland', 'Minneapolis', 'Tulsa', 'Arlington', 'New Orleans', 'Wichita', 'Cleveland', 'Bakersfield', 'Tampa', 'Honolulu', 'Anaheim', 'Santa Ana', 'Corpus Christi', 'Riverside', 'Lexington', 'St. Louis', 'Stockton', 'Pittsburgh', 'Saint Paul', 'Cincinnati', 'Anchorage', 'Henderson', 'Greensboro', 'Plano', 'Newark', 'Lincoln', 'Toledo', 'Orlando', 'Chula Vista', 'Buffalo', 'Jersey City', 'Fort Wayne', 'Chandler', 'Madison', 'Lubbock', 'Scottsdale', 'Reno', 'Glendale', 'Norfolk', 'Birmingham', 'San Bernardino', 'Spokane', 'Rochester', 'Des Moines', 'Modesto', 'Fayetteville', 'Shreveport', 'Akron', 'Tacoma', 'Aurora', 'Montgomery', 'Little Rock', 'Columbia', 'Huntsville', 'Grand Rapids', 'Salt Lake City', 'Baton Rouge', 'St. Petersburg', 'Laredo', 'Hillsboro', 'Tallahassee', 'Visalia', 'Wilmington', 'West Valley City', 'Pearland', 'Murrieta', 'Round Rock', 'Blacksburg', 'Port St. Lucie', 'Killeen']

const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']

const property_types = [
    "Single House",
    "Family House",
    "Apartment",
    "Office Villa",
    "Luxury House",
    "Studio",
    "Condo",
    "Townhouse",
    "Duplex",
    "Penthouse",
    "Loft",
    "Farmhouse",
    "Cottage",
    "Bungalow",
    "Mansion",
    "Villa",
    "Mobile Home",
    "Row House",
    "Commercial Space",
    "Industrial Unit"
];
const propertyDurations = ["Long-Term","Short-Term"]


const Admin_Add_Property = () => {
    const [side, setSide] = useState(false); // Sidebar state
    const {user,actionloading} = useSelector((state)=>state.User);
    const {createloading} = useSelector((state)=>state.Property);
    const [newAmenity, setNewAmenity] = useState('' );
    const dispatch = useDispatch();
    const [property_detail, setProperty_detail] = useState('');
    const [propertyData, setPropertyData] = useState({
        title:"",
        description:"",
        location:{
            address:"",
        country:"",
        state:"",
        zipcode:"",
        },
        propertyDuration:"",
        property_type:"",
        rooms:Number,
        bathrooms:Number,
        size:Number,
        price:Number,
        amenities:[],
        google_map_link:"",
        category:"",
        years_of_build:Number
    })
    const [images, setImages] = useState([]);
      const handlechange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
      };
   const onlickhandle = async (e) => {
  e.preventDefault();
   console.log(images)

  const formData = new FormData();

  // Normal text fields append karo
  formData.append("title", propertyData.title);
  formData.append("description", propertyData.description);
  formData.append("property_type", propertyData.property_type);
  formData.append("price", propertyData.price);
  formData.append("size", propertyData.size);
  formData.append("rooms", propertyData.rooms);
  formData.append("bathrooms", propertyData.bathrooms);
  formData.append("category", propertyData.category);
  formData.append("propertyDuration", propertyData.propertyDuration);
  formData.append("years_of_build", propertyData.years_of_build);
  formData.append("google_map_link", propertyData.google_map_link);
  formData.append("property_detail", property_detail);
  formData.append("posteddate", new Date().toISOString());

  // Nested location object ke liye stringify karo
    formData.append("location[address]", propertyData.location.address);
formData.append("location[state]", propertyData.location.state);
formData.append("location[country]", propertyData.location.country);
formData.append("location[zipcode]", propertyData.location.zipcode);

  // Amenities array stringify karo
  formData.append("amenities", JSON.stringify(propertyData.amenities));

  // ✅ Multiple images append karo
  images.forEach((img) => {
    formData.append("images", img);
  });
  // Dispatch redux action me FormData bhejo
  dispatch(Create_Propertyy(formData));
};

    const addAmenity = () => {
        if(newAmenity===""){
            toast.error("Please enter an amenity");
        }
        if (newAmenity.trim() !== "") {
          setPropertyData((prev) => ({
            ...prev,
            amenities: [...prev.amenities, newAmenity.trim()],
          }));
          setNewAmenity(""); // Clear input after adding
        }
      };
    
      // Function to remove an amenity
      const removeAmenity = (index) => {
        setPropertyData((prev) => ({
          ...prev,
          amenities: prev.amenities.filter((_, i) => i !== index),
        }));
      };

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
          name="title"
          value={propertyData.title}
          onChange={(e)=>setPropertyData({...propertyData, title:e.target.value})}
          placeholder="Property Title"
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
          placeholder="Property Description max 100 words"
          className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
          required
        />
      </div>
      <div>
        <select
         name="address"
        id=""
        value={propertyData.address}
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
        value={propertyData.state}
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
        value={propertyData.country}
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
  value={propertyData.zipcode}
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
        <select
        value={propertyData.property_type}
        onChange={(e)=>setPropertyData({...propertyData, property_type:e.target.value})}
        name="state" id="" className="w-full bg-gray-100 h-12 border outline-none rounded-sm border-gray-50">
            <option value="">Property Type</option>
            {property_types.map((property,index)=>{
                return <option key={index} value={property}>{property}</option>
            })}
        </select>
        
      </div>
      <div>
        <select
        value={propertyData.category}
        onChange={(e)=>setPropertyData({...propertyData, category:e.target.value})}
        name="state" id="" className="w-full bg-gray-100 h-12 border outline-none rounded-sm border-gray-50">
            <option value="">Property category</option>
            <option value="rent">rent</option>
            
        </select>
      </div>
      <div>
        <input
          type="number"
          name="rooms"
          value={propertyData.rooms}
          onChange={(e)=>setPropertyData({...propertyData, rooms:e.target.value ? parseInt(e.target.value, 10) : ""})}
          placeholder="Enter no. of rooms"
          className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
          required
        />
      </div>
      <div>
        <input
          type="number"
          name="bathrooms"
          value={propertyData.bathrooms}
          onChange={(e)=>setPropertyData({...propertyData, bathrooms:e.target.value ? parseInt(e.target.value, 10) : ""})}
          placeholder="Enter no. of bathrooms"
          className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
          required
        />
      </div>
      <div>
        <input
          type="number"
          name="size"
          value={propertyData.size}
          onChange={(e)=>setPropertyData({...propertyData, size:e.target.value ? parseInt(e.target.value, 10) : ""})}
          placeholder="Enter property size in (1200sqft) enter only number"
          className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
          required
        />
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
      <div>
      <input type="file"
      onChange={handlechange}
      multiple
      name='images'
        className="w-full text-gray-500 font-medium text-base bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded" />
      </div>
      <div>
        <input
          type="text"
          name="posteddate"
          value={propertyData.posteddate}
          onChange={(e)=>setPropertyData({...propertyData, posteddate:e.target.value})}
          placeholder="posted Date like (8 Febuary, 2025)"
          className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
          required
        />
      </div>
      <div>
        <input
          type="number"
          name="years_of_build"
          value={propertyData.years_of_build}
          onChange={(e)=>setPropertyData({...propertyData, years_of_build:e.target.value ? parseInt(e.target.value, 10) : ""})}
          placeholder="Enter the property age years of build like(2010,2011,2012,etc.)"
          className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
          required
        />
      </div>
       <select
        value={propertyData.propertyDuration}
        onChange={(e)=>setPropertyData({...propertyData, propertyDuration:e.target.value})}
        name="state" id="" className="w-full bg-gray-100 h-12 border outline-none rounded-sm border-gray-50">
            <option value="">Property Duration</option>
            {propertyDurations.map((property,index)=>{
                return <option key={index} value={property}>{property}</option>
            })}
        </select>
     </div>
     <div className="mt-4 w-full sm:w-[60%] mx-auto my-4 border p-4">
              <label className="block font-semibold mb-2">Amenities</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  placeholder="Enter amenity (e.g. Swimming Pool)"
                  className="px-4 py-2 bg-gray-100 w-full text-sm outline-none rounded"
                />
                <button
                  type="button"
                  onClick={addAmenity}
                  className="px-4 py-2 bg-gray-800 text-white rounded"
                >
                  Add
                </button>
              </div>

              {/* Display Selected Amenities */}
              <div className="mt-2">
                {propertyData.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-200 p-2 rounded mt-2"
                  >
                    <span>{amenity}</span>
                    <button
                      type="button"
                      onClick={() => removeAmenity(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
      <div className=' mt-4'>
      <ReactQuill theme="snow" value={property_detail} onChange={setProperty_detail} />
      </div>
      <div className="mt-4">
        <Button type='submit' variant='contained' sx={{background:"#1e2939",width:"100%"}}>
            
  {createloading ? (
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

export default Admin_Add_Property