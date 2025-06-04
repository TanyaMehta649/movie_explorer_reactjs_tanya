
import { FC, useState, useRef, useEffect } from "react";
import { User, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import { getSubscriptionStatus } from '../services/Subscription';
import { onMessage, messaging } from "../Notifications/firebase";
import { useTranslation } from 'react-i18next';

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
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const isLoggedIn = !!userData?.email;

  useEffect(() => {
    const fetchSubscription = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setPlanInfo({ type: t('not_available'), duration: '' });
        return;
      }

      try {
        const data = await getSubscriptionStatus(token);
        const planType = data.subscription?.plan_type || t('not_available');

        let duration = '';
        if (data.subscription?.created_at && data.subscription?.expires_at) {
          const createdAt = new Date(data.subscription.created_at);
          const expiresAt = new Date(data.subscription.expires_at);
          const diff = Math.round((expiresAt.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
          if (diff === 1) duration = t('one_day');
          else if (diff >= 27 && diff <= 31) duration = t('one_month');
          else if (diff >= 85 && diff <= 95) duration = t('three_months');
          else duration = `${diff} ${t('days')}`;
        }

        setPlanInfo({ type: planType, duration });
      } catch (err) {
        console.error('Subscription error:', err);
        setPlanInfo({ type: 'Error', duration: '' });
      }
    };

    fetchSubscription();
  }, [t]);

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

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'hi' : 'en');
  };

  const { username, email, role } = userData;
  const { type: planType, duration } = planInfo;

  return (
    <header className="bg-black text-white px-4 sm:px-6 py-3 flex items-center justify-between z-[100] relative flex-wrap sm:flex-nowrap gap-y-4">
      <div className="flex items-center space-x-4">
        <a href="/dashboard">
          <img src={logo} className="h-10 w-10 object-contain" alt="logo" />
        </a>
      </div>

      <button className="sm:hidden" onClick={() => setNavOpen(!navOpen)}>
        {navOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <nav className={`flex-col sm:flex-row sm:flex ${navOpen ? 'flex' : 'hidden'} sm:items-center flex w-full sm:w-auto justify-center items-start gap-4 sm:gap-6 text-sm sm:flex-wrap mt-4 sm:mt-0 `}>
        <Link to="/dashboard" className="text-white font-normal text-base sm:text-lg font-sans-serif border-white pb-0.5 whitespace-nowrap">
          {t('home')}
        </Link>

        <Link to="/filterpanel" className="text-gray-400 font-normal text-base sm:text-lg font-sans-serif hover:text-white whitespace-nowrap">
          {t('genre')}
        </Link>

        {role !== "supervisor" && isLoggedIn && (
          <Link to="/subscription" className="text-gray-400 font-normal text-base sm:text-lg font-sans-serif hover:text-white whitespace-nowrap">
            {t('subscription')}
          </Link>
        )}

        {role === 'supervisor' && isLoggedIn && (
          <Link to='/addmovie' className="text-gray-400 font-normal text-base sm:text-lg font-sans-serif hover:text-white whitespace-nowrap">
            +Movie
          </Link>
        )}
      </nav>

      <div className="relative flex items-center space-x-6 z-50">
      
        <button
  onClick={toggleLanguage}
  className="flex items-center bg-blue-100 rounded-full p-1 gap-1"
>
  <span
    className={`flex items-center justify-center rounded-full w-7 h-7 text-sm font-semibold transition-all ${
      i18n.language === 'en'
        ? 'bg-blue-700 text-white'
        : 'text-blue-700'
    }`}
  >
    En
  </span>
  <span
    className={`flex items-center justify-center rounded-full w-7 h-7 text-sm font-semibold transition-all ${
      i18n.language === 'hi'
        ? 'bg-blue-700 text-white'
        : 'text-blue-700'
    }`}
  >
    हिं
  </span>
</button>

     
        <User className="w-5 h-5 cursor-pointer" onClick={() => setShowDropdown(prev => !prev)} />

        <div
          ref={dropdownRef}
          className={`absolute top-12 right-0 sm:right-2 bg-black text-yellow rounded-xl shadow-xl p-4 w-64 max-w-[90vw] z-[1000] border border-yellow-500 transition-all duration-200 ${showDropdown ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
          {isLoggedIn ? (
            <>
              <p className="font-semibold text-base sm:text-lg mb-1">{t('welcome')}, {username || "User"}</p>
              <p className="text-sm text-yellow-300 break-words">{t('email')}: {email}</p>
              <p className="text-sm text-yellow-300 break-words">{t('role')}: {role}</p>
              <p className="text-sm text-yellow-300 mb-4 break-words">
                {t('plan')}: {planType} {duration ? `(${duration})` : ''}
              </p>
              <button
                onClick={handleLogout}
                className="w-full bg-yellow-400 text-black font-semibold py-2 rounded hover:bg-yellow-300 transition"
              >
                {t('logout')}
              </button>
            </>
          ) : (
            <>
              <p className="font-semibold text-base sm:text-lg mb-2">{t('please_login')}</p>
              <p className="text-sm text-yellow-300 break-words">{t('role')}: Guest</p>
              <p className="text-sm text-yellow-300 mb-4 break-words">{t('plan')}: {t('not_available')}</p>
              <button
                onClick={handleLogin}
                className="w-full bg-yellow-400 text-black font-semibold py-2 rounded hover:bg-yellow-300 transition"
              >
                {t('login')}
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
