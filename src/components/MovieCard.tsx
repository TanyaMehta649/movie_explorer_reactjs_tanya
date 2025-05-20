
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllMoviesPagination, deleteMovie, Movie } from '../services/MovieServices';
import MovieItemCard from '../components/MovieItemCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

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
          modules={[Navigation, FreeMode, Mousewheel]}
          navigation
          spaceBetween={20}
          grabCursor={true}
          simulateTouch={true}
          allowTouchMove={true}
          freeMode={true}
          mousewheel={true}
          cssMode={false}
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
                  <span className="number-label absolute left-0 top-0  px-1 text-sm rounded">
                    {index + 1}
                  </span>
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
      {renderSection('Recommended For You', recommended, 5)}
      {renderSection('Featured Series', featuredSeries, 6)}
      {renderSection('Just Added', justAdded, 5, true)}
    </div>
  );
};

export default MovieCard;
