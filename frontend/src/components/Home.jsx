import Gallery from "./home/Gallery"
import Hero_Section from "./home/Hero_Section"
import WelcomeSection from "./home/Welcome"

const Home = () => {
  return (
    <div className=" bg-[#EFEBE7]">
        <Hero_Section/>
        <WelcomeSection/>
        <Gallery/>
    </div>
  )
}

export default Home