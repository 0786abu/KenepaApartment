// import { AttachMoney } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import Dash_Nav from './Dash_Nav';
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import { Fetch_Property, Update_Propertyy } from '../../redux/action/propertyAction';
import { useNavigate, useParams } from 'react-router-dom';
import Admin_Side_Bar from '../../admin_dashboard/Admin_sidebar';

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





const Update_Property = () => {
    const {id} = useParams();
    const [side, setSide] = useState(false); // Sidebar state
    const {user,actionloading} = useSelector((state)=>state.User);
    const {createloading,property} = useSelector((state)=>state.Property);
    const [newAmenity, setNewAmenity] = useState('' );
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    const onlickhandle = async(e)=>{
        e.preventDefault();
        propertyData.property_detail = property_detail;
        dispatch(Update_Propertyy(id,propertyData,navigate))
    }

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

      useEffect(()=>{
        dispatch(Fetch_Property(id))
      },[dispatch,id])

      useEffect(()=>{
        if(property){
            setProperty_detail(property?.property_detail)
            setPropertyData({
              title: property?.title,
              description: property?.description,
              location: {
                address: property?.location?.address,
                country: property?.location?.country,
                state: property?.location?.state,
                zipcode: property?.location?.zipcode,
              },
              propertyDuration: property?.propertyDuration,
              property_type: property?.property_type,
              rooms: property?.rooms,
              bathrooms: property?.bathrooms,
              size: property?.size,
              price: property?.price,
              amenities: property?.amenities,
              google_map_link: property?.google_map_link,
              category: property?.category,
              years_of_build: property?.years_of_build,
            });
        }
      },[property])
  return (
   <div>
    <div>
        <Dash_Nav side={side} setSide={setSide} user={user}/>
    </div>
     <div className="dashboard-wrapper">
            <Admin_Side_Bar side={side} setSide={setSide} user={user} loading={actionloading}/>
      <div className="dashboard-side min-h-screen ">
        
      
       <div className="mt-2 text-center" data-aos="fade-right"  data-aos-easing="linear" data-aos-duration="1800">
       <h2 className="text-2xl font-extrabold bg-black inline-block px-16 rounded-full text-white py-4">Create Property</h2>
       </div>
       <div className="form-wrapper">
        <div className='mt-10 mx-2 md:mx-4'>
            <form onSubmit={onlickhandle} action="" className='max-w-5xl mb-20 mx-auto'>
     <div className=' grid grid-cols-1 sm:grid-cols-2 gap-4'>
     <div>
        <label className=' text-lg font-[600] font-sans mb-2'>Title</label>
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
            <label className=' text-lg font-[600] font-sans mb-2'>Description</label>
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
      <label className=' text-lg font-[600] font-sans mb-2'>City</label>
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
      <label className=' text-lg font-[600] font-sans mb-2'>State</label>
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
      <label className=' text-lg font-[600] font-sans mb-2'>Country</label>
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
     <div>
     <label className=' text-lg font-[600] font-sans mb-2'>zipcode</label>
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
     </div>

      <div>
      <label className=' text-lg font-[600] font-sans mb-2'>Property Type</label>
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
      <label className=' text-lg font-[600] font-sans mb-2'>Category</label>
        <select
        value={propertyData.category}
        onChange={(e)=>setPropertyData({...propertyData, category:e.target.value})}
        name="state" id="" className="w-full bg-gray-100 h-12 border outline-none rounded-sm border-gray-50">
            <option value="">Property category</option>
            <option value="rent">rent</option>
            
        </select>
      </div>
      <div>
      <label className=' text-lg font-[600] font-sans mb-2'>Rooms</label>
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
      <label className=' text-lg font-[600] font-sans mb-2'>Bath Rooms</label>
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
      <label className=' text-lg font-[600] font-sans mb-2'>Size</label>
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
      <label className=' text-lg font-[600] font-sans mb-2'>Price</label>
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
      <label className=' text-lg font-[600] font-sans mb-2'>Google Map Link</label>
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
      <label className=' text-lg font-[600] font-sans mb-2'>Years of build</label>
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
      <div>
      <label className=' text-lg font-[600] font-sans mb-2'>Property Duration</label>
        <select
        value={propertyData.propertyDuration}
        onChange={(e)=>setPropertyData({...propertyData, propertyDuration:e.target.value})}
        name="state" id="" className="w-full bg-gray-100 h-12 border outline-none rounded-sm border-gray-50">
            <option value="">Property Type</option>
            {propertyDurations.map((property,index)=>{
                return <option key={index} value={property}>{property}</option>
            })}
        </select>
      </div>
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

export default Update_Property