import { useDispatch, useSelector } from "react-redux"
import Featured_listing from "./home/Featured_listing"
import Property_By_Location from "./home/Property_by_location"
import Services from "./home/Services"
import Testimonial from "./home/Testimonial"
import { useEffect } from "react"
import { Fetch_Retal_Cars } from "../redux/action/carAction"
import RentalCars from "./home/RentalCars"
import Hero_Section from "./home/Hero_Section"

const Home = () => {
  const {totalCars} = useSelector((state)=>state.Car);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(Fetch_Retal_Cars());
  },[dispatch])
  return (
    <div>
        <Hero_Section/>
        <div className="mt-16 md:mt-20">
          <Services/>
        </div>
        <div className="">
          <Property_By_Location/>
        </div>
        <div className="">
          <Featured_listing/>
        </div>
        {totalCars && totalCars>0 && (
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