import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Fetch_FeatredCities } from "../../redux/action/CityAction";
import Loader from "../Loader";

const Property_By_Location = () => {
    const {cityloading,feat_cities} = useSelector((state)=>state.FeaturedCity);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(Fetch_FeatredCities());
    },[dispatch])
  return (
    <div>
        <div className="wrapper bg-[#F2F6F7] py-20 flex justify-center items-center">
           <div>
           <div className="heading text-center">
            <h2 className=" px-4 py-1 bg-[#8FA282] inline-block rounded-full text-white">Featured</h2>
            <h2 className=" md:text-4xl text-3xl lg:text-5xl font-[800] mt-4">Featured Cities</h2>
            </div>

        {cityloading ? (<Loader/>):(
               <div className="card-wrapper mx-4 mt-10">
               <div className="cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                  {feat_cities?.map((city,index)=>{
                    return(
                        <div key={index} data-aos="fade-down" data-aos-delay={`${index*100}`} className="card sm:w-full w-[350px] max-[400px]:w-full m-auto relative bg-white p-2 md:p-4 group">
                        <div className=" absolute top-8 left-6">
                            <h2 className=" px-4 font-[300] py-1 rounded-full bg-white text-gray-500">{city.total_properties} {city.total_properties===1?"Property":"properties"}</h2>
                        </div>
                        <img src={`${import.meta.env.VITE_BASE_URL}${city.image}`} className=" w-full object-cover h-[250px]" alt="" />
                        <div className=" space-y-3 py-2">
                            <h2 className=" text-lg font-[300] text-gray-500">{city.cityname}</h2>
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
  )
}

export default Property_By_Location