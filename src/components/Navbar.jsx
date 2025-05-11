import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PopUp from "./PopUp";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white  border-gray-200">
      <div className="w-11/12 mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl text-orange-500 font-bold whitespace-nowrap">
              <i>Sugary</i>
            </span>
          </Link>
        </div>

        {/* Center: Main Menu (desktop only) */}
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex items-center gap-8 text-base font-medium">
            <li>
              <Link to="/" className="hover:text-orange-600">Home</Link>
            </li>
            <li>
              <PopUp />
            </li>
          </ul>
        </div>

        {/* Right: Login/Logout button (desktop only) */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-white bg-orange-500 hover:bg-orange-600 font-medium rounded-lg text-sm px-4 py-2"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-white bg-orange-500 hover:bg-orange-600 font-medium rounded-lg text-sm px-4 py-2"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 hover:text-orange-600 focus:outline-none"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-4 mt-2 text-base font-medium">
            <li>
              <Link
                to="/"
                className="block px-2 py-2 rounded hover:bg-orange-100"
              >
                Home
              </Link>
            </li>
            <li>
              <PopUp />
            </li>
            <li>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-white bg-orange-500 hover:bg-orange-600 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block text-white bg-orange-500 hover:bg-orange-600 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
