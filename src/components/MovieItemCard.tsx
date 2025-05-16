import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2, Crown } from 'lucide-react';
import { Movie } from '../services/MovieServices';
import toast from 'react-hot-toast';
interface Props {
  movie: Movie;
  userRole: string | null;
  userPlan: string | null;
  isLoggedIn: boolean;
  onEdit: (movie: Movie) => void;
  onDelete: (id: number) => void;
}
const MovieItemCard: React.FC<Props> = ({
  movie,
  userRole,
  userPlan,
  isLoggedIn,
  onEdit,
  onDelete
}) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
     console.log('User plan:', userPlan); 
  if (!isLoggedIn) {
    toast.error('Please login to view movie details!');
    navigate('/');
    return;
  }
  if (userRole === 'supervisor') {
    navigate(`/movie/${movie.id}`);
    return;
  }
  if (!movie.premium) {
    navigate(`/movie/${movie.id}`);
    return;
  }
  if (movie.premium && userPlan === 'premium') {
    navigate(`/movie/${movie.id}`);
    return;
  }
  toast.error('Please subscribe to a premium plan to watch this movie!');
  navigate('/dashboard');
  window.scrollTo(0, document.body.scrollHeight / 1.6);
};
return (
    <div className="w-40  flex flex-col">
      <div className="relative w-full aspect-[2/3] cursor-pointer" onClick={handleCardClick}>
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="w-full h-full  rounded-lg border-2 border-transparent hover:border-yellow-400 transition duration-300"
        />
{movie.premium === true && userPlan !== 'premium' && userRole !== 'supervisor' && (
          <div className="absolute top-2 left-2 bg-yellow-400 p-1 rounded-full ">
            <Crown size={16} className="text-white"  />
          </div>
        )}
        {userRole === 'supervisor' && (
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(movie);
              }}
              className="bg-yellow-400 text-black p-1 rounded-full hover:bg-yellow-300"
              title="Edit"
            >
              <Pencil size={16} />
            </button>
            <button data-testid="delete-btn-1"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(movie.id);
              }}
              className="bg-red-500 text-white p-1 rounded-full hover:bg-red-400"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
      <div className="mt-2 text-center text-white text-sm font-semibold line-clamp-2">
        {movie.title}
      </div>
    </div>
  );
};
export default MovieItemCard;
