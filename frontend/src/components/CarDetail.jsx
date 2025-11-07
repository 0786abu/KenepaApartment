import { House, Place } from '@mui/icons-material'
import {Link, useParams} from 'react-router-dom'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Loader from './Loader';
import { Fetch_Retal_Car, Fetch_Retal_Cars } from '../redux/action/carAction';


const CarDetail = () => {
    
    const {id} = useParams();
    const {car,cars,carloading} = useSelector((state)=>state.Car);
    const dispatch = useDispatch();
    const [related, setRelated] = useState([]);

    useEffect(()=>{
      dispatch(Fetch_Retal_Car(id))
      dispatch(Fetch_Retal_Cars())
    },[dispatch,id])

    useEffect(()=>{
      const relate = cars?.filter((item)=>item?.location?.address === car?.location?.address && item._id !== car._id);
      setRelated(relate)
    },[cars,car])
    const settings = {
        dots: true,
        infinite: car?.images?.length > 1 ? true : false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false
        // initialSlide: 0,
    }
  return (
    <div>
   {carloading ? (<Loader/>):(
      <div>
      <div className="header relative mt-16 h-[300px] bg-[url(https://tunatheme.com/tf/html/quarter-preview/quarter/img/bg/14.jpg)] bg-cover bg-no-repeat bg-center">
                   <div className=" text-center absolute top-[50%] -translate-y-[50%] left-[50%] z-40 -translate-x-[50%]">
                     <h2 className=" md:text-3xl text-2xl lg:text-4xl mb-6 font-[800] text-black font-sans">Car Detail</h2>
                     <div className="">
                       <span><House sx={{color:"#8FA282",fontSize:"30px"}}/></span>
                       <span className=" text-black font-[600] font-sans text-lg">Home {">"} </span>
                       <span className=" font-[600] text-black font-sans text-lg">Detail</span>
                     </div>
                   </div>
                 </div>
 
                 <div className="detail-wrapper max-w-4xl mx-auto">
                     <div className="sub-wrapper">
                         <div className="images slider-slick w-full mt-10 mb-20 text-black">
                             <Slider {...settings}>
                                 {car?.images.map((a)=>{
                                     return (
                                         <div key={a} className="image-wrapper w-full">
                                             <img src={`${import.meta.env.VITE_BASE_URL}${a}`} alt="image" className=' w-full h-autos md:h-[500px] object-cover'/>
                                         </div>
                                     )
                                 })}
                             </Slider>
                             {/* <h2>images</h2> */}
                         </div>
                         <div className="grid-layout gap-2 mx-4 mt-20 mb-10">
                             <div className="sec-1 w-full">
                               <div className="wrapper">
                                 <div className=' grid sm:grid-cols-4 grid-cols-2 gap-4 md:gap-8'>
                                   <p className=' px-4 py-1 font-[400] bg-[#E8C696] text-white inline-block'>For Rent</p>
                                   <p className=' px-4 py-1 font-[400] bg-[#8FA282] text-white inline-block'>Price: ${car?.price}</p>
                                 </div>
                                 <h2 className=' text-4xl font-[700] font-sans mt-8'>{car?.carName}</h2>
                                  <p className=' font-[350] text-sm my-6 text-gray-600'><Place sx={{marginRight:"6px",color:"#8FA282"}}/> {car?.location?.address}</p>
                                 <h2 className=' text-2xl pl-2 font-[700] border-l-2 border-[#8FA282] font-sans mt-8'>Description</h2>
                                 <div className=' mt-6 property_detail'>
                                   {car?.description}
                                 </div>
                                 <h2 className=' text-2xl pl-2 font-[700] border-l-2 border-[#8FA282] font-sans mt-8'>Property Detail</h2>
                                 <div className=' p-8 border sm:flex  items-start bg-[#F2F6F7] mt-6'>
                                   <div className=' space-y-4 w-full my-4 sm:w-1/2 sm:flex flex-col'>
                                     <p className='w-[250px] flex items-center justify-between text-gray-500 font-[350] text-sm'>Car Type: <span className='font-[400] ml-10 text-lg text-black text-start'>{car?.carType}</span></p>
                                     <p className=' w-[250px] flex items-center justify-between text-gray-500 font-[350] text-sm'>Car Model Year: <span className='font-[400] ml-10 text-lg text-black text-start'>{car?.carModel}</span></p>
                                     
                                   </div>
                                 </div>
                                 <h2 className=' text-2xl pl-2 font-[700] border-l-2 border-[#8FA282] font-sans mt-8'>Location</h2>
                                 <div className="location mt-6">
                               <iframe src={car?.google_map_link} width="100%" height={500} style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                                 </div>
 
                                 {related?.length>0 ? (<>
                                  <h2 className=' text-2xl pl-2 font-[700] border-l-2 border-[#ff5a3c] font-sans mt-8'>Related Propertyies</h2>
                                 <div className="relative-wrapper mt-8">
                                   <div className="cards grid max-[550px]:grid-cols-1 grid-cols-2 gap-4">
                                   {related?.map((item,index)=>{
                                    return(
                                      <div key={index} className="card group shadow-md ">
                             <div className="img overflow-hidden">
                                 <img src={`${import.meta.env.VITE_BASE_URL}${item.images[0]}`} className=' w-full group-hover:scale-110 duration-300 transition-all' alt="" />
                             </div>
                             <div className=' p-2 lg:p-6'>
                                 <p className=' text-xl font-[300] text-[#ff5a3c]'>For Rent</p>
                                 <Link href={`/car/${item._id}`}>
                                 <h2 className='text-lg lg:text-2xl font-[700] mt-2 line-clamp-1 hover:text-[#ff5a3c] cursor-pointer'>{item.title}</h2>
                                 </Link>
                                 <p className=' font-[350] text-sm my-4 text-gray-600'><Place sx={{marginRight:"6px",color:"#ff5a3c"}}/> {item.location.address}</p>
                                 <hr className=' my-6'/>
                                 <h2 className=' text-xl font-[700] font-sans text-[#ff5a3c]'>${`${item.price}`}</h2>
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

export default CarDetail