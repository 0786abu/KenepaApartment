import HomeIcon from '@mui/icons-material/Home';


const Hero_Section = () => {
  return (
  <div>
      <div className=' bg-[url(https://timandjulieharris.com/wp-content/uploads/2019/12/luxury.jpg)] bg-cover bg-no-repeat bg-center before:bg-black before:inset-0 relative before:opacity-40 min-h-screen before:z-10 before:absolute'>
        <div className=' absolute top-[55%] w-[300px] md:w-[550px] z-[40] left-[50%] translate-x-[-50%] translate-y-[-55%]'>
            <div className=' text-center'>
            <p className=' text-base font-[600] text-white'><HomeIcon/>Real Estate Agency</p>
            <h2 className=' md:text-6xl text-3xl font-[800] mt-4 text-white'>Find Your Dream House By Us</h2>
            <p className=' text-white text-lg font-[500] mt-6'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam, explicabo! Rerum magnam modi.</p>
            <button className=' px-6 py-4 mt-4 bg-[#8FA282] text-white hover:bg-[#98b783] duration-300 text-xl font-[300]'>Make an Enquiry</button>
            </div>
        </div>
        
    </div>
  </div>
  )
}

export default Hero_Section