import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Movie, getAllMoviesPagination, searchByTitle } from '../services/MovieServices';

import { Pencil, Trash2 } from 'lucide-react';
import { deleteMovie } from '../services/MovieServices';
import MovieItemCard from '../components/MovieItemCard';

const genres = ['All', 'Romantic', 'Comedy', 'Horror', 'Action', 'Fantasy', 'Family'];

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

    fetchFiltered();
  }, [currentPage]);

  useEffect(() => {
    const fetchFilteredBySearchAndGenre = async () => {
      setLoading(true);
      const results = await searchByTitle(searchTerm, selectedGenre);
      setFilteredMovies(results);
      setLoading(false);
    };

    fetchFilteredBySearchAndGenre();
  }, [searchTerm, selectedGenre]);

  const handleEdit = (movie: Movie) => {
    navigate('/addmovie', { state: { movieToEdit: movie } });
  };

  const handleDelete = async (movieId: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this movie?');
    if (!confirmDelete) return;

    try {
      await deleteMovie(movieId);
      const results = await getAllMoviesPagination(currentPage);
      setFilteredMovies(results.movies);
      setTotalPages(results.pagination.total_pages);
    } catch (error) {
      console.error('Error deleting movie:', error);
      alert('Failed to delete movie. Please try again.');
    }
  };

  return (
    <div className="bg-black  text-white min-h-screen py-10 px-20">
    

 
      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title, director or lead..."
          className="w-full max-w-md px-5 py-2 rounded-full text-sm text-white bg-transparent border border-yellow-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

   
      <div className="flex flex-wrap gap-3 justify-center my-6">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-300 transform ${
              selectedGenre === genre
                ? 'bg-yellow-400 text-black shadow-md scale-110'
                : 'border-white text-white hover:bg-white/10 hover:shadow-md hover:scale-105'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

    
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div role="status"
  aria-label="Loading" className="w-10 h-10  border-4 border-yellow-400 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
    
          {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pb-6 grid-cols-height-small"> */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pb-6 force-grid-cols-1">

            {filteredMovies.map((movie) => (
              <MovieItemCard
                key={movie.id}
                movie={movie}
                userRole={userRole}
                userPlan={user?.plan || 'free'} 
                isLoggedIn={!!user} 
                onEdit={handleEdit}
                onDelete={handleDelete}
             
              />
            ))}
          </div>

         
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              className="px-4 py-2 mx-2 bg-yellow-400 text-black rounded-full"
            >
              Previous
            </button>
            <span className="text-white">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
              className="px-4 py-2 mx-2 bg-yellow-400 text-black rounded-full"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FilterPanel;
