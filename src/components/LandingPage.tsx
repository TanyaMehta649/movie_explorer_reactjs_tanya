
import React, { useEffect, useState } from 'react';
import { getAllMovies, Movie } from '../services/MovieServices';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const LandingPage: React.FC = () => {
  const [initialMovies, setInitialMovies] = useState<Movie[]>([]);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        if (initialMovies.length === 0) {
          const movies = await getAllMovies();
          setInitialMovies(movies);
        }
      } catch (error) {
        console.error('Failed to fetch movies:', error);
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
                <div
                  key={current}
                  className="absolute top-30 left-4 sm:top-32 sm:left-24 text-white w-[90%] sm:w-80 space-y-2 sm:space-y-4"
                >
                  <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-lg sm:text-xl md:text-3xl font-bold uppercase"
                  >
                    {movie.title}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                    className={`${expandedDescriptions.has(movie.id) ? '' : 'line-clamp-3'} text-xs sm:text-xs md:text-base`}
                  >
                    {movie.description}
                  </motion.p>

                  {movie.description.length > 200 && (
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.4 }}
                      onClick={() => toggleDescription(movie.id)}
                      className="px-4 py-2 bg-white text-black rounded shadow hover:bg-gray-200 transition sm:text-xs"
                    >
                      {expandedDescriptions.has(movie.id) ? 'See Less' : 'See More'}
                    </motion.button>
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
            (current + 1) % initialMovies.length,
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
  );
};

export default LandingPage;
