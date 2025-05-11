import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PopUp = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate()

  const isLoggedIn = localStorage.getItem("accessToken");

  return (
    <div className="flex items-center justify-center">
      {isLoggedIn ? (
        <button
          onClick={() => navigate("/dashboard")}
          className="block py-2 px-3 md:p-0 rounded-sm md:bg-transparent md:hover:text-orange-600 cursor-pointer"
        >
          Dashboard
        </button>
      ) : (
        <button
          onClick={() => setShowPopup(true)}
          className="block py-2 px-3 md:p-0 rounded-sm md:bg-transparent md:hover:text-orange-600 cursor-pointer"
        >
          Dashboard
        </button>
      )}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm text-center">
           
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
              aria-label="Close popup"
            >
              &times;
            </button>

           
            <p className="text-gray-700 mb-4">Login first!</p>
            <Link
              to="/login"
              onClick={() => setShowPopup(false)}
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </div>
    
  );
};

export default PopUp;
