
import React, { useEffect, useState } from 'react';
import { addMovie, updateMovie } from '../services/MovieServices';
import { useLocation, useNavigate } from 'react-router-dom';

interface MovieFormData {
  title: string;
  genre: string;
  release_year: string;
  rating: string;
  director: string;
  duration: string;
  description: string;
  premium: boolean;
  poster?: File | null;
  banner?: File | null;
}

const AddMovie: React.FC = () => {
  const location = useLocation();
  const movieToEdit = location.state?.movieToEdit;
  const isEditing = !!movieToEdit;

  const [formData, setFormData] = useState<MovieFormData>({
    title: '',
    genre: '',
    release_year: '',
    rating: '',
    director: '',
    duration: '',
    description: '',
    premium: false,
    poster: null,
    banner: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (movieToEdit) {
      setFormData({
        title: movieToEdit.title,
        genre: movieToEdit.genre,
        release_year: movieToEdit.release_year.toString(),
        rating: movieToEdit.rating.toString(),
        director: movieToEdit.director,
        duration: movieToEdit.duration,
        description: movieToEdit.description,
        premium: movieToEdit.plan === 'premium',
        poster: null,
        banner: null,
      });
    }
  }, [movieToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        const formKey = `movie[${key}]`;
        if (typeof value === 'boolean') {
          data.append(formKey, value ? 'true' : 'false');
        } else {
          data.append(formKey, value as string | Blob);
        }
      }
    });

    try {
      let response;
      if (isEditing) {
        response = await updateMovie(movieToEdit.id, data);
        console.log('Movie updated successfully:', response);
      } else {
        response = await addMovie(data);
        console.log('Movie added successfully:', response);
      }
      navigate('/filterpanel');
    } catch (error) {
      console.error('Error submitting movie:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-black-800 p-8 rounded-lg border-2 border-[yellow] shadow-lg space-y-5"
      >
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">
          {isEditing ? 'Edit Movie' : 'Add New Movie'}
        </h2>

        {["title", "genre", "release_year", "rating", "director", "duration"].map((field) => (
          <div key={field}>
            <label className="block mb-1 text-sm font-medium">
              {field.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
            </label>
            <input
              type="text"
              name={field}
              value={(formData as any)[field]}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400"
              required
            />
          </div>
        ))}

        <div>
          <label className="block mb-1 text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400"
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Premium</label>
          <select
            name="premium"
            value={formData.premium.toString()}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                premium: e.target.value === 'true',
              }))
            }
            className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400"
            required
          >
            <option value="false">false</option>
            <option value="true">true</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Upload Poster</label>
          <input
            type="file"
            name="poster"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-300 file:bg-yellow-400 file:text-black file:px-4 file:py-1 file:rounded file:font-semibold"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Upload Banner</label>
          <input
            type="file"
            name="banner"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-300 file:bg-yellow-400 file:text-black file:px-4 file:py-1 file:rounded file:font-semibold"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 text-black py-2 rounded font-semibold hover:bg-yellow-300 transition"
        >
          {isEditing ? 'Update Movie' : 'Add Movie'}
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
