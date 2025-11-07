import { useState } from 'react';
import {UserCircleIcon, BriefcaseIcon, LinkIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { Create_Review } from '../redux/action/reviewAction';

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    message: ''
  });
  const dispatch = useDispatch();
  const {revcreateloading} = useSelector((state)=>state.Review)

  const [profile ,setProfile] = useState("");

  const handlechange = (e) => {
    const file = e.target.files[0];
    setProfile(file);
  }
const handleSubmit = async(e) => {
    e.preventDefault();
    const newData = new FormData();
    newData.append("name",formData.name)
    newData.append("position",formData.position)
    newData.append("message",formData.message)
    newData.append("profile",profile)
    dispatch(Create_Review(newData));
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mt-20 mx-auto bg-white rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:shadow-3xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Share Your Experience
          </h2>
          <p className="mt-2 text-gray-500">We value your honest feedback</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="">
            {/* Name Field */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative">
                <UserCircleIcon className="h-6 w-6 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder=" Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="">
            {/* Position Field */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative">
                <BriefcaseIcon className="h-6 w-6 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="position"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder=" Position like Co-Founder..."
                  value={formData.position}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Profile URL Field */}
            <div className="relative group mt-4">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative">
                <LinkIcon className="h-6 w-6 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="file"
                  name="profile"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder=""
                  onChange={handlechange}
                />
              </div>
            </div>
          </div>


          {/* Message Field */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative">
              <textarea
                name="message"
                required
                rows="4"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none"
                placeholder="Share your detailed experience..."
                onChange={handleInputChange}
              ></textarea>
              <div className="absolute bottom-2 right-3 text-gray-400 text-sm">
                {formData.message.length}/500
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-[1.01] active:scale-95"
          >
             {revcreateloading ? (
    <>
      Submit Review
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18px"
        fill="#fff"
        className="ml-2 inline animate-spin"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
          data-original="#000000"
        />
      </svg>
    </>
  ) : (
    "Submit Review"
  )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;

