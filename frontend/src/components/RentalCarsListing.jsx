import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { useEffect } from 'react'
import Loader from './Loader'
import { Fetch_Retal_Cars } from '../redux/action/carAction'


const RentalcarsListing = () => {
    const {cars,carloading} = useSelector((state)=>state.Car);
    const dispatch = useDispatch();

    useEffect(()=>{
            dispatch(Fetch_Retal_Cars())
    },[dispatch])
  return (
    <div>
        <div className="wrapper py-14 md:py-28 bg-[#EFEBE7]">
            <div className="grid-layout-wrapper max-w-6xl mx-auto p-2 gap-4">

                <div className="sec-2 w-full">
               {carloading ? (<Loader/>): cars?.length===0 ? (<div className=' flex justify-center items-center h-[80vh]'>
                <div className=' flex flex-col gap-2'>
                    <p className='text-center text-xl font-[700]'>No cars found.</p>
                </div>
               </div>):(
                    <div className="wrapper">
                    <div className="cards grid grid-cols-1 min-[430px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                       {cars?.slice(0,6)?.map((p,index)=>{
                        return (
                            <div key={index} className="card bg-white group shadow-md mx-auto">
                            <div className="img overflow-hidden">
                                <Link to={`/car/${p._id}`}>
                                  <img src={`${import.meta.env.VITE_BASE_URL}${p.images[0]}`} className=' w-full h-[250px] object-cover group-hover:scale-110 duration-300 transition-all' alt="" />
                                </Link>
                            </div>
                            <div className=' p-4 lg:p-6'>
                                <Link to={`/car/${p._id}`}>
                                <h2 className='text-xl lg:text-2xl font-[700] mt-2 hover:text-[#A1B491] line-clamp-1 cursor-pointer'>{p.carName}</h2>
                                </Link>
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