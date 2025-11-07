import { useDispatch, useSelector } from "react-redux"
import Featured_listing from "./home/Featured_listing"
import Hero_Section from "./home/Hero_Section"
import Property_By_Location from "./home/Property_by_location"
import RentalCars from "./home/rentalCars"
import Services from "./home/Services"
import Testimonial from "./home/Testimonial"
import { useEffect } from "react"
import { Fetch_Retal_Cars } from "../redux/action/carAction"

const Home = () => {
  const {cars} = useSelector((state)=>state.Car);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(Fetch_Retal_Cars());
  },[dispatch])
  return (
    <div>
        <Hero_Section/>
        <div className="mt-20 md:mt-28">
          <Services/>
        </div>
        <div className="">
          <Property_By_Location/>
        </div>
        <div className="">
          <Featured_listing/>
        </div>
        {cars?.length>0 && (
          <div className="">
          <RentalCars/>
        </div>
        )}
        <div className="">
          <Testimonial/>
        </div>
    </div>
  )
}

export default Home