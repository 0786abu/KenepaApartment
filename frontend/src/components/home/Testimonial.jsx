import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FormatQuote } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Fetch_Reviews } from "../../redux/action/reviewAction";
import { useEffect } from "react";
import Loader from "../Loader";


const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      }
    ],
  };
  const {reviews,reviewloading} = useSelector((state)=>state.Review);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(Fetch_Reviews());
  },[dispatch])

  

  return (
    <div>
      <div className="wrapper bg-[#F2F6F7] py-20">
        <div>
          <div className="header text-center">
            <h2 className="text-[#8FA282] relative before:w-[50px] before:absolute before:left-[-90%] before:h-[2.5px] before:bg-[#d4ca68] inline-block before:top-[50%] before:-translate-y-[50%] after:w-[50px] after:absolute after:right-[-90%] after:h-[2.5px] after:bg-[#d4ca68] after:top-[50%] after:-translate-y-[50%] text-lg font-[400]">
              Reviews
            </h2>
            <h2 className="text-4xl font-[800] mt-4">Happy Clients</h2>
          </div>

         {reviewloading ? (<Loader/>):(
           <div className="wrapper-slider px-6 mt-20">
           <div className="cards max-w-6xl mx-auto">
             <Slider {...settings}>
               {reviews?.map((review) => (
              <div
              key={review._id}
              className=" px-2 py-4"
              >
            <div>
 <div className=" max-w-[65%] h-[145%] w-full -top-16 left-0 right-0 mx-auto rounded-3xl absolute max-md:hidden">
 </div>
 <div className={`p-6 rounded-2xl mx-auto bg-white relative border`}>
   <div className=" flex justify-between items-center">
   <div>
     <img src={`${import.meta.env.VITE_BASE_URL}${review.profile}`} alt={review.name} className="w-10 h-10 rounded-full" />
     <h4 className="text-gray-800 text-sm whitespace-nowrap font-bold mt-3">{review.name}</h4>
     <p className="mt-0.5 text-xs text-gray-600">{review.position}</p>
   </div>
   <span><FormatQuote sx={{fontSize:"40px"}}/></span>
   </div>
   <div className="mt-4">
     <p className="text-gray-600 text-lg font-[300] line-clamp-3 leading-relaxed">{review.message}</p>
   </div>
 </div>
</div>

               </div>
               
               ))}
             </Slider>
           </div>
         </div>
         )}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
