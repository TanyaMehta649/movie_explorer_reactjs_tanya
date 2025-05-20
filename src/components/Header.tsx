
// import { FC, useState, useRef, useEffect } from "react";
// import { User } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import logo from '../assets/logo.png'
// import addmovie from '../assets/add-video.png'
// import { getSubscriptionStatus } from '../services/Subscription';


// const Header: FC = () => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [userData, setUserData] = useState<{ username?: string; email?: string; role?: string }>({});
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const [planDuration, setPlanDuration] = useState<string>('');
//   const navigate = useNavigate();
//  useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
        

//         const token = localStorage.getItem('token');
//         if (token) {
//           const data = await getSubscriptionStatus(token);
//           const plan = data; 
//            localStorage.setItem("data", data.subscription.plan_type); 


//           if (data.subscription?.created_at && data.subscription?.expires_at) {
//             const createdAt = new Date(data.subscription.created_at);
//             const expiresAt = new Date(data.subscription.expires_at);

//             if (!isNaN(createdAt.getTime()) && !isNaN(expiresAt.getTime())) {
//               const msInDay = 1000 * 60 * 60 * 24;
//               const diffDays = Math.round((expiresAt.getTime() - createdAt.getTime()) / msInDay);

//               let duration = `${diffDays} days`;
//               if (diffDays >= 27 && diffDays <= 31) {
//                 duration = '1 month';
//               } else if (diffDays >= 85 && diffDays <= 95) {
//                 duration = '3 months';
//               } else if (diffDays === 1) {
//                 duration = '1 day';
//               }

//               setPlanDuration(duration);
//               console.log('Plan duration set to:', duration);
//             } else {
//               setPlanDuration('Invalid plan dates');
//             }
//           } else {
//             setPlanDuration('No active plan');
//           }
//         } else {
//           setPlanDuration('Not logged in');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setPlanDuration('Error fetching plan');
//       }
//     };

//     fetchInitialData();
//   }, []);
//   useEffect(() => {
//     const loadUser = () => {
//       const storedUser = localStorage.getItem("user");
//       if (storedUser) {
//         try {
//           const parsed = JSON.parse(storedUser);
//           if (parsed && typeof parsed === "object") {
//             setUserData(parsed);
//           }
//         } catch (err) {
//           console.warn("Invalid user data in localStorage:", err);
//         }
//       }
//     };

//     loadUser();

//     const handleStorageChange = () => loadUser();
//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//   localStorage.removeItem('user');
//   localStorage.removeItem('token');

//   const userData = localStorage.getItem('user');
//   console.log('User data after logout:', userData);

//   navigate('/');
// };


//   const { username, email, role } = userData;

//   return (
//     <header className="bg-black text-white px-4 sm:px-6 py-4 flex items-center justify-between z-[100] relative flex-wrap sm:flex-nowrap gap-y-4">

//  <div className="h-10 w-10">
//   <a href="/dashboard">
//     <img
//       src={logo}
      
//       className="h-full w-full object-contain"
//     />
//   </a>
// </div>
// {planDuration && (
//   <div className="text-sm text-yellow-400 font-semibold mt-2 sm:mt-0 sm:ml-4">
//     Plan: {planDuration}
//   </div>
// )}



//   <nav className="flex-1 flex justify-center items-center flex-wrap gap-4 sm:gap-6 text-sm overflow-x-auto">
//     <Link to="/dashboard" className="text-white font-medium border-b border-white pb-0.5 whitespace-nowrap">Home</Link>
   
//     <Link to="/filterpanel" className="text-gray-400 hover:text-white whitespace-nowrap">Genre</Link>
//     {role !== "supervisor" && (
//     <Link to="/subscription" className="text-gray-400 hover:text-white whitespace-nowrap">
//       Subscription
//     </Link>
//   )}
//       {role==='supervisor' && (
//         <Link to='/addmovie' className="text-white hover:text-white whitespace-nowrap">+Movie</Link>
//       )}
//   </nav>
  



  
//   <div className="relative flex items-center space-x-4 z-50">
//     <div title="Profile">
//       <User
//         className="w-5 h-5 cursor-pointer"
//         onClick={() => setShowDropdown((prev) => !prev)}
//       />
//     </div>


//     <div
//       ref={dropdownRef}
//       className={`absolute top-12 right-0 sm:right-2 bg-black text-yellow rounded-xl shadow-xl p-4 w-64 max-w-[90vw] z-[1000] border border-yellow-500 transition-all duration-200
//         ${showDropdown ? "opacity-100 visible" : "opacity-0 invisible"}`}
//     >
//       <p className="font-semibold text-base sm:text-lg mb-1">
//         Welcome, {username || "User"}
//       </p>
//       <p className="text-sm text-yellow-300 break-words">
//         Email: {email || "user@example.com"}
//       </p>
//       <p className="text-sm text-yellow-300 mb-4 break-words">
//         Role: {role || "user"}
//       </p>
//       <button
//         onClick={handleLogout}
//         className="w-full bg-yellow-400 text-black font-semibold py-2 rounded hover:bg-yellow-300 transition"
//       >
//         Logout
//       </button>
//     </div>
//   </div>
// </header>

//   );
// };

// export default Header;
import { FC, useState, useRef, useEffect } from "react";
import { User, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import { getSubscriptionStatus } from '../services/Subscription';

const Header: FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState<{ username?: string; email?: string; role?: string }>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [planDuration, setPlanDuration] = useState<string>('');
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const data = await getSubscriptionStatus(token);
          localStorage.setItem("data", data.subscription.plan_type);
          if (data.subscription?.created_at && data.subscription?.expires_at) {
            const createdAt = new Date(data.subscription.created_at);
            const expiresAt = new Date(data.subscription.expires_at);
            const msInDay = 1000 * 60 * 60 * 24;
            const diffDays = Math.round((expiresAt.getTime() - createdAt.getTime()) / msInDay);
            let duration = `${diffDays} days`;
            if (diffDays >= 27 && diffDays <= 31) duration = '1 month';
            else if (diffDays >= 85 && diffDays <= 95) duration = '3 months';
            else if (diffDays === 1) duration = '1 day';
            setPlanDuration(duration);
          } else {
            setPlanDuration('No active plan');
          }
        } else {
          setPlanDuration('Not logged in');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setPlanDuration('Error fetching plan');
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          if (parsed && typeof parsed === "object") setUserData(parsed);
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
    navigate('/');
  };

  const { username, email, role } = userData;

  return (
    <header className="bg-black text-white px-4 sm:px-6 py-4 flex items-center justify-between z-[100] relative flex-wrap sm:flex-nowrap gap-y-4">
      <div className="flex items-center space-x-4">
        <a href="/dashboard">
          <img src={logo} className="h-10 w-10 object-contain" />
        </a>
        {planDuration && (
          <div className="text-sm text-yellow-400 font-semibold hidden sm:block">
            Plan: {planDuration}
          </div>
        )}
      </div>

      {/* Hamburger Button */}
      <button className="sm:hidden" onClick={() => setNavOpen(!navOpen)}>
        {navOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Navigation Links */}
      <nav className={`flex-col sm:flex-row sm:flex ${navOpen ? 'flex' : 'hidden'} sm:items-center flex w-full sm:w-auto justify-center items-start gap-4 sm:gap-6 text-sm sm:flex-wrap mt-4 sm:mt-0`}>
        <Link to="/dashboard" className="text-white font-medium border-b border-white pb-0.5 whitespace-nowrap">Home</Link>
        <Link to="/filterpanel" className="text-gray-400 hover:text-white whitespace-nowrap">Genre</Link>
        {role !== "supervisor" && (
          <Link to="/subscription" className="text-gray-400 hover:text-white whitespace-nowrap">Subscription</Link>
        )}
        {role === 'supervisor' && (
          <Link to='/addmovie' className="text-white hover:text-white whitespace-nowrap">+Movie</Link>
        )}
      </nav>

      {/* Profile and Dropdown */}
      <div className="relative flex items-center space-x-4 z-50">
        <div title="Profile">
          <User className="w-5 h-5 cursor-pointer" onClick={() => setShowDropdown(prev => !prev)} />
        </div>
        <div
          ref={dropdownRef}
          className={`absolute top-12 right-0 sm:right-2 bg-black text-yellow rounded-xl shadow-xl p-4 w-64 max-w-[90vw] z-[1000] border border-yellow-500 transition-all duration-200 ${showDropdown ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
          <p className="font-semibold text-base sm:text-lg mb-1">Welcome, {username || "User"}</p>
          <p className="text-sm text-yellow-300 break-words">Email: {email || "user@example.com"}</p>
          <p className="text-sm text-yellow-300 mb-4 break-words">Role: {role || "user"}</p>
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
