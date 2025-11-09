import { AutoAwesomeMosaic, FilterList, Place } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react'
import Loader from './Loader'
import { Button, Slider } from '@mui/material'
import { Fetch_Retal_Cars } from '../redux/action/carAction'


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
const RentalcarsListing = () => {
    const {cars,carloading} = useSelector((state)=>state.Car);
    const dispatch = useDispatch();
    const [p_type, setP_type] = useState(8);
    const [amet, setAmet] = useState(8);
    // const [amenities, setAmenities] = useState("")
    const [location, setLocation] = useState("");
    const [carType, setCarType] = useState("");
    const [carModel, setCarModel] = useState("");
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
        setCarModel("");
        setCarType("");
        setLocation("");
        setPriceRange([0,30000])
        window.scroll({top: 100, behavior: "smooth" });
    }

    useEffect(()=>{
            dispatch(Fetch_Retal_Cars({address:location, carType, carModel, minPrice:priceRange[0], maxPrice:priceRange[1]}))
    },[carModel, dispatch, carType, location, priceRange])
  return (
    <div>
        <div className="wrapper mt-32">
            <div className="grid-layout-wrapper max-w-6xl mx-auto max-[900px]:flex-col flex p-2 gap-4 my-20">
                <div className="sec-1 w-full min-[900px]:w-[30%]">
                    <div className="wrapper max-[900px]:hidden border border-gray-400 p-6 sticky top-0">
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
                    <h2 className=' text-xl font-[700] font-sans'>Locations</h2>
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
                        <h2 className=' text-xl mt-6 font-[700] font-sans'>Car Type</h2>
                        <div className=' mt-6 space-y-4'>
                            {carTypes.slice(0,p_type).map((a)=>{
                                return (
                                    <div key={a} className=' space-x-2 lg:space-x-4 flex items-center'>
                                        <input type="checkbox" value={a} checked={a===carType} onChange={(e)=>setCarType(e.target.value)}  className="form-checkbox h-[15px] w-[15px] bg-[#A1B491]" id={a} name={a} />
                                        <label className="form-label text-black text-[15px] font-[300] " htmlFor={a}>{a}</label>
                                    </div>
                                )
                            })}
                            {p_type<carTypes?.length ? <p onClick={ptypeclick} className=' text-cyan-500 hover:underline cursor-pointer'>See more</p>:""}
                        </div>
                        <h2 className=' text-xl font-[700] font-sans mt-6'>Car Model</h2>
                        <div className=' mt-4 space-y-4'>
                            {carModels.slice(0,amet).map((a)=>{
                                return (
                                    <div key={a} className=' space-x-2 lg:space-x-4 flex items-center'>
                                        <input type="checkbox" value={a} checked={a===carModel}
        onChange={(e) => setCarModel(e.target.value)}  className="form-checkbox h-[15px] w-[15px] bg-[#A1B491]" id={a} name={a} />
                                        <label className="form-label text-black text-[15px] font-[300] " htmlFor={a}>{a}</label>
                                    </div>
                                )
                            })}
                           {amet<carModels?.length ? <p onClick={amenclick} className=' text-cyan-500 hover:underline cursor-pointer'>See more</p>:""}
                        </div>
                        <div className='mt-4'>
                            <Button variant='contained' onClick={clearfilter}>Clear Filter</Button>
                        </div>
                        {/* <h2 className=' text-xl font-[700] font-sans mt-6'>Amenities</h2>
                        <div className=' mt-4 space-y-4'>
                            {budgets.map((a)=>{
                                return (
                                    <div key={a.id} className=' flex justify-between items-center'>
                                      <div className=' space-x-4'>
                                      <input type="checkbox" className="form-checkbox h-[15px] w-[15px] bg-[#A1B491]" id={a.name} name={a.name} />
                                      <label className="form-label text-black text-[15px] font-[300] ">{a.name}</label>
                                      </div>
                                      <div>
                                        <p className=' font-[350] text-sm font-sans'>{a.range}</p>
                                      </div>
                                    </div>
                                )
                            })}
                        </div> */}
                    </div>
                    <div className=' min-[900px]:hidden'>
                                         <div className=' grid grid-cols-2 min-[750px]:grid-cols-4 gap-2'>
                                    <div className=' w-full relative'>
                                        <div className=' absolute top-[50%] -translate-y-[50%] left-1'>
                                            <FilterList/>
                                        </div>
                                        <select value={location} onChange={(e)=>setLocation(e.target.value)} className='border border-gray-200 rounded-sm outline-none bg-white h-14 w-full pl-6'>
                                            <option>Location</option>
                                            {cities.map((a)=>{
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
                                        <select value={carType} onChange={(e)=>setCarType(e.target.value)} className='border border-gray-200 rounded-sm outline-none bg-white h-14 w-full pl-6'>
                                            <option>Car Type</option>
                                            {carTypes.map((a)=>{
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
                                        <select value={carModel} onChange={(e)=>setCarModel(e.target.value)} className='border border-gray-200 rounded-sm outline-none bg-white h-14 w-full pl-6'>
                                            <option>Car Model</option>
                                            {carModels.map((a)=>{
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
                                    {(location || carModel || carType) && (
                                        <Button variant='contained' onClick={clearfilter}>Clear Filter</Button>
                                    )}
                                </div>
                                       </div>
                </div>
                <div className="sec-2 w-full min-[900px]:w-[70%]">
               {carloading ? (<Loader/>): cars?.length===0 ? (<div className=' flex justify-center items-center h-[80vh]'>
                <div className=' flex flex-col gap-2'>
                    <p className='text-center text-xl font-[700]'>No cars found.</p>
                    <Button variant='contained' onClick={clearfilter}>Clear Filter</Button>
                </div>
               </div>):(
                    <div className="wrapper sticky top-[120px]">
                    <div className="cards grid grid-cols-1 min-[600px]:grid-cols-2 gap-4">
                       {cars?.map((p,index)=>{
                        return (
                            <div key={index} className="card group shadow-md max-[600px]:w-[350px] mx-auto max-[400px]:w-full">
                            <div className="img overflow-hidden">
                                <Link to={`/car/${p._id}`}>
                                  <img src={`${import.meta.env.VITE_BASE_URL}${p.images[0]}`} className=' w-full h-[250px] object-cover group-hover:scale-110 duration-300 transition-all' alt="" />
                                </Link>
                            </div>
                            <div className=' p-4 lg:p-6'>
                                <p className=' text-xl font-[400] text-[#A1B491]'>For Rent</p>
                                <Link to={`/car/${p._id}`}>
                                <h2 className='text-xl lg:text-2xl font-[700] mt-2 hover:text-[#A1B491] line-clamp-1 cursor-pointer'>{p.carName}</h2>
                                </Link>
                                <p className=' font-[350] text-sm my-4 text-gray-600'><Place sx={{marginRight:"6px",color:"#A1B491"}}/> {p.location.address}</p>
                                <h2 className=' text-xl font-[700] font-sans text-[#A1B491]'>${`${p.price}`} <span className='text-black ml-2'>{p.carRentDuration}</span></h2>
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

export default RentalcarsListing