import { useState } from "react";
import { Link } from "react-router-dom";
import PopUp from "./PopUp";
import { Menu, X } from "lucide-react"; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-11/12 mx-auto bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2"
        >
          <span className="text-3xl text-orange-500 font-bold whitespace-nowrap">
            <i>Sugary</i>
          </span>
        </Link>

        {/* Toggle button for mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 hover:text-orange-600 focus:outline-none"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Login Button (desktop only) */}
        <div className="hidden md:block md:order-2">
          <Link
            to="/login"
            className="text-white bg-orange-500 hover:bg-orange-600 font-medium rounded-lg text-sm px-4 py-2"
          >
            Login
          </Link>
        </div>

        {/* Main Menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:flex md:items-center md:w-auto md:order-1 mt-4 md:mt-0`}
        >
          <ul className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 text-base font-medium">
            <li>
              <Link
                to="/"
                className="block px-3 py-2 rounded md:p-0 hover:text-orange-600"
              >
                Home
              </Link>
            </li>
            {/* <li>
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded md:p-0 hover:text-orange-600"
              >
                Dashboard
              </Link>
            </li> */}
            <li>
              <PopUp />
            </li>
            {/* Login Button (mobile) */}
            <li className="md:hidden">
              <Link
                to="/login"
                className="text-white bg-orange-500 hover:bg-orange-600 font-medium rounded-lg text-sm px-4 py-2"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
