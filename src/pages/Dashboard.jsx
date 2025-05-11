import { Link, useNavigate } from "react-router-dom";
import MaterialsList from "../components/MaterialsList";
import TopNavbar from "../components/TopNavbar";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; // Optional: npm install lucide-react

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div>
      <TopNavbar user={user} handleLogout={handleLogout} />
      <div className="min-h-screen bg-orange-50">
        {/* Navbar */}
        <nav className="bg-white px-6 py-4 border-b border-orange-100 shadow">
          <div className="flex items-center justify-between">
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
            <ul className="hidden md:flex space-x-4 ms-24 font-medium text-lg text-black">
              <li>
                <a href="/" className="hover:text-orange-600 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-600 transition">
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
                className="block px-2 py-2 rounded hover:bg-orange-100"
              >
                Home
              </a>
              <a
                href="#"
                className="block px-2 py-2 rounded hover:bg-orange-100"
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
        <div className="max-w-6xl mx-auto mt-8 px-4">
          <MaterialsList />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
