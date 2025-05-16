
import React, { useEffect, useState } from 'react';
import { getAllMovies, Movie } from '../services/MovieServices';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { getSubscriptionStatus } from '../services/Subscription';

const LandingPage: React.FC = () => {
  const [initialMovies, setInitialMovies] = useState<Movie[]>([]); 
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<number>>(new Set());
const [subscription, setSubscription] = useState<any>(null);
const [planDuration, setPlanDuration] = useState<string>('');

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        if (initialMovies.length === 0) {
          const movies = await getAllMovies();
          setInitialMovies(movies);
        }

        const token = localStorage.getItem('token');
        if (token) {
          const data = await getSubscriptionStatus(token);
          const plan = data; 
           localStorage.setItem("data", data.subscription.plan_type); 


          if (data.subscription?.created_at && data.subscription?.expires_at) {
            const createdAt = new Date(data.subscription.created_at);
            const expiresAt = new Date(data.subscription.expires_at);

            if (!isNaN(createdAt.getTime()) && !isNaN(expiresAt.getTime())) {
              const msInDay = 1000 * 60 * 60 * 24;
              const diffDays = Math.round((expiresAt.getTime() - createdAt.getTime()) / msInDay);

              let duration = `${diffDays} days`;
              if (diffDays >= 27 && diffDays <= 31) {
                duration = '1 month';
              } else if (diffDays >= 85 && diffDays <= 95) {
                duration = '3 months';
              } else if (diffDays === 1) {
                duration = '1 day';
              }

              setPlanDuration(duration);
              console.log('Plan duration set to:', duration);
            } else {
              setPlanDuration('Invalid plan dates');
            }
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

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + initialMovies.length) % initialMovies.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % initialMovies.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [initialMovies.length]);

  useEffect(() => {
    setAnimating(true);
    const timeout = setTimeout(() => setAnimating(false), 1000);
    return () => clearTimeout(timeout);
  }, [current]);

  const getSlideStyle = (index: number) => {
    const pos = (index - current + initialMovies.length) % initialMovies.length;
    switch (pos) {
      case 0:
        return 'left-0 w-full h-full z-20 rounded-none';
      case 1:
        return 'left-1/2 w-52 h-80 translate-y-1/2 z-10';
      case 2:
        return 'left-[calc(50%+220px)] w-52 h-80 translate-y-1/2 z-0';
      default:
        return 'opacity-0 pointer-events-none';
    }
  };

  const toggleDescription = (movieId: number) => {
    setExpandedDescriptions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(movieId)) {
        newSet.delete(movieId);
      } else {
        newSet.add(movieId);
      }
      return newSet;
    });
  };

  if (initialMovies.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
    {planDuration && (
      <div style={{
        position: 'static',
        top: 10,
        left: 260,
        backgroundColor: 'black',
        color: 'white',
        padding: '10px 20px',
        fontWeight: 'bold',
        zIndex: 9999,
        borderRadius: '8px',
        fontSize: '16px',
      }}>
        Plan: {planDuration}
      </div>
    )}

    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      

      <div className="relative w-[100%] max-w-[2100px] h-[690px] bg-black shadow-2xl overflow-hidden">
        <div className="absolute inset-0">
          {initialMovies.map((movie, index) => (
            <div
              key={movie.id}
              className={`absolute top-1/2 transform -translate-y-1/2 transition-all duration-500 ease-in-out bg-cover bg-center rounded-2xl shadow-2xl ${getSlideStyle(index)} ${animating && index === current ? 'animate-slidein' : ''}`}
              style={{ backgroundImage: `url(${movie.banner_url})` }}
            >
              {index === current && (
                <div className="absolute top-30 left-4 sm:top-32 sm:left-24 text-white w-[90%] sm:w-80 space-y-2 sm:space-y-4">
                  <h2 className="text-lg sm:text-xl md:text-3xl font-bold uppercase animate-slideUp">{movie.title}</h2>
                  <p className={`${expandedDescriptions.has(movie.id) ? '' : 'line-clamp-3'} animate-fadein delay-200 text-xs sm:text-sm md:text-base`}>
                    {movie.description}
                  </p>
                  {movie.description.length > 200 && (
                    <button
                      onClick={() => toggleDescription(movie.id)}
                      className="px-4 py-2 bg-white text-black rounded shadow hover:bg-gray-200 transition"
                    >
                      {expandedDescriptions.has(movie.id) ? 'See Less' : 'See More'}
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="absolute top-120 right-60 sm:left-10 md:right-16 z-30 flex gap-4">
          <button
            onClick={prevSlide}
            className="p-2 text-xl bg-white rounded-full shadow hover:scale-110 transition"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 text-xl bg-white rounded-full shadow hover:scale-110 transition"
          >
            <FaArrowRight />
          </button>
        </div>

        <div className="absolute bottom-16 sm:bottom-20 left-[74%] -translate-x-1/2 z-30 flex gap-4">
          {[ 
            (current - 1 + initialMovies.length) % initialMovies.length, 
            current,                                      
            (current + 1) % initialMovies.length                  
          ].map((index) => (
            <img
              key={initialMovies[index].id}
              src={initialMovies[index].poster_url}
              alt={initialMovies[index].title}
              onClick={() => setCurrent(index)}
              className={`w-40 h-50 rounded-lg object-cover cursor-pointer shadow transition-all duration-300 border-2 ${index === current ? 'border-white ' : 'hover:opacity-100'}`}
            />
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default LandingPage;
