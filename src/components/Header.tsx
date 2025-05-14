
import { FC, useState, useRef, useEffect } from "react";
import { User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Header: FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState<{ username?: string; email?: string; role?: string }>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          if (parsed && typeof parsed === "object") {
            setUserData(parsed);
          }
        } catch (err) {
          console.warn("Invalid user data in localStorage:", err);
        }
      }
    };

    loadUser();

    const handleStorageChange = () => loadUser();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');

  const userData = localStorage.getItem('user');
  console.log('User data after logout:', userData);

  navigate('/');
};


  const { username, email, role } = userData;

  return (
    <header className="bg-black text-white px-4 sm:px-6 py-4 flex items-center justify-between z-[100] relative flex-wrap sm:flex-nowrap gap-y-4">

  <div className="text-sm font-medium whitespace-nowrap">
    {username ? `Welcome, ${username}` : "Welcome to Movie Explorer"}
  </div>


  <nav className="flex-1 flex justify-center items-center flex-wrap gap-4 sm:gap-6 text-sm overflow-x-auto">
    <Link to="/" className="text-white font-medium border-b border-white pb-0.5 whitespace-nowrap">Home</Link>
    <Link to="/aboutus" className="text-gray-400 hover:text-white whitespace-nowrap">About Us</Link>
    <Link to="/filterpanel" className="text-gray-400 hover:text-white whitespace-nowrap">Genre</Link>
    {role === "supervisor" && (
      <Link to="/addmovie" className="text-yellow-400 hover:text-white whitespace-nowrap">Add Movie</Link>
    )}
    <Link to="/footer" className="text-gray-400 hover:text-white whitespace-nowrap">Contact Us</Link>
  </nav>

  
  <div className="relative flex items-center space-x-4 z-50">
    <div title="Profile">
      <User
        className="w-5 h-5 cursor-pointer"
        onClick={() => setShowDropdown((prev) => !prev)}
      />
    </div>

    <div
      ref={dropdownRef}
      className={`absolute top-12 right-0 sm:right-2 bg-black text-yellow rounded-xl shadow-xl p-4 w-64 max-w-[90vw] z-[1000] border border-yellow-500 transition-all duration-200
        ${showDropdown ? "opacity-100 visible" : "opacity-0 invisible"}`}
    >
      <p className="font-semibold text-base sm:text-lg mb-1">
        Welcome, {username || "User"}
      </p>
      <p className="text-sm text-yellow-300 break-words">
        Email: {email || "user@example.com"}
      </p>
      <p className="text-sm text-yellow-300 mb-4 break-words">
        Role: {role || "user"}
      </p>
      <button
        onClick={handleLogout}
        className="w-full bg-yellow-400 text-black font-semibold py-2 rounded hover:bg-yellow-300 transition"
      >
        Logout
      </button>
    </div>
  </div>
</header>

  );
};

export default Header;
