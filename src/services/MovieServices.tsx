
import axios from 'axios';

export interface Movie {
  id: number;
  title: string;
  description: string;
  genre: string;
  director: string;
  main_lead: string;
  rating: number;
  duration: string;
  release_year: number;
  premium: boolean;
  plan?: string;
  poster_url: string;
  banner_url: string;
}

const API_URL = 'https://movie-explorer-app.onrender.com/api/v1/movies';

export const getAllMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const movies: Movie[] = response.data.movies;
    console.log('Fetched movies:', movies);
    return movies;
  } catch (error: any) {
    console.error('Error fetching movies:', error.message);
    return [];
  }
};



export const addMovie = async (formData: FormData) => {
  const token = localStorage.getItem('token');
  console.log(token);
  try {
    const response = await axios.post('https://movie-explorer-app.onrender.com/api/v1/movies', formData, {
      headers: {
        Authorization:`Bearer ${token}`, 
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });
    console.log(token);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const searchByTitle = async (searchTerm: string, genre: string) => {
  try {
    const response = await axios.get('https://movie-explorer-app.onrender.com/api/v1/movies', {
      params: {
        title: searchTerm.trim() || '', 
        genre: genre === 'All' ? '' : genre, 
      },
    });
    return response.data.movies;  
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};




  interface MovieResponse {
    movies: Movie[];
    pagination: {
      total_pages: number;
      current_page: number;
      per_page: number;
      total_count: number;
    };
  }
     
  // export const getAllMoviesPagination = async (page: number = 1): Promise<MovieResponse> => {
  //   try {
  //     const response = await axios.get( `${API_URL}?page=${page}`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //       },
  //     });
  
      // const data = response.data;
  
      // const movieData: MovieResponse = {
      //   movies: data.movies || [],
      //   pagination: data.pagination || {
      //     current_page: data.current_page || page,
      //     total_pages: data.total_pages || 1,
      //     total_count: data.total_count || data.movies?.length || 0,
      //     per_page: data.per_page || 10,
      //   },
      // };
  
      // console.log('Fetched movies:', movieData);
      // return movieData;
  
  //   } catch (error: any) {
  //     console.error('Error fetching movies:', error.message);
  //     return {
  //       movies: [],
  //       pagination: {
  //         current_page: page,
  //         total_pages: 1,
  //         total_count: 0,
  //         per_page: 8,
  //       },
  //     };
  //   }
  // };
  export const getAllMoviesPagination = async (page: number = 1): Promise<MovieResponse> => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}&per_page=12`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const data = response.data;

    const movieData: MovieResponse = {
      movies: data.movies || [],
      pagination: data.pagination || {
        current_page: data.current_page || page,
        total_pages: data.total_pages || 1,
        total_count: data.total_count || data.movies?.length || 0,
        per_page: data.per_page || 12,  
      },
    };

    console.log('Fetched movies:', movieData);
    return movieData;

  } catch (error: any) {
    console.error('Error fetching movies:', error.message);
    return {
      movies: [],
      pagination: {
        current_page: page,
        total_pages: 1,
        total_count: 0,
        per_page: 12,  // fallback per_page to 12
      },
    };
  }
};

  export const updateMovie = async (id: number, formData: FormData) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`${API_URL}/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  export const deleteMovie = async (id: number) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization:` Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  