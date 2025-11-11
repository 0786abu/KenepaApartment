import {
  Bed,
  Shower,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Fetch_Properties } from "../redux/action/propertyAction";
import { useEffect } from "react";
import Loader from "./Loader";

const Properties = () => {
  const { properties, propertyloading } = useSelector(
    (state) => state.Property
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      Fetch_Properties()
    );
  }, [
    dispatch,
  ]);
  return (
    <div>
      <div className="wrapper py-20 md:py-28 bg-[#EFEBE7]">
        <div className="grid-layout-wrapper max-w-6xl mx-auto p-2 gap-4 mt-16">

          <div className="sec-2 w-full">
            {propertyloading ? (
              <Loader />
            ) : properties?.length === 0 ? (
              <div className=" flex justify-center items-center h-[80vh]">
                <div className="flex flex-col items-center gap-2">
                  <p className="text-center text-xl font-[700]">
                    No Properties found.
                  </p>
                </div>
              </div>
            ) : (
              <div className="wrapper">
                <div className="cards grid grid-cols-1 min-[430px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {properties?.map((p, index) => {
                    return (
                      <div
                        key={index}
                        className="card bg-white group shadow-md mx-auto"
                      >
                        <div className="img relative overflow-hidden">
                          <Link to={`/detail/${p._id}`}>
                            <img
                              src={`${import.meta.env.VITE_BASE_URL}${
                                p.images[0]
                              }`}
                              className=" w-full h-[220px] lg:h-[250px] object-cover group-hover:scale-110 duration-300 transition-all"
                              alt=""
                            />
                          </Link>
                          <div className=" absolute bg-[#8FA282] text-white px-3 text-sm py-1 rounded-full top-2 left-2">
                            <span>
                              {p.propertyDuration === "Short-Term"
                                ? "3 Days"
                                : p.propertyDuration === "Mid-Term"
                                ? "1-Month"
                                : "1-Year"}
                            </span>
                          </div>
                        </div>
                        <div className=" p-2 lg:p-4">
                          <p className=" text-xl font-[300] text-[#A1B491]">
                            For Rent
                          </p>
                          <Link to={`/detail/${p._id}`}>
                            <h2 className="text-lg lg:text-xl font-[700] mt-2 hover:text-[#A1B491] line-clamp-1 cursor-pointer">
                              {p.title}
                            </h2>
                          </Link>
                          <p className=" space-x-4 font-[350] text-lg font-sans">
                            <span className=" text-gray-600">
                              {p.rooms} <Bed sx={{ color: "#A1B491" }} />
                            </span>
                            <span className=" text-gray-600">
                              {p.bathrooms} <Shower sx={{ color: "#A1B491" }} />
                            </span>
                          </p>
                          <hr className=" my-2" />
                          <p className="text-[#8FA282] font-[400] text-lg md:text-xl">
                            ${p.price}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
