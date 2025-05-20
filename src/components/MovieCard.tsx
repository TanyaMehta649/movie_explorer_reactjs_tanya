// import React, { useEffect, useState } from 'react';
// import {  useNavigate } from 'react-router-dom';
// import { getAllMovies, Movie } from '../services/MovieServices';
// import { deleteMovie } from '../services/MovieServices';
// import MovieItemCard from '../components/MovieItemCard';

// const MovieCard: React.FC = () => {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [recommended, setRecommended] = useState<Movie[]>([]);
//   const [featuredSeries, setFeaturedSeries] = useState<Movie[]>([]);
//   const [justAdded, setJustAdded] = useState<Movie[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [role, setRole] = useState<string | null>(null);
//   const [userPlan, setUserPlan] = useState<string | null>(null); 
//   const navigate = useNavigate();

// useEffect(() => {
//   const userData = localStorage.getItem("user");
//   if (userData) {
//     const parsed = JSON.parse(userData);
//     setRole(parsed.role);
//     setUserPlan(parsed.plan);
//     console.log('User Plan:', parsed.plan);
//   }
// }, []); 
//  useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const allMovies = await getAllMovies();
//         setMovies(allMovies);
//         setRecommended(allMovies.filter(movie => 
//           ['Action', 'Adventure'].some(genre => movie.genre.includes(genre))
//         ));

//         setFeaturedSeries(allMovies.filter((movie) => movie.rating >= 9));
//         setJustAdded(allMovies.filter((movie) => movie.release_year >= 2020));
//       } catch (error) {
//         console.error('Error loading movies:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleDelete = async (id: number) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this movie?');
  
//     if (confirmDelete) {
//       try {
//         await deleteMovie(id);
//         setMovies((prev) => prev.filter((m) => m.id !== id));
//         alert('Movie deleted successfully!');
//       } catch (error) {
//         console.error('Error deleting movie:', error);
//         alert('Failed to delete the movie. Please try again.');
//       }
//     }
//   };

//   const handleEdit = (movie: Movie) => {
//     navigate('/addmovie', { state: { movieToEdit: movie } });
//   };

// const renderSection = (title: string, sectionMovies: Movie[], cardWidth: string = 'w-40') => {
//   const currentUser = JSON.parse(localStorage.getItem("user") || '{}'); 

//   return (
//     <div className="mb-8 px-4">
//       <h2 className="text-white text-lg font-semibold mb-3">{title}</h2>
//       <div className="flex flex-col w-full sm:flex-row sm:overflow-x-auto sm:no-scrollbar sm:flex-nowrap sm:gap-4 sm:justify-start items-center gap-4">
//         {sectionMovies.map((movie) => (
//           <MovieItemCard
//             key={movie.id}
//             movie={movie}
//             userRole={currentUser.role}
//             userPlan={currentUser.plan}  
//             isLoggedIn={!!localStorage.getItem("user")}
//             onEdit={handleEdit}
//             onDelete={handleDelete}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

         

//   if (loading) {
//     return <div className="text-white text-center py-20 text-xl">Loading movies...</div>;
//   }

//   return (
//     <div className="bg-black text-white py-10 px-6">
//       {renderSection('Recommended For You', recommended)}
//       {renderSection('Featured Series', featuredSeries, 'w-50')}
//       {renderSection('Just Added', justAdded)}
//     </div>
//   );
// };

// export default MovieCard;
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getAllMovies, deleteMovie, Movie } from '../services/MovieServices';
// import MovieItemCard from '../components/MovieItemCard';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';

// const MovieCard: React.FC = () => {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [recommended, setRecommended] = useState<Movie[]>([]);
//   const [featuredSeries, setFeaturedSeries] = useState<Movie[]>([]);
//   const [justAdded, setJustAdded] = useState<Movie[]>([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userData = localStorage.getItem('user');
//     if (userData) {
//       const parsed = JSON.parse(userData);
//       console.log('User Plan:', parsed.plan);
//     }
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const allMovies = await getAllMovies();
//         setMovies(allMovies);
//         setRecommended(
//           allMovies.filter((movie) =>
//             ['Action', 'Adventure','Romance'].some((genre) => movie.genre.includes(genre))
//           )
//         );
//         setFeaturedSeries(allMovies.filter((movie) => movie.rating >= 9));
//         setJustAdded(allMovies.filter((movie) => movie.release_year >= 2021));
//       } catch (error) {
//         console.error('Error loading movies:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleDelete = async (id: number) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this movie?');
//     if (confirmDelete) {
//       try {
//         await deleteMovie(id);
//         setMovies((prev) => prev.filter((m) => m.id !== id));
//         alert('Movie deleted successfully!');
//       } catch (error) {
//         console.error('Error deleting movie:', error);
//         alert('Failed to delete the movie. Please try again.');
//       }
//     }
//   };

//   const handleEdit = (movie: Movie) => {
//     navigate('/addmovie', { state: { movieToEdit: movie } });
//   };

//   const renderSection = (
//     title: string,
//     sectionMovies: Movie[],
//     slidesPerView: number = 5
//   ) => {
//     const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

//     if (!sectionMovies.length) return null;

//     return (
//       <div className="mb-12 px-4">
//         <h2 className="text-white text-lg font-semibold mb-4">{title}</h2>
//         <Swiper
//           modules={[Navigation]}
//           navigation
//           spaceBetween={20}
//           slidesPerView={Math.min(sectionMovies.length, slidesPerView)}
//           breakpoints={{
//             320: { slidesPerView: 1.3 },
//             480: { slidesPerView: 2 },
//             640: { slidesPerView: 2.5 },
//             768: { slidesPerView: 3.5 },
//             1024: { slidesPerView },
//           }}
//           className="movie-swiper"
//         >
//           {sectionMovies.map((movie) => (
//             <SwiperSlide key={movie.id}>
//               <div className="w-40 sm:w-48 md:w-52">
//                 <MovieItemCard
//                   movie={movie}
//                   userRole={currentUser.role}
//                   userPlan={currentUser.plan}
//                   isLoggedIn={!!localStorage.getItem('user')}
//                   onEdit={handleEdit}
//                   onDelete={handleDelete}
//                 />
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="text-white text-center py-20 text-xl">
//         Loading movies...
//       </div>
//     );
//   }

//   return (
//     <div className="bg-black text-white py-10 px-6">
//       {renderSection('Recommended For You', recommended, 5)}
//       {renderSection('Featured Series', featuredSeries, 6)}
//       {renderSection('Just Added', justAdded, 5)}
//     </div>
//   );
// };

// export default MovieCard;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllMoviesPagination, deleteMovie, Movie } from '../services/MovieServices';
import MovieItemCard from '../components/MovieItemCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const MovieCard: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [recommended, setRecommended] = useState<Movie[]>([]);
  const [featuredSeries, setFeaturedSeries] = useState<Movie[]>([]);
  const [justAdded, setJustAdded] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      console.log('User Plan:', parsed.plan);
    }
  }, []);

  useEffect(() => {
    fetchMovies(page);
  }, []);

  const fetchMovies = async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await getAllMoviesPagination(pageNum);
      const updatedMovies = pageNum === 1 ? res.movies : [...movies, ...res.movies];

      setMovies(updatedMovies);
      setRecommended(
        updatedMovies.filter((movie) =>
          ['Action', 'Adventure', 'Romance'].some((genre) =>
            movie.genre.includes(genre)
          )
        )
      );
      setFeaturedSeries(updatedMovies.filter((movie) => movie.rating >= 3));
      setJustAdded(updatedMovies.filter((movie) => movie.release_year >= 2021));
      setTotalPages(res.pagination.total_pages);
      setPage(res.pagination.current_page);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (page < totalPages) {
      fetchMovies(page + 1);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this movie?');
    if (confirmDelete) {
      try {
        await deleteMovie(id);
        const updatedMovies = movies.filter((m) => m.id !== id);
        setMovies(updatedMovies);
        setRecommended(
          updatedMovies.filter((movie) =>
            ['Action', 'Adventure', 'Romance'].some((genre) =>
              movie.genre.includes(genre)
            )
          )
        );
        setFeaturedSeries(updatedMovies.filter((movie) => movie.rating >= 9));
        setJustAdded(updatedMovies.filter((movie) => movie.release_year >= 2021));
        alert('Movie deleted successfully!');
      } catch (error) {
        console.error('Error deleting movie:', error);
        alert('Failed to delete the movie. Please try again.');
      }
    }
  };

  const handleEdit = (movie: Movie) => {
    navigate('/addmovie', { state: { movieToEdit: movie } });
  };

  // const renderSection = (
  //   title: string,
  //   sectionMovies: Movie[],
  //   slidesPerView: number = 5
  // ) => {
  //   const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  //   if (!sectionMovies.length) return null;

  //   return (
  //     <div className="mb-12 px-4">
  //       <h2 className="text-white text-lg font-semibold mb-4">{title}</h2>
  //       <Swiper
  //         modules={[Navigation]}
  //         navigation
  //         spaceBetween={20}
  //         slidesPerView={Math.min(sectionMovies.length, slidesPerView)}
  //         breakpoints={{
  //           320: { slidesPerView: 1.3 },
  //           480: { slidesPerView: 2 },
  //           640: { slidesPerView: 2.5 },
  //           768: { slidesPerView: 3.5 },
  //           1024: { slidesPerView },
  //         }}
  //         className="movie-swiper"
  //       >
  //         {sectionMovies.map((movie) => (
  //           <SwiperSlide key={movie.id}>
  //             <div className="w-40 sm:w-48 md:w-52">
  //               <MovieItemCard
  //                 movie={movie}
  //                 userRole={currentUser.role}
  //                 userPlan={currentUser.plan}
  //                 isLoggedIn={!!localStorage.getItem('user')}
  //                 onEdit={handleEdit}
  //                 onDelete={handleDelete}
  //               />
  //             </div>
  //           </SwiperSlide>
  //         ))}
  //       </Swiper>
  //     </div>
  //   );
  // };
const renderSection = (
  title: string,
  sectionMovies: Movie[],
  slidesPerView: number = 5,
  showNumbering: boolean = false
) => {
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  if (!sectionMovies.length) return null;

  return (
    <div className="mb-12 px-4">
      <h2 className="text-white text-lg font-semibold mb-4">{title}</h2>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={Math.min(sectionMovies.length, slidesPerView)}
        breakpoints={{
          320: { slidesPerView: 1.3 },
          480: { slidesPerView: 2 },
          640: { slidesPerView: 2.5 },
          768: { slidesPerView: 3.5 },
          1024: { slidesPerView },
        }}
        className="movie-swiper"
      >
        {sectionMovies.map((movie, index) => (
          <SwiperSlide key={movie.id}>
            <div className="relative w-40 sm:w-48 md:w-52">
              {showNumbering && (
               <span className="number-label">{index + 1}</span>

              )}
              <MovieItemCard
                movie={movie}
                userRole={currentUser.role}
                userPlan={currentUser.plan}
                isLoggedIn={!!localStorage.getItem('user')}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

  if (loading && movies.length === 0) {
    return (
      <div className="text-white text-center py-20 text-xl">
        Loading movies...
      </div>
    );
  }

  return (
    <div className="bg-black text-white py-10 px-6">
      {/* {renderSection('Recommended For You', recommended, 5)}
      {renderSection('Featured Series', featuredSeries, 6)}
      {renderSection('Just Added', justAdded, 5)} */}
      {renderSection('Recommended For You', recommended, 5)}
{renderSection('Featured Series', featuredSeries, 6)}
{renderSection('Just Added', justAdded, 5, true)}  


      {/* {page < totalPages && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Load More Movies
          </button>
        </div>
      )} */}
    </div>
  );
};

export default MovieCard;
