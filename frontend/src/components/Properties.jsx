import { AutoAwesomeMosaic, Bed, FilterList, Place, Shower } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { Fetch_Properties } from '../redux/action/propertyAction'
import { useEffect, useState } from 'react'
import Loader from './Loader'
import { Button, Slider } from '@mui/material'
import Select from "react-select";


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



const amenties = [
    "Swimming Pool",
    "Gym",
    "Parking",
    "Garden",
    "Balcony",
    "Elevator",
    "Security System",
    "Playground",
    "Clubhouse",
    "WiFi",
    "Air Conditioning",
    "Heating",
    "Fireplace",
    "Laundry Room",
    "Furnished",
    "Pet Friendly",
    "Smart Home Features",
    "Tennis Court",
    "Basketball Court",
    "Sauna",
    "Jacuzzi",
    "Rooftop Access",
    "BBQ Area",
    "Wheelchair Accessible",
    "Gated Community",
    "Backup Generator",
    "Conference Room",
    "Lounge Area",
    "Concierge Service",
    "Bike Storage",
    "CCTV Surveillance",
    "Private Yard",
    "Dishwasher",
    "Covered Parking",
    "High-Speed Internet",
    "Children’s Pool",
    "Walking Trails",
    "Business Center",
    "Recreational Room",
    "24/7 Water Supply",
    "Power Backup",
    "Spa",
    "Yoga Studio",
    "Game Room",
    "Co-Working Space",
    "Restaurant",
    "Shopping Area",
    "Medical Center",
    "Library",
    "Guest Parking"
  ];
  const cities = [
  "Amsterdam",       // Capital & most visited city
  "Rotterdam",       // Major port city, modern architecture
  "The Hague",       // Government & royal residence
  "Utrecht",         // Central hub, canals & universities
  "Eindhoven",       // Technology & innovation center (Philips HQ)
  "Tilburg",         // Industrial & student city
  "Groningen",       // Northern cultural & student city
  "Maastricht",      // Historic city near Belgium border
  "Breda",           // Southern vibrant city
  "Nijmegen",        // Oldest city in Netherlands
  "Leiden",          // University town near The Hague
  "Delft",           // Famous for Delft Blue pottery
  "Haarlem",         // Close to Amsterdam, great for living
  "Amersfoort",      // Growing city, good housing demand
  "Almere",          // Modern city near Amsterdam
  "Arnhem",          // Cultural & nature-rich city
  "Zwolle",          // Central charming city
  "Den Bosch",       // Also called ’s-Hertogenbosch
  "Leeuwarden",      // Friesland’s capital, cultural city
  "Enschede",        // Near Germany, student hub
  "Dordrecht",       // Historic port city
  "Helmond",         // Developing tech city near Eindhoven
  "Hoofddorp",       // Close to Schiphol Airport (business area)
  "Zaandam",         // Industrial & residential near Amsterdam
  "Apeldoorn",       // Green city with royal palace
];

  
const categories = [
    "Short-Term",
    "Mid-Term",
    "Long-Term",
]
const Properties = () => {
    const {properties,propertyloading} = useSelector((state)=>state.Property);
    const dispatch = useDispatch();
    const [p_type, setP_type] = useState(8);
    const [amet, setAmet] = useState(8);
    // const [amenities, setAmenities] = useState("")
    const [property_type, setProperty_type] = useState("")
    const [location, setLocation] = useState("")
    const [category, setCategory] = useState("")
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 30000]);

    const ptypeclick = ()=>{
        setP_type((prev)=>prev+8)
    }
    const amenclick = ()=>{
        setAmet((prev)=>prev+8)
    }
    const clearfilter = ()=>{
        setP_type(8)
        setAmet(8)
        setSelectedAmenities([])
        setProperty_type("")
        setCategory("")
        setLocation("")
        setPriceRange([0,30000])
        window.scroll({top: 100, behavior: "smooth" });
    }
    const handleAmenityChange = (amenity) => {
        setSelectedAmenities((prevSelected) =>
          prevSelected.includes(amenity)
            ? prevSelected.filter((item) => item !== amenity)
            : [...prevSelected, amenity]
        );
      };

    useEffect(()=>{
            dispatch(Fetch_Properties({amenities:selectedAmenities,address:location, propertyDuration:category, property_type, minPrice:priceRange[0], maxPrice:priceRange[1]}))
    },[selectedAmenities, category, dispatch, property_type, location,priceRange])
  return (
    <div>
        <div className="wrapper mt-32">
            <div className="grid-layout-wrapper max-w-6xl mx-auto max-[900px]:flex-col flex p-2 gap-4 my-20">
                <div className="sec-1 w-full min-[900px]:w-[30%]">
                    <div className="wrapper max-[900px]:hidden border border-gray-400 p-6 sticky top-0">
                       
                    <h2 className=' text-xl font-[700] font-sans'>Category</h2>
                        <div className=' mt-4 space-y-4'>
                            {categories.map((a)=>{
                                return (
                                    <div key={a} className=' space-x-2 lg:space-x-4 flex items-center'>
                                      <input type="checkbox" value={a} checked={a===category} onChange={(e)=>setCategory(e.target.value)} className="form-checkbox h-[15px] w-[15px] bg-[#A1B491]" id={a} name={a} />
                                      <label className="form-label text-black text-[15px] font-[300] ">{a==="Short-Term" ? "3 Days" : a==="Mid-Term" ? "1-Month" : "1-Year"}</label>
                                    </div>
                                )
                            })}
                        </div>
                        <h2 className="text-xl font-[700] font-sans mt-6">Price Range</h2>
<div className="mt-4 px-2">
  <Slider
    value={priceRange}
    onChange={(e, newValue) => setPriceRange(newValue)}
    valueLabelDisplay="auto"
    min={0}
    max={50000}
    step={10}
    sx={{
      color: "#A1B491",
    }}
  />
  <div className="flex justify-between text-sm text-gray-600 mt-2">
    <span>${priceRange[0].toLocaleString()}</span>
    <span>${priceRange[1].toLocaleString()}</span>
  </div>
</div>
                    <h2 className=' text-xl font-[700] mt-4 font-sans'>Locations</h2>
                        <div className=' mt-4 space-y-4'>
                            {cities.map((a)=>{
                                return (
                                    <div key={a} className=' space-x-2 lg:space-x-4 flex items-center'>
                                      <input type="checkbox" value={a} checked={a===location} onChange={(e)=>setLocation(e.target.value)} className="form-checkbox h-[15px] w-[15px] bg-[#A1B491]" id={a} name={a} />
                                      <label className="form-label text-black text-[15px] font-[300] ">{a}</label>
                                    </div>
                                )
                            })}
                        </div>
                        <h2 className=' text-xl mt-6 font-[700] font-sans'>Property Type</h2>
                        <div className=' mt-6 space-y-4'>
                            {property_types.slice(0,p_type).map((a)=>{
                                return (
                                    <div key={a} className=' space-x-2 lg:space-x-4 flex items-center'>
                                        <input type="checkbox" value={a} checked={a===property_type} onChange={(e)=>setProperty_type(e.target.value)}  className="form-checkbox h-[15px] w-[15px] bg-[#A1B491]" id={a} name={a} />
                                        <label className="form-label text-black text-[15px] font-[300] " htmlFor={a}>{a}</label>
                                    </div>
                                )
                            })}
                            {p_type<property_types?.length ? <p onClick={ptypeclick} className=' text-cyan-500 hover:underline cursor-pointer'>See more</p>:""}
                        </div>
                        <h2 className=' text-xl font-[700] font-sans mt-6'>Amenities</h2>
                        <div className=' mt-4 space-y-4'>
                            {amenties.slice(0,amet).map((a)=>{
                                return (
                                    <div key={a} className=' space-x-2 lg:space-x-4 flex items-center'>
                                        <input type="checkbox" value={a} checked={selectedAmenities.includes(a)}
        onChange={() => handleAmenityChange(a)}  className="form-checkbox h-[15px] w-[15px] bg-[#A1B491]" id={a} name={a} />
                                        <label className="form-label text-black text-[15px] font-[300] " htmlFor={a}>{a}</label>
                                    </div>
                                )
                            })}
                           {amet<amenties?.length ? <p onClick={amenclick} className=' text-cyan-500 hover:underline cursor-pointer'>See more</p>:""}
                        </div>
                        <div className='mt-4'>
                            <Button variant='contained' onClick={clearfilter}>Clear Filter</Button>
                        </div>
                    </div>
                   <div className=' min-[900px]:hidden'>
                     <div className=' grid grid-cols-2 min-[750px]:grid-cols-4 gap-2'>
                <div className=' w-full relative'>
                    <div className=' absolute top-[50%] -translate-y-[50%] left-1'>
                        <FilterList/>
                    </div>
                    <select value={category} onChange={(e)=>setCategory(e.target.value)} className='border border-gray-200 rounded-sm outline-none bg-white h-10 w-full pl-6'>
                        <option>Category</option>
                        {categories.map((a)=>{
                            return (
                                <option key={a} value={a}>{a}</option>
                            )
                        })}
                    </select>
                </div>
                <div className=' w-full relative'>
                <div className=' absolute top-[50%] -translate-y-[50%] left-1'>
                        <FilterList/>
                    </div>
                    <select value={property_type} onChange={(e)=>setProperty_type(e.target.value)} className='border border-gray-200 rounded-sm outline-none bg-white h-10 w-full pl-6'>
                        <option>Property Type</option>
                        {property_types.map((a)=>{
                            return (
                                <option key={a} value={a}>{a}</option>
                            )
                        })}
                    </select>
                </div>
                <div className=' w-full relative'>
                <div className=' absolute top-[50%] -translate-y-[50%] left-1'>
                        <AutoAwesomeMosaic/>
                    </div>
                    <Select
  isMulti
  options={amenties.map((a) => ({ label: a, value: a }))}
  value={selectedAmenities.map((a) => ({ label: a, value: a }))}
  onChange={(selected) => setSelectedAmenities(selected.map((opt) => opt.value))}
  placeholder="Select Amenities..."
  className="basic-multi-select"
  classNamePrefix="select"
/>
                </div>
                <div className=' w-full relative'>
                <div className=' absolute top-[50%] -translate-y-[50%] left-1'>
                        <AutoAwesomeMosaic/>
                    </div>
                    <select value={location} onChange={(e)=>setLocation(e.target.value)} className='border border-gray-200 rounded-sm outline-none bg-white h-10 w-full pl-6'>
                        <option>Location</option>
                        {cities.map((a)=>{
                            return (
                                <option key={a} value={a}>{a}</option>
                            )
                        })}
                    </select>
                </div>
                <div className='w-full px-4 h-14 border border-gray-200 p-1 rounded-sm'>
                                        <p className='font-[400] text-sm'>Price Range</p>
                                                        <Slider
                                        value={priceRange}
                                        onChange={(e, newValue) => setPriceRange(newValue)}
                                        valueLabelDisplay="auto"
                                        min={0}
                                        max={50000}
                                        step={10}
                                        sx={{
                                          color: "#A1B491",
                                        }}
                                      />
                                                    </div>
                {(category || location || selectedAmenities.length>0 || property_type || priceRange[0]>0) && (
                    <Button variant='contained' onClick={clearfilter}>Clear Filter</Button>
                )}
            </div>
                   </div>
                </div>
                <div className="sec-2 w-full min-[900px]:w-[70%]">
               {propertyloading ? (<Loader/>): properties?.length===0 ? (<div className=' flex justify-center items-center h-[80vh]'>
                <div className='flex flex-col items-center gap-2'>
                    <p className='text-center text-xl font-[700]'>No Properties found.</p>
                       <Button variant='contained' onClick={clearfilter}>Clear Filter</Button>
                </div>
               </div>):(
                    <div className="wrapper sticky top-[120px]">
                    <div className="cards grid grid-cols-1 min-[600px]:grid-cols-2 gap-4">
                       {properties?.map((p,index)=>{
                        return (
                            <div key={index} className="card group shadow-md max-[600px]:w-[350px] mx-auto max-[400px]:w-full">
                            <div className="img relative overflow-hidden">
                                <Link to={`/detail/${p._id}`}>
                                  <img src={`${import.meta.env.VITE_BASE_URL}${p.images[0]}`} className=' w-full h-[250px] object-cover group-hover:scale-110 duration-300 transition-all' alt="" />
                                </Link>
                                <div className=" absolute bg-[#8FA282] text-white px-3 text-sm py-1 rounded-full top-2 left-2">
                        <span>{p.propertyDuration==="Short-Term" ? "3 Days" : p.propertyDuration==="Mid-Term" ? "1-Month" : "1-Year"}</span>
                     </div>
                            </div>
                            <div className=' p-4 lg:p-6'>
                                <p className=' text-xl font-[300] text-[#A1B491]'>For Rent</p>
                                <Link to={`/detail/${p._id}`}>
                                <h2 className='text-xl lg:text-2xl font-[700] mt-2 hover:text-[#A1B491] line-clamp-1 cursor-pointer'>{p.title}</h2>
                                </Link>
                                <p className=' font-[350] text-sm my-4 text-gray-600'><Place sx={{marginRight:"6px",color:"#A1B491"}}/> {p.location.address}</p>
                                <p className=' space-x-4 font-[350] text-lg font-sans'><span className=' text-gray-600'>{p.rooms} <Bed sx={{color:"#A1B491"}}/></span><span className=' text-gray-600'>{p.bathrooms} <Shower sx={{color:"#A1B491"}}/></span><span className=' text-gray-600'>{p.size} Squared ft</span></p>
                                <hr className=' my-6'/>
                                <p className='text-[#8FA282] font-[400] text-lg md:text-xl'>${p.price}</p>
                            </div>
                        </div>
                        )
                       })}
                    </div>
                   </div>
               )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Properties