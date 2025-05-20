
import { FC, useState, useRef, useEffect } from "react";
import { User, Menu, X, Bell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import { getSubscriptionStatus } from '../services/Subscription';
import { onMessage, messaging } from "../Notifications/firebase";

const Header: FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState<{ username?: string; email?: string; role?: string }>({});
  const [planInfo, setPlanInfo] = useState<{ type?: string; duration?: string }>({});
  const [navOpen, setNavOpen] = useState(false);
  const [notifications, setNotifications] = useState<{ title: string; body: string }[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const isLoggedIn = !!userData?.email;

  useEffect(() => {
    const fetchSubscription = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setPlanInfo({ type: 'Not available', duration: '' });
        return;
      }

      try {
        const data = await getSubscriptionStatus(token);
        const planType = data.subscription?.plan_type || 'Not available';

        let duration = '';
        if (data.subscription?.created_at && data.subscription?.expires_at) {
          const createdAt = new Date(data.subscription.created_at);
          const expiresAt = new Date(data.subscription.expires_at);
          const diff = Math.round((expiresAt.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
          if (diff === 1) duration = '1 day';
          else if (diff >= 27 && diff <= 31) duration = '1 month';
          else if (diff >= 85 && diff <= 95) duration = '3 months';
          else duration = `${diff} days`;
        }

        setPlanInfo({ type: planType, duration });
      } catch (err) {
        console.error('Subscription error:', err);
        setPlanInfo({ type: 'Error', duration: '' });
      }
    };

    fetchSubscription();
  }, []);

  useEffect(() => {
    const loadUser = () => {
      try {
        const stored = localStorage.getItem('user');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && typeof parsed === 'object') {
            setUserData(parsed);
          }
        }
      } catch (err) {
        console.warn('Invalid user data:', err);
      }
    };

    loadUser();
    window.addEventListener('storage', loadUser);
    return () => window.removeEventListener('storage', loadUser);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }

      if (
        notificationRef.current && !notificationRef.current.contains(e.target as Node)
      ) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Foreground notification in Header:", payload);
      const { title, body } = payload.notification || {};
      if (title && body) {
        setNotifications((prev) => [...prev, { title, body }]);
        setUnreadCount((prev) => prev + 1);
      }
    });

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/');
  };

  const { username, email, role } = userData;
  const { type: planType, duration } = planInfo;

  return (
    <header className="bg-black text-white px-4 sm:px-6 py-4 flex items-center justify-between z-[100] relative flex-wrap sm:flex-nowrap gap-y-4">
      <div className="flex items-center space-x-4">
        <a href="/dashboard">
          <img src={logo} className="h-10 w-10 object-contain" />
        </a>
      </div>

      {/* Hamburger */}
      <button className="sm:hidden" onClick={() => setNavOpen(!navOpen)}>
        {navOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Links */}
      <nav className={`flex-col sm:flex-row sm:flex ${navOpen ? 'flex' : 'hidden'} sm:items-center flex w-full sm:w-auto justify-center items-start gap-4 sm:gap-6 text-sm sm:flex-wrap mt-4 sm:mt-0`}>
        <Link to="/dashboard" className="text-white font-medium border-b border-white pb-0.5 whitespace-nowrap">Home</Link>
        <Link to="/filterpanel" className="text-gray-400 hover:text-white whitespace-nowrap">Genre</Link>
        {role !== "supervisor" && isLoggedIn && (
          <Link to="/subscription" className="text-gray-400 hover:text-white whitespace-nowrap">Subscription</Link>
        )}
        {role === 'supervisor' && isLoggedIn && (
          <Link to='/addmovie' className="text-white hover:text-white whitespace-nowrap">+Movie</Link>
        )}
      </nav>

      {/* Profile + Notifications */}
      <div className="relative flex items-center space-x-10 z-50">
        {/* Notification Bell */}
        <div
          title="Notifications"
          className="relative cursor-pointer"
          onClick={() => {
            setShowNotifications((prev) => !prev);
            setUnreadCount(0);
          }}
        >
          <Bell className="w-5 h-5 text-white hover:text-yellow-400 transition" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {unreadCount}
            </span>
          )}
        </div>

        {/* Notification Dropdown */}
        {showNotifications && (
          <div
            ref={notificationRef}
            className="absolute top-12 right-14 sm:right-16 w-80 max-w-[90vw] bg-gray-900 border border-yellow-400 rounded-lg shadow-lg z-[1000]"
          >
            <div className="p-3 font-semibold border-b border-yellow-400 text-yellow-300">
              Notifications
            </div>
            {notifications.length === 0 ? (
              <div className="p-4 text-sm text-gray-400">No notifications</div>
            ) : (
              notifications.map((n, index) => (
                <div
                  key={index}
                  className="p-4 border-b border-gray-700 hover:bg-gray-800 transition"
                >
                  <p className="font-semibold text-white">{n.title}</p>
                  <p className="text-sm text-gray-300">{n.body}</p>
                </div>
              ))
            )}
          </div>
        )}

        {/* Profile Icon */}
        <div title="Profile">
          <User className="w-5 h-5 cursor-pointer" onClick={() => setShowDropdown(prev => !prev)} />
        </div>

        {/* Profile Dropdown */}
        <div
          ref={dropdownRef}
          className={`absolute top-12 right-0 sm:right-2 bg-black text-yellow rounded-xl shadow-xl p-4 w-64 max-w-[90vw] z-[1000] border border-yellow-500 transition-all duration-200 ${showDropdown ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
          {isLoggedIn ? (
            <>
              <p className="font-semibold text-base sm:text-lg mb-1">Welcome, {username || "User"}</p>
              <p className="text-sm text-yellow-300 break-words">Email: {email}</p>
              <p className="text-sm text-yellow-300 break-words">Role: {role}</p>
              <p className="text-sm text-yellow-300 mb-4 break-words">
                Plan: {planType} {duration ? `(${duration})` : ''}
              </p>
              <button
                onClick={handleLogout}
                className="w-full bg-yellow-400 text-black font-semibold py-2 rounded hover:bg-yellow-300 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <p className="font-semibold text-base sm:text-lg mb-2">Please login</p>
              <p className="text-sm text-yellow-300 break-words">Role: Guest</p>
              <p className="text-sm text-yellow-300 mb-4 break-words">Plan: Not available</p>
              <button
                onClick={handleLogin}
                className="w-full bg-yellow-400 text-black font-semibold py-2 rounded hover:bg-yellow-300 transition"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
