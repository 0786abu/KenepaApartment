import { Bed, CalendarMonth, House, Place, Shower } from '@mui/icons-material'
import {Link, useParams} from 'react-router-dom'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Fetch_Properties, Fetch_Property } from '../redux/action/propertyAction';
import Loader from './Loader';
import { Landmark } from 'lucide-react';


const Property_detail = () => {
    const {id} = useParams();
    const {property,properties,propertyloading} = useSelector((state)=>state.Property);
    const dispatch = useDispatch();
    const [related, setRelated] = useState([]);

    useEffect(()=>{
      dispatch(Fetch_Property(id))
      dispatch(Fetch_Properties())
    },[dispatch,id])

    useEffect(()=>{
      const relate = properties?.filter((item)=>item?.location?.address === property?.location?.address && item._id !== property._id);
      setRelated(relate)
    },[properties,property])
     const settings = {
        dots: true,
        infinite: property?.images?.length > 1 ? true : false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false
        // initialSlide: 0,
    }
  return (
    <div className='bg-[#EFEBE7]'>
   {propertyloading ? (<Loader/>):(
      <div>
      <div className="header relative mt-16 h-[300px] bg-[url(https://tunatheme.com/tf/html/quarter-preview/quarter/img/bg/14.jpg)] bg-cover bg-no-repeat bg-center">
                   <div className=" text-center absolute top-[50%] -translate-y-[50%] left-[50%] z-40 -translate-x-[50%]">
                     <h2 className=" md:text-3xl text-2xl lg:text-4xl mb-6 font-[800] text-black font-sans">Property Detail</h2>
                     <div className="">
                       <span><House sx={{color:"#8FA282",fontSize:"30px"}}/></span>
                       <span className=" text-black font-[600] font-sans text-lg">Home {">"} </span>
                       <span className=" font-[600] text-black font-sans text-lg">Detail</span>
                     </div>
                   </div>
                 </div>
 
                 <div className="detail-wrapper max-w-[1200px] mx-auto">
                     <div className="sub-wrapper">
                         <div className="images slider-slick w-full mt-10 mb-20 text-black">
                             <Slider {...settings}>
                                 {property?.images.map((a)=>{
                                     return (
                                         <div key={a} className="image-wrapper w-full">
                                             <img src={`${import.meta.env.VITE_BASE_URL}${a}`} alt="image" className=' w-full h-autos md:h-[500px] object-cover'/>
                                         </div>
                                     )
                                 })}
                             </Slider>
                             {/* <h2>images</h2> */}
                         </div>
                         <div className="grid-layout gap-2 mx-4 mt-20 pb-10">
                             <div className="sec-1 w-full">
                               <div className="wrapper">
                                 <div className=' grid md:grid-cols-4 grid-cols-2 gap-4 md:gap-8'>
                                   <p className=' px-4 py-1 font-[400] bg-[#E8C696] text-white inline-block'>For Rent</p>
                                   <p className='text-font-[300] text-sm text-gray-500'><CalendarMonth sx={{color:"#E8C696"}}/> {property?.posteddate}</p>
                                   <p className='text-font-[300] text-sm text-gray-500 flex items-center gap-1'><span><Landmark className='text-[#E8C696]'/></span> <span>{property?.location?.zipcode}</span></p>
                                   <div>
                                    <select className='border border-slate-200 rounded-sm p-2'>
                                      <option>See Availabilities</option>
                                      {property?.availabilities?.map((ave,index)=>{
                                        return <option key={index} className=' space-x-2 block'>
                                          {ave.date} - {ave.isBooked === true ? "Already Book" : "Available"}
                                        </option>
                                      })}
                                    </select>
                                  </div>
                                 </div>
                                 <h2 className=' text-4xl font-[700] font-sans mt-8'>{property?.title}</h2>
                                  <p className=' font-[350] text-sm my-6 text-gray-600'><Place sx={{marginRight:"6px",color:"#8FA282"}}/> {property?.location?.address}</p>
                                  
                                 <h2 className=' text-2xl pl-2 font-[700] border-l-2 border-[#8FA282] font-sans mt-8'>Description</h2>
                                 <div className=' mt-6 property_detail'>
                                   <div dangerouslySetInnerHTML={{__html:property?.property_detail}}>
                                     
                                   </div>
                                 </div>
                                 
                                 <h2 className=' text-2xl pl-2 font-[700] border-l-2 border-[#8FA282] font-sans mt-8'>Property Detail</h2>
                                 <div className=' p-8 border sm:flex  items-start bg-[#F2F6F7] mt-6'>
                                   <div className=' space-y-4 w-full my-4 sm:w-1/2 sm:flex flex-col'>
                                     <p className='w-[250px] flex items-center justify-between text-gray-500 font-[350] text-sm'>Property ID: <span className='font-[400] ml-10 text-lg text-black text-start'>{property?.propertyid}</span></p>
                                     <p className=' w-[250px] flex items-center justify-between text-gray-500 font-[350] text-sm'>Home Area: <span className='font-[400] ml-10 text-lg text-black text-start'>{property?.size} ft</span></p>
                                     <p className=' w-[250px] flex items-center justify-between text-gray-500 font-[350] text-sm'>Rooms: <span className='font-[400] ml-10 text-lg text-black text-start'>{property?.rooms}</span></p>
                                     <p className=' w-[250px] flex items-center justify-between text-gray-500 font-[350] text-sm'>Baths: <span className='font-[400] ml-10 text-lg text-black text-start'>{property?.bathrooms}</span></p>
                                     <p className=' w-[250px] flex items-center justify-between text-gray-500 font-[350] text-sm'>Property Status: <span className='font-[400] ml-10 text-lg text-black text-start'>For Rent</span></p>
                                   </div>
                                   <div className=' space-y-4 w-full my-4 sm:w-1/2 sm:flex flex-col'>
                                     <p className='w-[250px] flex items-center justify-between text-gray-500 font-[350] text-sm'>Build year: <span className='font-[400] ml-10 text-lg text-black text-start'>{property?.years_of_build}</span></p>
                                   </div>
                                 </div>
                                 <div className='my-6'>
                                  <h2 className=' text-2xl pl-2 font-[700] border-l-2 border-[#8FA282] font-sans mt-8'>Amenities</h2>
                                  <div className=' gap-2 mt-2 flex flex-wrap'>
                                    {property?.amenities?.map((amen,index)=>{
                                      return <span className='px-3 py-1 rounded-full even:bg-[#E8C696] bg-[#A0B591] text-white' key={index}>{amen}</span>
                                    })}
                                  </div>
                                 </div>
                                 <h2 className=' text-2xl pl-2 font-[700] border-l-2 border-[#8FA282] font-sans mt-8'>Location</h2>
                                 <div className="location mt-6">
                               <iframe src={property?.google_map_link} width="100%" height={500} style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                                 </div>
 
                                 {related?.length>0 ? (<>
                                  <h2 className=' text-2xl pl-2 font-[700] border-l-2 border-[#ff5a3c] font-sans mt-8'>Related Properties</h2>
                                 <div className="relative-wrapper mt-8">
                                   <div className="cards grid max-[550px]:grid-cols-1 grid-cols-2 gap-4">
                                   {related?.map((item,index)=>{
                                    return(
                                      <div key={index} className="card bg-white group shadow-md ">
                             <div className="img overflow-hidden">
                                 <Link to={`/detail/${item._id}`}>
                                   <img src={`${import.meta.env.VITE_BASE_URL}${item.images[0]}`} className=' w-full group-hover:scale-110 duration-300 transition-all' alt="" />
                                 </Link>
                             </div>
                             <div className=' p-2 lg:p-6'>
                                 <p className=' text-xl font-[300] text-[#ff5a3c]'>For {item.category}</p>
                                 <Link to={`/detail/${item._id}`}>
                                 <h2 className='text-lg lg:text-2xl font-[700] mt-2 line-clamp-1 hover:text-[#ff5a3c] cursor-pointer'>{item.title}</h2>
                                 </Link>
                                 <p className=' font-[350] text-sm my-4 text-gray-600'><Place sx={{marginRight:"6px",color:"#ff5a3c"}}/> {item.location.address}</p>
                                 <p className=' space-x-4 font-[350] text-lg font-sans'><span className=' text-gray-600'>{item.rooms} <Bed sx={{color:"#ff5a3c"}}/></span><span className=' text-gray-600'>{item.bathrooms} <Shower sx={{color:"#ff5a3c"}}/></span><span className=' text-gray-600'>{item.size} Squared ft</span></p>
                                 <hr className=' my-6'/>
                                 <h2 className=' text-xl font-[700] font-sans text-[#ff5a3c]'>${`${item.price} ${item.category==="rent"? <span className=' font-[400] text-base'>/Month</span>:""}`}</h2>
                             </div>
                         </div>
                                    )
                                   })}
                                   </div>
                                 </div>
                                 </>):(<h2 className=' text-xl font-black font-sans text-center my-4'>No Related Property Yet</h2>)}
                               </div>
                             </div>
                         </div>
                     </div>
                 </div>
      </div>
   )}
    </div>
  )
}

export default Property_detail
