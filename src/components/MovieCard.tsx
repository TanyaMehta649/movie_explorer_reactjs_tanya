import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { getAllMovies, Movie } from '../services/MovieServices';
import { deleteMovie } from '../services/MovieServices';
import MovieItemCard from '../components/MovieItemCard';

const MovieCard: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [recommended, setRecommended] = useState<Movie[]>([]);
  const [featuredSeries, setFeaturedSeries] = useState<Movie[]>([]);
  const [justAdded, setJustAdded] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [userPlan, setUserPlan] = useState<string | null>(null); 
  const navigate = useNavigate();

useEffect(() => {
  const userData = localStorage.getItem("user");
  if (userData) {
    const parsed = JSON.parse(userData);
    setRole(parsed.role);
    setUserPlan(parsed.plan);
    console.log('User Plan:', parsed.plan);
  }
}, []); 
 useEffect(() => {
    const fetchData = async () => {
      try {
        const allMovies = await getAllMovies();
        setMovies(allMovies);
        setRecommended(allMovies.filter(movie => 
          ['Action', 'Adventure'].some(genre => movie.genre.includes(genre))
        ));

        setFeaturedSeries(allMovies.filter((movie) => movie.rating >= 9));
        setJustAdded(allMovies.filter((movie) => movie.release_year >= 2021));
      } catch (error) {
        console.error('Error loading movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this movie?');
  
    if (confirmDelete) {
      try {
        await deleteMovie(id);
        setMovies((prev) => prev.filter((m) => m.id !== id));
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

const renderSection = (title: string, sectionMovies: Movie[], cardWidth: string = 'w-40') => {
  const currentUser = JSON.parse(localStorage.getItem("user") || '{}'); 

  return (
    <div className="mb-8 px-4">
      <h2 className="text-white text-lg font-semibold mb-3">{title}</h2>
      <div className="flex flex-col w-full sm:flex-row sm:overflow-x-auto sm:no-scrollbar sm:flex-nowrap sm:gap-4 sm:justify-start items-center gap-4">
        {sectionMovies.map((movie) => (
          <MovieItemCard
            key={movie.id}
            movie={movie}
            userRole={currentUser.role}
            userPlan={currentUser.plan}  
            isLoggedIn={!!localStorage.getItem("user")}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

         

  if (loading) {
    return <div className="text-white text-center py-20 text-xl">Loading movies...</div>;
  }

  return (
    <div className="bg-black text-white py-10 px-6">
      {renderSection('Recommended For You', recommended)}
      {renderSection('Featured Series', featuredSeries, 'w-50')}
      {renderSection('Just Added', justAdded)}
    </div>
  );
};

export default MovieCard;
