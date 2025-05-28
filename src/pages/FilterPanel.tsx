
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Movie, getAllMoviesPagination, searchByTitle } from '../services/MovieServices';
import { deleteMovie } from '../services/MovieServices';
import MovieItemCard from '../components/MovieItemCard';

const genres = ['All', 'Romance', 'Comedy', 'Horror', 'Action', 'Fantasy', 'Family'];

const FilterPanel: React.FC = () => {
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userRole = user?.role;
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedGenre, setSelectedGenre] = useState<string>(searchParams.get('genre') || 'All');
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('search') || '');
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get('page')) || 1
  );
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    const params: any = {};

    if (selectedGenre && selectedGenre !== 'All') params.genre = selectedGenre;
    if (searchTerm) params.search = searchTerm;
    if (currentPage && currentPage !== 1) params.page = currentPage.toString();

    setSearchParams(params);
  }, [selectedGenre, searchTerm, currentPage, setSearchParams]);

  useEffect(() => {
    const fetchFiltered = async () => {
      setLoading(true);
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
      setLoading(false);
    };

    fetchFiltered();
  }, [currentPage, searchTerm, selectedGenre]);

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
      {/* <div className="flex items-center w-full max-w-md bg-black rounded-full shadow-md px-4 py-2 border-2 border-yellow-400"> */}
      <div className="flex items-center w-full max-w-xl bg-black rounded-full shadow-md px-4 py-2 border-2 border-yellow-400">

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
  className={`cursor-pointer px-5 py-2 rounded-full text-sm sm:text-base font-semibold border transition-all duration-300 transform ${
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
          {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pb-8 min-h-[450px] w-full"> */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-8 min-h-[450px] w-full">

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
          {searchTerm === '' && selectedGenre === 'All' && (
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
