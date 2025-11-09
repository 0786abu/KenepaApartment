import { useDispatch, useSelector } from "react-redux"
import Featured_listing from "./home/Featured_listing"
import { useEffect } from "react"
import { Fetch_Retal_Cars } from "../redux/action/carAction"
import RentalCars from "./home/RentalCars"
import Hero_Section from "./home/Hero_Section"
import WelcomeSection from "./home/Welcome"
import { FeaturesSection } from "./home/Features"
import { CTASection } from "./home/CTASection"

const Home = () => {
  const {totalCars} = useSelector((state)=>state.Car);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(Fetch_Retal_Cars());
  },[dispatch])
  return (
    <div>
        <Hero_Section/>
        <WelcomeSection/>
          <Featured_listing/>
        {totalCars && totalCars>0 && (
          <RentalCars/>
        )}
        <FeaturesSection/>
        <CTASection/>
    </div>
  )
}

export default Home