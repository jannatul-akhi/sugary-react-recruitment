import { Link, useNavigate } from "react-router-dom";
import MaterialsList from "../components/MaterialsList";
import TopNavbar from "../components/TopNavbar";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("accessToken");

    if (!storedUser || !token) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="">
      <TopNavbar user={user} handleLogout={handleLogout} />
      <div className="min-h-screen bg-orange-50 ">
        {/* Navbar */}
        <nav className="bg-white px-6 py-4  ">
          <div className="flex items-center justify-between w-11/12 mx-auto">
            {/* Logo */}
            <div className="text-lg font-semibold text-orange-600">
              <Link to="/">
                <span className="text-3xl text-orange-500 font-bold">
                  <i>Sugary</i>
                </span>
              </Link>
            </div>

            {/* Mobile toggle button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-orange-600 focus:outline-none"
              >
                {menuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-7 ms-44 font-medium text-lg text-black">
              <li>
                <a href="/" className="hover:text-orange-600 transition text-base font-medium">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-600 transition text-base font-medium">
                  Dashboard
                </a>
              </li>
            </ul>

            {/* User Info & Logout (Desktop) */}
            <div className="hidden md:flex items-center gap-4">
              <div className="text-sm text-black font-medium">
                {user.FullName} ({user.Email})
              </div>
              <button
                onClick={handleLogout}
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-1.5 px-4 rounded shadow-sm transition"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden mt-4 space-y-3">
              <a
                href="/"
                className="block px-2 py-2 rounded hover:bg-orange-100 text-2xl font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="block px-2 py-2 rounded hover:bg-orange-100 text-base font-medium"
              >
                Dashboard
              </a>
              <div className="border-t pt-3 flex flex-col gap-2">
                <div className="text-sm text-black font-medium">
                  {user.FullName} ({user.Email})
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-1 px-3 rounded shadow-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto mt-8 px-4 pb-8">
          <MaterialsList />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
