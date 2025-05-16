
import React, { useEffect, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
const API_URL = 'https://movie-explorer-app.onrender.com/api/v1/movies';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [relatedMovies, setRelatedMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const userData = localStorage.getItem('user');
        const token = userData ? JSON.parse(userData).token : null;

        const response = await axios.get(
          `https://movie-explorer-app.onrender.com/api/v1/movies/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );

        setMovie(response.data);
      } catch (err) {
        console.error('Error fetching movie:', err);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    const fetchRelatedMovies = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        const allMovies = response.data.movies;
        if (movie) {
          const movieGenres = movie.genre.split(',').map((g: string) => g.trim().toLowerCase());
          const filtered = allMovies.filter(
            (m: any) =>
              m.id !== movie.id &&
              m.genre
                .split(',')
                .map((g: string) => g.trim().toLowerCase())
                .some((g: string) => movieGenres.includes(g))
          );
          setRelatedMovies(filtered);
        }
      } catch (err) {
        console.error('Error fetching related movies:', err);
      }
    };

    if (movie) fetchRelatedMovies();
  }, [movie]);

  if (!movie) return <div className="text-white p-4">Loading...</div>;

  return (
    <div
      className="min-h-screen p-4 md:p-12 bg-cover bg-center text-white"
      style={{
        backgroundImage: `url(${movie.banner_url})`,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backgroundBlendMode: 'normal',
      }}
    >
      <div className="backdrop-blur-md bg-white/10 rounded-2xl p-4 md:p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 w-full md:w-1/3">
            <img
              src={movie.poster_url}
              alt={movie.title}
              className="rounded-2xl w-full"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>

            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genre.split(',').map((genre: string, index: number) => (
                <span
                  key={index}
                  className="bg-white/20 border border-white/30 px-3 py-1 rounded-full text-lg text-white backdrop-blur-sm"
                >
                  {genre.trim()}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-lg text-gray-200">
              <div><span className="font-semibold">Release Year:</span> {movie.release_year}</div>
              <div><span className="font-semibold">Director:</span> {movie.director}</div>
              <div><span className="font-semibold">Duration:</span> {movie.duration} min</div>
              <div><span className="font-semibold">Rating:</span> {movie.rating} <span className="text-yellow-400">★</span></div>
            </div>

            <p className="text-gray-200 text-lg mb-8">{movie.description}</p>

{relatedMovies.length > 0 && (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Related Movies</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {relatedMovies.map((rel) => (
        <div
          key={rel.id}
          className="bg-white/10 w-full aspect-[2/3] rounded-xl overflow-hidden hover:scale-105 transition transform flex flex-col"
        >
          <img
            src={rel.poster_url}
            alt={rel.title}
            className="w-full h-[250px] object-cover"
          />
          <div className="p-2 flex-1 flex items-center justify-center text-center">
            <h3 className="text-md font-semibold text-white line-clamp-2">{rel.title}</h3>
          </div>
        </div>
      ))}
    </div>
  </div>
)}


          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
