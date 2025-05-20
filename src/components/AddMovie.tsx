
// import React, { useEffect, useState } from 'react';
// import { addMovie, updateMovie } from '../services/MovieServices';
// import { useLocation, useNavigate } from 'react-router-dom';

// interface MovieFormData {
//   title: string;
//   genre: string;
//   release_year: string;
//   rating: string;
//   director: string;
//   duration: string;
//   description: string;
//   premium: boolean;
//   poster?: File | null;
//   banner?: File | null;
// }

// const AddMovie: React.FC = () => {
//   const location = useLocation();
//   const movieToEdit = location.state?.movieToEdit;
//   const isEditing = !!movieToEdit;

//   const [formData, setFormData] = useState<MovieFormData>({
//     title: '',
//     genre: '',
//     release_year: '',
//     rating: '',
//     director: '',
//     duration: '',
//     description: '',
//     premium: false,
//     poster: null,
//     banner: null,
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (movieToEdit) {
//       setFormData({
//         title: movieToEdit.title,
//         genre: movieToEdit.genre,
//         release_year: movieToEdit.release_year.toString(),
//         rating: movieToEdit.rating.toString(),
//         director: movieToEdit.director,
//         duration: movieToEdit.duration,
//         description: movieToEdit.description,
//         premium: movieToEdit.plan === 'premium',
//         poster: null,
//         banner: null,
//       });
//     }
//   }, [movieToEdit]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value, type } = e.target;

//     if (type === 'checkbox') {
//       const checked = (e.target as HTMLInputElement).checked;
//       setFormData((prev) => ({
//         ...prev,
//         [name]: checked,
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, files } = e.target;
//     if (files && files.length > 0) {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: files[0],
//       }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (value !== null && value !== undefined) {
//         const formKey = `movie[${key}]`;
//         if (typeof value === 'boolean') {
//           data.append(formKey, value ? 'true' : 'false');
//         } else {
//           data.append(formKey, value as string | Blob);
//         }
//       }
//     });

//     try {
//       let response;
//       if (isEditing) {
//         response = await updateMovie(movieToEdit.id, data);
//         console.log('Movie updated successfully:', response);
//       } else {
//         response = await addMovie(data);
//         console.log('Movie added successfully:', response);
//       }
//       navigate('/filterpanel');
//     } catch (error) {
//       console.error('Error submitting movie:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white flex justify-center items-center py-10">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-xl bg-black-800 p-8 rounded-lg border-2 border-[yellow] shadow-lg space-y-5"
//       >
//         <h2 className="text-2xl font-bold text-yellow-400 mb-4">
//           {isEditing ? 'Edit Movie' : 'Add New Movie'}
//         </h2>

//         {["title", "release_year", "rating", "director", "duration (in minutes)"].map((field) => (
//   <div key={field}>
//     <label className="block mb-1 text-sm font-medium">
//       {field.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
//     </label>
//     <input
//       type="text"
//       name={field}
//       value={(formData as any)[field]}
//       onChange={handleChange}
//       className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400"
//       required
//     />
//   </div>
// ))}

// <div>
//   <label className="block mb-1 text-sm font-medium">Genre</label>
//   <select
//   name="genre"
//   value={formData.genre}
//   onChange={handleChange}
//   className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600  text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
//   required
// >
//   <option value="">Select Genre</option>
//   <option value="Action">Action</option>
//   <option value="Comedy">Comedy</option>
//   <option value="Horror">Horror</option>
//   <option value="Romance">Romance</option>
//   <option value="Adventure">Adventure</option>
// </select>

// </div>


//         <div>
//           <label className="block mb-1 text-sm font-medium">Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             rows={3}
//             className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400"
//             required
//           ></textarea>
//         </div>

//         <div>
//           <label className="block mb-1 text-sm font-medium">Premium</label>
//           <select
//             name="premium"
//             value={formData.premium.toString()}
//             onChange={(e) =>
//               setFormData((prev) => ({
//                 ...prev,
//                 premium: e.target.value === 'true',
//               }))
//             }
//             className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400"
//             required
//           >
//             <option value="false">false</option>
//             <option value="true">true</option>
//           </select>
//         </div>

//         <div>
//           <label className="block mb-1 text-sm font-medium">Upload Poster</label>
//           <input
//             type="file"
//             name="poster"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="block w-full text-sm text-gray-300 file:bg-yellow-400 file:text-black file:px-4 file:py-1 file:rounded file:font-semibold"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 text-sm font-medium">Upload Banner</label>
//           <input
//             type="file"
//             name="banner"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="block w-full text-sm text-gray-300 file:bg-yellow-400 file:text-black file:px-4 file:py-1 file:rounded file:font-semibold"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-yellow-400 text-black py-2 rounded font-semibold hover:bg-yellow-300 transition"
//         >
//           {isEditing ? 'Update Movie' : 'Add Movie'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddMovie;































































// import React, { useEffect, useState } from 'react';
// import { addMovie, updateMovie } from '../services/MovieServices';
// import { useLocation, useNavigate } from 'react-router-dom';

// interface MovieFormData {
//   title: string;
//   genre: string;
//   release_year: string;
//   rating: string;
//   director: string;
//   duration: string;
//   description: string;
//   premium: boolean;
//   poster?: File | null;
//   banner?: File | null;
// }

// const AddMovie: React.FC = () => {
//   const location = useLocation();
//   const movieToEdit = location.state?.movieToEdit;
//   const isEditing = !!movieToEdit;

//   const [formData, setFormData] = useState<MovieFormData>({
//     title: '',
//     genre: '',
//     release_year: '',
//     rating: '',
//     director: '',
//     duration: '',
//     description: '',
//     premium: false,
//     poster: null,
//     banner: null,
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (movieToEdit) {
//       setFormData({
//         title: movieToEdit.title,
//         genre: movieToEdit.genre,
//         release_year: movieToEdit.release_year.toString(),
//         rating: movieToEdit.rating.toString(),
//         director: movieToEdit.director,
//         duration: movieToEdit.duration,
//         description: movieToEdit.description,
//         premium: movieToEdit.plan === 'premium',
//         poster: null,
//         banner: null,
//       });
//     }
//   }, [movieToEdit]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value, type } = e.target;

//     if (type === 'checkbox') {
//       const checked = (e.target as HTMLInputElement).checked;
//       setFormData((prev) => ({
//         ...prev,
//         [name]: checked,
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, files } = e.target;
//     if (files && files.length > 0) {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: files[0],
//       }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (value !== null && value !== undefined) {
//         const formKey = `movie[${key}]`;
//         if (typeof value === 'boolean') {
//           data.append(formKey, value ? 'true' : 'false');
//         } else {
//           data.append(formKey, value as string | Blob);
//         }
//       }
//     });

//     try {
//       let response;
//       if (isEditing) {
//         response = await updateMovie(movieToEdit.id, data);
//         console.log('Movie updated successfully:', response);
//       } else {
//         response = await addMovie(data);
//         console.log('Movie added successfully:', response);
//       }
//       navigate('/filterpanel');
//     } catch (error) {
//       console.error('Error submitting movie:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white flex justify-center items-center py-10">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-xl bg-black-800 p-8 rounded-lg border-2 border-[yellow] shadow-lg space-y-5"
//       >
//         <h2 className="text-2xl font-bold text-yellow-400 mb-4">
//           {isEditing ? 'Edit Movie' : 'Add New Movie'}
//         </h2>

//        {["title", "release_year", "rating", "duration(in mins)"].map((field) => (
//   <div key={field}>
//     <label className="block mb-1 text-sm font-medium">
//       {field.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
//     </label>

//     {field === "rating" ? (
//       <select
//         name="rating"
//         value={formData.rating}
//         onChange={handleChange}
//         className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
//         required
//       >
//         <option value="">Select Rating</option>
//         {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
//           <option key={num} value={num.toString()}>
//             {num}
//           </option>
//         ))}
//       </select>
//     ) : (
//       <input
//         type="text"
//         name={field}
//         value={(formData as any)[field]}
//         onChange={handleChange}
//         className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400"
//         required
//       />
//     )}
//   </div>
// ))}

       

//         {/* Genre Dropdown */}
//         <div>
//           <label className="block mb-1 text-sm font-medium">Genre</label>
//           <select
//             name="genre"
//             value={formData.genre}
//             onChange={handleChange}
//             className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
//             required
//           >
//             <option value="">Select Genre</option>
//             <option value="Action">Action</option>
//             <option value="Comedy">Comedy</option>
//             <option value="Horror">Horror</option>
//             <option value="Romance">Romance</option>
//             <option value="Adventure">Adventure</option>
//           </select>
//         </div>

//         {/* Director Dropdown */}
//         <div>
//           <label className="block mb-1 text-sm font-medium">Director</label>
//           <select
//             name="director"
//             value={formData.director}
//             onChange={handleChange}
//             className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
//             required
//           >
//             <option value="">Select Director</option>
//             <option value="Rajkumar Hirani">Rajkumar Hirani</option>
//             <option value="Sanjay Leela Bhansali">Sanjay Leela Bhansali</option>
//             <option value="Yash Chopra">Yash Chopra</option>
//             <option value="Karan Johar">Karan Johar</option>
//             <option value="Sanjay Leela Bhansali">Sanjay Leela Bhansali</option>
//             <option value="Zoya Akhtar">Zoya Akhtar</option>
//             <option value="Anurag Kashyap">Anurag Kashyap</option>
//                <option value="Vishal Bhardwaj">Vishal Bhardwaj</option>
//           </select>
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block mb-1 text-sm font-medium">Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             rows={3}
//             className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400"
//             required
//           ></textarea>
//         </div>

//         {/* Premium */}
//         <div>
//           <label className="block mb-1 text-sm font-medium">Premium</label>
//           <select
//   name="premium"
//   value={formData.premium ? 'yes' : 'no'}
//   onChange={(e) =>
//     setFormData((prev) => ({
//       ...prev,
//       premium: e.target.value === 'yes',
//     }))
//   }
//   className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400"
//   required
// >
//   <option value="no">No</option>
//   <option value="yes">Yes</option>
// </select>

      
//         </div>

//         {/* Poster Upload */}
//         <div>
//           <label className="block mb-1 text-sm font-medium">Upload Poster</label>
//           <input
//             type="file"
//             name="poster"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="block w-full text-sm text-gray-300 file:bg-yellow-400 file:text-black file:px-4 file:py-1 file:rounded file:font-semibold"
//           />
//         </div>

//         {/* Banner Upload */}
//         <div>
//           <label className="block mb-1 text-sm font-medium">Upload Banner</label>
//           <input
//             type="file"
//             name="banner"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="block w-full text-sm text-gray-300 file:bg-yellow-400 file:text-black file:px-4 file:py-1 file:rounded file:font-semibold"
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-yellow-400 text-black py-2 rounded font-semibold hover:bg-yellow-300 transition"
//         >
//           {isEditing ? 'Update Movie' : 'Add Movie'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddMovie;
// import React, { useEffect, useState } from 'react';
// import { addMovie, updateMovie } from '../services/MovieServices';
// import { useLocation, useNavigate } from 'react-router-dom';

// interface MovieFormData {
//   title: string;
//   genre: string;
//   release_year: string;
//   rating: string;
//   director: string;
//   duration: string;
//   description: string;
//   premium: boolean;
//   poster?: File | null;
//   banner?: File | null;
// }

// const AddMovie: React.FC = () => {
//   const location = useLocation();
//   const movieToEdit = location.state?.movieToEdit;
//   const isEditing = !!movieToEdit;

//   const [formData, setFormData] = useState<MovieFormData>({
//     title: '',
//     genre: '',
//     release_year: '',
//     rating: '',
//     director: '',
//     duration: '',
//     description: '',
//     premium: false,
//     poster: null,
//     banner: null,
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (movieToEdit) {
//       setFormData({
//         title: movieToEdit.title,
//         genre: movieToEdit.genre,
//         release_year: movieToEdit.release_year.toString(),
//         rating: movieToEdit.rating.toString(),
//         director: movieToEdit.director,
//         duration: movieToEdit.duration.toString(),
//         description: movieToEdit.description,
//         premium: movieToEdit.plan === 'premium',
//         poster: null,
//         banner: null,
//       });
//     }
//   }, [movieToEdit]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value, type } = e.target;

//     if (type === 'checkbox') {
//       const checked = (e.target as HTMLInputElement).checked;
//       setFormData((prev) => ({
//         ...prev,
//         [name]: checked,
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, files } = e.target;
//     if (files && files.length > 0) {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: files[0],
//       }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//      const wordCount = formData.description.trim().split(/\s+/).length;
//   if (wordCount < 40) {
//     alert('Description must be at least 40 words.');
//     return;
//   }

//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (value !== null && value !== undefined) {
//         const formKey = `movie[${key}]`;

//         if (key === 'duration') {
//           data.append(formKey, String(Number(value)));
//         } else if (typeof value === 'boolean') {
//           data.append(formKey, value ? 'true' : 'false');
//         } else {
//           data.append(formKey, value as string | Blob);
//         }
//       }
//     });

//     try {
//       let response;
//       if (isEditing) {
//         response = await updateMovie(movieToEdit.id, data);
//         console.log('Movie updated successfully:', response);
//       } else {
//         response = await addMovie(data);
//         console.log('Movie added successfully:', response);
//       }
//       navigate('/filterpanel');
//     } catch (error) {
//       console.error('Error submitting movie:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white flex justify-center items-center py-10">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-xl bg-black-800 p-8 rounded-lg border-2 border-[yellow] shadow-lg space-y-5"
//       >
//         <h2 className="text-2xl font-bold text-yellow-400 mb-4">
//           {isEditing ? 'Edit Movie' : 'Add New Movie'}
//         </h2>

//         {[
//           { name: 'title', label: 'Title' },
//           { name: 'release_year', label: 'Release Year' },
//           { name: 'rating', label: 'Rating' },
//           { name: 'duration', label: 'Duration (in mins)' },
//         ].map(({ name, label }) => (
//           <div key={name}>
//             <label className="block mb-1 text-sm font-medium">{label}</label>

//             {name === 'rating' ? (
//               <select
//                 name="rating"
//                 value={formData.rating}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 required
//               >
//                 <option value="">Select Rating</option>
//                 {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
//                   <option key={num} value={num.toString()}>
//                     {num}
//                   </option>
//                 ))}
//               </select>
//             ) : (
//               <input
//                 type={name === 'Duration (in mins)' ? 'number' : 'text'}
//                 name={name}
//                 value={(formData as any)[name]}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400"
//                 required
//               />
//             )}
//           </div>
//         ))}

//         {/* Genre Dropdown */}
//         <div>
//           <label className="block mb-1 text-sm font-medium">Genre</label>
//           <select
//             name="genre"
//             value={formData.genre}
//             onChange={handleChange}
//             className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
//             required
//           >
//             <option value="">Select Genre</option>
//             <option value="Action">Action</option>
//             <option value="Comedy">Comedy</option>
//             <option value="Horror">Horror</option>
//             <option value="Romance">Romance</option>
//             <option value="Adventure">Adventure</option>
//           </select>
//         </div>

//         {/* Director Dropdown */}
//         <div>
//           <label className="block mb-1 text-sm font-medium">Director</label>
//           <select
//             name="director"
//             value={formData.director}
//             onChange={handleChange}
//             className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
//             required
//           >
//             <option value="">Select Director</option>
//             <option value="Rajkumar Hirani">Rajkumar Hirani</option>
//             <option value="Sanjay Leela Bhansali">Sanjay Leela Bhansali</option>
//             <option value="Yash Chopra">Yash Chopra</option>
//             <option value="Karan Johar">Karan Johar</option>
//             <option value="Zoya Akhtar">Zoya Akhtar</option>
//             <option value="Anurag Kashyap">Anurag Kashyap</option>
//             <option value="Vishal Bhardwaj">Vishal Bhardwaj</option>
//           </select>
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block mb-1 text-sm font-medium">Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             rows={3}
//             className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400"
//             required
//           ></textarea>
//         </div>

//         {/* Premium */}
//         <div>
//           <label className="block mb-1 text-sm font-medium">Premium</label>
//           <select
//             name="premium"
//             value={formData.premium ? 'yes' : 'no'}
//             onChange={(e) =>
//               setFormData((prev) => ({
//                 ...prev,
//                 premium: e.target.value === 'yes',
//               }))
//             }
//             className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400"
//             required
//           >
//             <option value="no">No</option>
//             <option value="yes">Yes</option>
//           </select>
//         </div>

//         {/* Poster Upload */}
//         <div>
//           <label className="block mb-1 text-sm font-medium">Upload Poster</label>
//           <input
//             type="file"
//             name="poster"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="block w-full text-sm text-gray-300 file:bg-yellow-400 file:text-black file:px-4 file:py-1 file:rounded file:font-semibold"
//           />
//         </div>

//         {/* Banner Upload */}
//         <div>
//           <label className="block mb-1 text-sm font-medium">Upload Banner</label>
//           <input
//             type="file"
//             name="banner"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="block w-full text-sm text-gray-300 file:bg-yellow-400 file:text-black file:px-4 file:py-1 file:rounded file:font-semibold"
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-yellow-400 text-black py-2 rounded font-semibold hover:bg-yellow-300 transition"
//         >
//           {isEditing ? 'Update Movie' : 'Add Movie'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddMovie;
// import React, { useEffect, useState } from 'react';
// import { addMovie, updateMovie } from '../services/MovieServices';
// import { useLocation, useNavigate } from 'react-router-dom';

// interface MovieFormData {
//   title: string;
//   genre: string;
//   release_year: string;
//   rating: string;
//   director: string;
//   duration: string;
//   description: string;
//   premium: boolean;
//   poster?: File | null;
//   banner?: File | null;
// }

// const AddMovie: React.FC = () => {
//   const location = useLocation();
//   const movieToEdit = location.state?.movieToEdit;
//   const isEditing = !!movieToEdit;

//   const [formData, setFormData] = useState<MovieFormData>({
//     title: '',
//     genre: '',
//     release_year: '',
//     rating: '',
//     director: '',
//     duration: '',
//     description: '',
//     premium: false,
//     poster: null,
//     banner: null,
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (movieToEdit) {
//       setFormData({
//         title: movieToEdit.title,
//         genre: movieToEdit.genre,
//         release_year: movieToEdit.release_year.toString(),
//         rating: movieToEdit.rating.toString(),
//         director: movieToEdit.director,
//         duration: movieToEdit.duration.toString(),
//         description: movieToEdit.description,
//         premium: movieToEdit.plan === 'premium',
//         poster: null,
//         banner: null,
//       });
//     }
//   }, [movieToEdit]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value, type } = e.target;

//     if (type === 'checkbox') {
//       const checked = (e.target as HTMLInputElement).checked;
//       setFormData((prev) => ({
//         ...prev,
//         [name]: checked,
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, files } = e.target;
//     if (files && files.length > 0) {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: files[0],
//       }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate description length (min 40 words)
//     const wordCount = formData.description.trim().split(/\s+/).length;
//     if (wordCount < 40) {
//       alert('Description must be at least 40 words.');
//       return;
//     }

//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (value !== null && value !== undefined) {
//         const formKey = `movie[${key}]`;

//         if (key === 'duration') {
//           data.append(formKey, String(Number(value)));
//         } else if (typeof value === 'boolean') {
//           data.append(formKey, value ? 'true' : 'false');
//         } else {
//           data.append(formKey, value as string | Blob);
//         }
//       }
//     });

//     try {
//       if (isEditing) {
//         await updateMovie(movieToEdit.id, data);
//       } else {
//         await addMovie(data);
//       }
//       navigate('/filterpanel');
//     } catch (error) {
//       console.error('Error submitting movie:', error);
//     }
//   };

//   return (
//   //  <div className="h-[70rem] w-full max-w-4xl bg-black text-white flex justify-center items-start pt-10 px-15">
//   <div className="h-[50rem] w-full bg-black text-white flex justify-center items-center  pt-0 px-15">


//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-4xl bg-black-800 p-8 rounded-lg border-2 border-yellow-400 shadow-lg space-y-5"
//       >
//         <h2 className="text-2xl font-bold text-yellow-400 mb-4">
//           {isEditing ? 'Edit Movie' : 'Add New Movie'}
//         </h2>

//         {/* 1st row - Title (full width) */}
//         <div>
//           <label className="block mb-1 text-sm font-medium">Title</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400"
//             required
//           />
//         </div>

//         {/* 2nd row - Release Year and Rating */}
//         <div className="flex gap-4">
//           <div className="flex-1">
//             <label className="block mb-1 text-sm font-medium">Release Year</label>
//             <input
//               type="text"
//               name="release_year"
//               value={formData.release_year}
//               onChange={handleChange}
//               className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400"
//               required
//             />
//           </div>

//           <div className="flex-1">
//             <label className="block mb-1 text-sm font-medium">Rating</label>
//             <select
//               name="rating"
//               value={formData.rating}
//               onChange={handleChange}
//               className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
//               required
//             >
//               <option value="">Select Rating</option>
//               {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
//                 <option key={num} value={num.toString()}>
//                   {num}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* 3rd row - Duration and Genre */}
//         <div className="flex gap-4">
//           <div className="flex-1">
//             <label className="block mb-1 text-sm font-medium">Duration (in mins)</label>
//             <input
//               type="number"
//               name="duration"
//               value={formData.duration}
//               onChange={handleChange}
//               className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400"
//               required
//             />
//           </div>

//           <div className="flex-1">
//             <label className="block mb-1 text-sm font-medium">Genre</label>
//             <select
//               name="genre"
//               value={formData.genre}
//               onChange={handleChange}
//               className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
//               required
//             >
//               <option value="">Select Genre</option>
//               <option value="Action">Action</option>
//               <option value="Comedy">Comedy</option>
//               <option value="Horror">Horror</option>
//               <option value="Romance">Romance</option>
//               <option value="Adventure">Adventure</option>
//             </select>
//           </div>
//         </div>

//         {/* Director Dropdown */}
//         <div>
//           <label className="block mb-1 text-sm font-medium">Director</label>
//           <select
//             name="director"
//             value={formData.director}
//             onChange={handleChange}
//             className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
//             required
//           >
//             <option value="">Select Director</option>
//             <option value="Rajkumar Hirani">Rajkumar Hirani</option>
//             <option value="Sanjay Leela Bhansali">Sanjay Leela Bhansali</option>
//             <option value="Yash Chopra">Yash Chopra</option>
//             <option value="Karan Johar">Karan Johar</option>
//             <option value="Zoya Akhtar">Zoya Akhtar</option>
//             <option value="Anurag Kashyap">Anurag Kashyap</option>
//             <option value="Vishal Bhardwaj">Vishal Bhardwaj</option>
//           </select>
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block mb-1 text-sm font-medium">Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             rows={3}
//             className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400"
//             required
//           ></textarea>
//         </div>

//         {/* Premium (smaller width) */}
//         <div className="flex-1">
//           <label className="block mb-1 text-sm font-medium">Premium</label>
//           <select
//             name="premium"
//             value={formData.premium ? 'yes' : 'no'}
//             onChange={(e) =>
//               setFormData((prev) => ({
//                 ...prev,
//                 premium: e.target.value === 'yes',
//               }))
//             }
//             className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-yellow-400"
//             required
//           >
//             <option value="no">No</option>
//             <option value="yes">Yes</option>
//           </select>
//         </div>

//         {/* Poster and Banner on same line */}
//         <div className="flex gap-4">
//           <div className="flex-1">
//             <label className="block mb-1 text-sm font-medium">Upload Poster</label>
//             <input
//               type="file"
//               name="poster"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="block w-full text-sm text-gray-300 file:bg-yellow-400 file:text-black file:px-4 file:py-1 file:rounded file:font-semibold"
//             />
//           </div>
//           <div className="flex-1">
//             <label className="block mb-1 text-sm font-medium">Upload Banner</label>
//             <input
//               type="file"
//               name="banner"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="block w-full text-sm text-gray-300 file:bg-yellow-400 file:text-black file:px-4 file:py-1 file:rounded file:font-semibold"
//             />
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-yellow-400 text-black py-2 rounded font-semibold hover:bg-yellow-300 transition"
//         >
//           {isEditing ? 'Update Movie' : 'Add Movie'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddMovie;
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
        duration: movieToEdit.duration.toString(),
        description: movieToEdit.description,
        premium: movieToEdit.plan === 'premium',
        poster: null,
        banner: null,
      });
    }
  }, [movieToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

    const wordCount = formData.description.trim().split(/\s+/).length;
    if (wordCount < 30) {
      alert('Description must be at least 30 words.');
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        const formKey = `movie[${key}]`;

        if (key === 'duration') {
          data.append(formKey, String(Number(value)));
        } else if (typeof value === 'boolean') {
          data.append(formKey, value ? 'true' : 'false');
        } else {
          data.append(formKey, value as string | Blob);
        }
      }
    });

    try {
      if (isEditing) {
        await updateMovie(movieToEdit.id, data);
      } else {
        await addMovie(data);
      }
      navigate('/filterpanel');
    } catch (error) {
      console.error('Error submitting movie:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-gray-900 bg-opacity-90 p-10 rounded-xl shadow-2xl border border-yellow-500 space-y-8"
      >
        <h2 className="text-3xl font-extrabold text-yellow-400 text-center mb-8">
          {isEditing ? 'Edit Movie' : 'Add New Movie'}
        </h2>

        <div>
          <label htmlFor="title" className="block mb-2 text-sm font-semibold text-yellow-400">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter movie title"
            className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        <div className="flex gap-6">
          <div className="flex-1">
            <label htmlFor="release_year" className="block mb-2 text-sm font-semibold text-yellow-400">
              Release Year
            </label>
            <input
              id="release_year"
              type="number"
              name="release_year"
              value={formData.release_year}
              onChange={handleChange}
              placeholder="e.g., 2023"
              className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
              min={1900}
              max={new Date().getFullYear()}
            />
          </div>

          <div className="flex-1">
            <label htmlFor="rating" className="block mb-2 text-sm font-semibold text-yellow-400">
              Rating
            </label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            >
              <option value="" disabled>
                Select Rating
              </option>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num.toString()}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex-1">
            <label htmlFor="duration" className="block mb-2 text-sm font-semibold text-yellow-400">
              Duration (in minutes)
            </label>
            <input
              id="duration"
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 120"
              className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
              min={1}
              max={500}
            />
          </div>

          <div className="flex-1">
            <label htmlFor="genre" className="block mb-2 text-sm font-semibold text-yellow-400">
              Genre
            </label>
            <select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            >
              <option value="" disabled>
                Select Genre
              </option>
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Horror">Horror</option>
              <option value="Romance">Romance</option>
              <option value="Adventure">Adventure</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="director" className="block mb-2 text-sm font-semibold text-yellow-400">
            Director
          </label>
          <select
            id="director"
            name="director"
            value={formData.director}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          >
            <option value="" disabled>
              Select Director
            </option>
            <option value="Rajkumar Hirani">Rajkumar Hirani</option>
            <option value="Sanjay Leela Bhansali">Sanjay Leela Bhansali</option>
            <option value="Yash Chopra">Yash Chopra</option>
            <option value="Karan Johar">Karan Johar</option>
            <option value="Zoya Akhtar">Zoya Akhtar</option>
            <option value="Anurag Kashyap">Anurag Kashyap</option>
            <option value="Vishal Bhardwaj">Vishal Bhardwaj</option>
            <option value="Catherine Hardwicke"> Catherine Hardwicke</option>
            <option value="Matt Duffer"> Matt Duffer</option>
            <option value="Roger Allers"> Roger Allers</option>
            <option value="Adrian Powers"> Adrian Powers</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-semibold text-yellow-400">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Enter a detailed description (min 20 words)"
            className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
            required
          />
        </div>

        <div>
          <label htmlFor="premium" className="block mb-2 text-sm font-semibold text-yellow-400">
            Premium
          </label>
          <select
            id="premium"
            name="premium"
            value={formData.premium ? 'yes' : 'no'}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                premium: e.target.value === 'yes',
              }))
            }
            className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <label htmlFor="poster" className="block mb-2 text-sm font-semibold text-yellow-400">
              Poster Image
            </label>
            <input
              id="poster"
              type="file"
              name="poster"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2"
              required={!isEditing}
            />
          </div>

          <div className="flex-1">
            <label htmlFor="banner" className="block mb-2 text-sm font-semibold text-yellow-400">
              Banner Image
            </label>
            <input
              id="banner"
              type="file"
              name="banner"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2"
              required={!isEditing}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg transition-colors duration-300 mt-4"
        >
          {isEditing ? 'Update Movie' : 'Add Movie'}
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
