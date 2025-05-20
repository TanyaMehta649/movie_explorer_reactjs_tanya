// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Movie, getAllMoviesPagination, searchByTitle } from '../services/MovieServices';

// import { Pencil, Trash2 } from 'lucide-react';
// import { deleteMovie } from '../services/MovieServices';
// import MovieItemCard from '../components/MovieItemCard';

// const genres = ['All', 'Romantic', 'Comedy', 'Horror', 'Action', 'Fantasy', 'Family'];

// const FilterPanel: React.FC = () => {
//   const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
//   const [selectedGenre, setSelectedGenre] = useState('All');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(true);

//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   const userRole = user?.role;
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFiltered = async () => {
//       setLoading(true);
//       const results = await getAllMoviesPagination(currentPage);
//       setFilteredMovies(results.movies);
//       setTotalPages(results.pagination.total_pages);
//       setLoading(false);
//     };

//     fetchFiltered();
//   }, [currentPage]);

//   useEffect(() => {
//     const fetchFilteredBySearchAndGenre = async () => {
//       setLoading(true);
//       const results = await searchByTitle(searchTerm, selectedGenre);
//       setFilteredMovies(results);
//       setLoading(false);
//     };

//     fetchFilteredBySearchAndGenre();
//   }, [searchTerm, selectedGenre]);

//   const handleEdit = (movie: Movie) => {
//     navigate('/addmovie', { state: { movieToEdit: movie } });
//   };

//   const handleDelete = async (movieId: number) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this movie?');
//     if (!confirmDelete) return;

//     try {
//       await deleteMovie(movieId);
//       const results = await getAllMoviesPagination(currentPage);
//       setFilteredMovies(results.movies);
//       setTotalPages(results.pagination.total_pages);
//     } catch (error) {
//       console.error('Error deleting movie:', error);
//       alert('Failed to delete movie. Please try again.');
//     }
//   };

//   return (
//     <div className="bg-black  text-white min-h-screen py-10 px-20">
    

 
//       <div className="flex justify-center mb-4">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search by title, director or lead..."
//           className="w-full max-w-md px-5 py-2 rounded-full text-sm text-white bg-transparent border border-yellow-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//         />
//       </div>

   
//       <div className="flex flex-wrap gap-3 justify-center my-6">
//         {genres.map((genre) => (
//           <button
//             key={genre}
//             onClick={() => setSelectedGenre(genre)}
//             className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-300 transform ${
//               selectedGenre === genre
//                 ? 'bg-yellow-400 text-black shadow-md scale-110'
//                 : 'border-white text-white hover:bg-white/10 hover:shadow-md hover:scale-105'
//             }`}
//           >
//             {genre}
//           </button>
//         ))}
//       </div>

    
//       {loading ? (
//         <div className="flex justify-center items-center h-40">
//           <div role="status"
//   aria-label="Loading" className="w-10 h-10  border-4 border-yellow-400 border-dashed rounded-full animate-spin"></div>
//         </div>
//       ) : (
//         <>
    
//           {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pb-6 grid-cols-height-small"> */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pb-6 force-grid-cols-1">

//             {filteredMovies.map((movie) => (
//               <MovieItemCard
//                 key={movie.id}
//                 movie={movie}
//                 userRole={userRole}
//                 userPlan={user?.plan || 'free'} 
//                 isLoggedIn={!!user} 
//                 onEdit={handleEdit}
//                 onDelete={handleDelete}
             
//               />
//             ))}
//           </div>

         
//           <div className="flex justify-center mt-6">
//             <button
//               onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
//               className="px-4 py-2 mx-2 bg-yellow-400 text-black rounded-full"
//             >
//               Previous
//             </button>
//             <span className="text-white">{`Page ${currentPage} of ${totalPages}`}</span>
//             <button
//               onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
//               className="px-4 py-2 mx-2 bg-yellow-400 text-black rounded-full"
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default FilterPanel;
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Movie, getAllMoviesPagination, searchByTitle } from '../services/MovieServices';

// import { deleteMovie } from '../services/MovieServices';
// import MovieItemCard from '../components/MovieItemCard';

// const genres = ['All', 'Romantic', 'Comedy', 'Horror', 'Action', 'Fantasy', 'Family'];

// const FilterPanel: React.FC = () => {
//   const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
//   const [selectedGenre, setSelectedGenre] = useState('All');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(true);

//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   const userRole = user?.role;
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFiltered = async () => {
//       setLoading(true);
//       const results = await getAllMoviesPagination(currentPage);
//       setFilteredMovies(results.movies);
//       setTotalPages(results.pagination.total_pages);
//       setLoading(false);
//     };

//     // Only fetch pagination if no search term and genre is All
//     if (searchTerm === '' && selectedGenre === 'All') {
//       fetchFiltered();
//     }
//   }, [currentPage, searchTerm, selectedGenre]);

//   useEffect(() => {
//     const fetchFilteredBySearchAndGenre = async () => {
//       setLoading(true);
//       const results = await searchByTitle(searchTerm, selectedGenre);
//       setFilteredMovies(results);
//       setTotalPages(1); // Show all filtered results in one page
//       setCurrentPage(1);
//       setLoading(false);
//     };

//     if (searchTerm !== '' || selectedGenre !== 'All') {
//       fetchFilteredBySearchAndGenre();
//     }
//   }, [searchTerm, selectedGenre]);

//   const handleEdit = (movie: Movie) => {
//     navigate('/addmovie', { state: { movieToEdit: movie } });
//   };

//   const handleDelete = async (movieId: number) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this movie?');
//     if (!confirmDelete) return;

//     try {
//       await deleteMovie(movieId);
//       if (searchTerm === '' && selectedGenre === 'All') {
//         const results = await getAllMoviesPagination(currentPage);
//         setFilteredMovies(results.movies);
//         setTotalPages(results.pagination.total_pages);
//       } else {
//         const results = await searchByTitle(searchTerm, selectedGenre);
//         setFilteredMovies(results);
//         setTotalPages(1);
//         setCurrentPage(1);
//       }
//     } catch (error) {
//       console.error('Error deleting movie:', error);
//       alert('Failed to delete movie. Please try again.');
//     }
//   };

//   return (
//     <div className="bg-black text-white min-h-screen py-10 px-20 flex flex-col">
//       <div className="flex justify-center mb-4">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search by title, director or lead..."
//           className="w-full max-w-md px-5 py-2 rounded-full text-sm text-white bg-transparent border border-yellow-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//         />
//       </div>

//       <div className="flex flex-wrap gap-3 justify-center my-6">
//         {genres.map((genre) => (
//           <button
//             key={genre}
//             onClick={() => setSelectedGenre(genre)}
//             className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-300 transform ${
//               selectedGenre === genre
//                 ? 'bg-yellow-400 text-black shadow-md scale-110'
//                 : 'border-white text-white hover:bg-white/10 hover:shadow-md hover:scale-105'
//             }`}
//           >
//             {genre}
//           </button>
//         ))}
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-40">
//           <div
//             role="status"
//             aria-label="Loading"
//             className="w-10 h-10 border-4 border-yellow-400 border-dashed rounded-full animate-spin"
//           />
//         </div>
//       ) : (
//         <>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pb-6 force-grid-cols-1 min-h-[400px]">
//             {filteredMovies.length > 0 ? (
//               filteredMovies.map((movie) => (
//                 <MovieItemCard
//                   key={movie.id}
//                   movie={movie}
//                   userRole={userRole}
//                   userPlan={user?.plan || 'free'}
//                   isLoggedIn={!!user}
//                   onEdit={handleEdit}
//                   onDelete={handleDelete}
//                 />
//               ))
//             ) : (
//               <div className="col-span-full text-center text-yellow-400 text-lg mt-10">
//                 No movies found.
//               </div>
//             )}
//           </div>

//           {/* Pagination only when not searching/filtering */}
//           {(searchTerm === '' && selectedGenre === 'All') && (
//             <div className="flex justify-center items-center space-x-2 mt-6">
//               <button
//                 onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
//                 disabled={currentPage === 1}
//                 className={`px-3 py-1 rounded-full ${
//                   currentPage === 1
//                     ? 'bg-yellow-200 text-black cursor-not-allowed'
//                     : 'bg-yellow-400 text-black hover:bg-yellow-500'
//                 }`}
//               >
//                 &laquo; Prev
//               </button>

//               {[...Array(totalPages)].map((_, index) => {
//                 const pageNum = index + 1;
//                 return (
//                   <button
//                     key={pageNum}
//                     onClick={() => setCurrentPage(pageNum)}
//                     className={`px-3 py-1 rounded-full ${
//                       currentPage === pageNum
//                         ? 'bg-yellow-600 text-black font-bold shadow-md'
//                         : 'bg-yellow-400 text-black hover:bg-yellow-500'
//                     }`}
//                   >
//                     {pageNum}
//                   </button>
//                 );
//               })}

//               <button
//                 onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className={`px-3 py-1 rounded-full ${
//                   currentPage === totalPages
//                     ? 'bg-yellow-200 text-black cursor-not-allowed'
//                     : 'bg-yellow-400 text-black hover:bg-yellow-500'
//                 }`}
//               >
//                 Next &raquo;
//               </button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default FilterPanel;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie, getAllMoviesPagination, searchByTitle } from '../services/MovieServices';

import { deleteMovie } from '../services/MovieServices';
import MovieItemCard from '../components/MovieItemCard';

const genres = ['All', 'Romance', 'Comedy', 'Horror', 'Action', 'Fantasy', 'Family'];

const FilterPanel: React.FC = () => {
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userRole = user?.role;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFiltered = async () => {
      setLoading(true);
      const results = await getAllMoviesPagination(currentPage);
      setFilteredMovies(results.movies);
      setTotalPages(results.pagination.total_pages);
      setLoading(false);
    };

    if (searchTerm === '' && selectedGenre === 'All') {
      fetchFiltered();
    }
  }, [currentPage, searchTerm, selectedGenre]);

  useEffect(() => {
    const fetchFilteredBySearchAndGenre = async () => {
      setLoading(true);
      const results = await searchByTitle(searchTerm, selectedGenre);
      setFilteredMovies(results);
      setTotalPages(1); // Show all filtered results in one page
      setCurrentPage(1);
      setLoading(false);
    };

    if (searchTerm !== '' || selectedGenre !== 'All') {
      fetchFilteredBySearchAndGenre();
    }
  }, [searchTerm, selectedGenre]);

  const handleEdit = (movie: Movie) => {
    navigate('/addmovie', { state: { movieToEdit: movie } });
  };

  const handleDelete = async (movieId: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this movie?');
    if (!confirmDelete) return;

    try {
      await deleteMovie(movieId);
      if (searchTerm === '' && selectedGenre === 'All') {
        const results = await getAllMoviesPagination(currentPage);
        setFilteredMovies(results.movies);
        setTotalPages(results.pagination.total_pages);
      } else {
        const results = await searchByTitle(searchTerm, selectedGenre);
        setFilteredMovies(results);
        setTotalPages(1);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
      alert('Failed to delete movie. Please try again.');
    }
  };

  return (
    <div className="bg-black text-white min-h-screen py-10 px-6 sm:px-10 md:px-20 flex flex-col items-center max-w-screen-lg mx-auto">
      {/* <div className="w-full flex justify-center mb-6"> */}
        {/* <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title, director or lead..."
          className="w-full max-w-md px-6 py-3 rounded-full text-sm sm:text-base text-white bg-transparent border border-yellow-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        /> */}
        
      {/* </div> */}
      <div className="flex items-center w-full max-w-md bg-black rounded-full shadow-md px-4 py-2 border-2 border-yellow-400">
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search by Movie Name"
    className="flex-grow bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm px-2"
  />
  <button className="ml-2 bg-yellow-400 rounded-full p-2 hover:bg-yellow-500 transition">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-black"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-4.35-4.35M10.5 17a6.5 6.5 0 100-13 6.5 6.5 0 000 13z"
      />
    </svg>
  </button>
</div>


      <div className="flex flex-wrap gap-4 justify-center my-6 w-full">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-5 py-2 rounded-full text-sm sm:text-base font-semibold border transition-all duration-300 transform ${
              selectedGenre === genre
                ? 'bg-yellow-400 text-black shadow-md scale-110'
                : 'border-2 border-white text-white hover:bg-white/10 hover:shadow-md hover:scale-105'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48 w-full">
          <div
            role="status"
            aria-label="Loading"
            className="w-12 h-12 border-4 border-yellow-400 border-dashed rounded-full animate-spin"
          />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pb-8 min-h-[450px] w-full">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <MovieItemCard
                  key={movie.id}
                  movie={movie}
                  userRole={userRole}
                  userPlan={user?.plan || 'free'}
                  isLoggedIn={!!user}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-yellow-400 text-lg mt-12">
                No movies found.
              </div>
            )}
          </div>

          {(searchTerm === '' && selectedGenre === 'All') && (
            <div className="flex justify-center items-center space-x-3 mt-6">
              <button
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-full text-sm sm:text-base font-semibold transition ${
                  currentPage === 1
                    ? 'bg-yellow-200 text-black cursor-not-allowed'
                    : 'bg-yellow-400 text-black hover:bg-yellow-500'
                }`}
              >
                &laquo; Prev
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-4 py-2 rounded-full text-sm sm:text-base font-semibold transition ${
                      currentPage === pageNum
                        ? 'bg-yellow-600 text-black font-bold shadow-md'
                        : 'bg-yellow-400 text-black hover:bg-yellow-500'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-full text-sm sm:text-base font-semibold transition ${
                  currentPage === totalPages
                    ? 'bg-yellow-200 text-black cursor-not-allowed'
                    : 'bg-yellow-400 text-black hover:bg-yellow-500'
                }`}
              >
                Next &raquo;
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FilterPanel;
