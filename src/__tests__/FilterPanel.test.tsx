import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FilterPanel from '../pages/FilterPanel';
import { BrowserRouter } from 'react-router-dom';
import { getAllMoviesPagination, searchByTitle, deleteMovie } from '../services/MovieServices';


beforeEach(() => {
  localStorage.setItem('user', JSON.stringify({ role: 'admin', plan: 'premium' }));
});

jest.mock('../services/MovieServices');

const mockMovies = [
  {
    id: 1,
    title: 'Inception',
    genre: 'Action',
    director: 'Christopher Nolan',
    main_lead: 'Leonardo DiCaprio',
    rating: 8.8,
    duration: '2h 28min',
    release_year: 2010,
    plan: 'premium',
    poster_url: 'inception.jpg',
    banner_url: 'inception-banner.jpg',
    description: 'A mind-bending thriller.',
  },
];

describe('FilterPanel', () => {
  beforeEach(() => {
    (getAllMoviesPagination as jest.Mock).mockResolvedValue({
      movies: mockMovies,
      pagination: { total_pages: 3 }
    });

    (searchByTitle as jest.Mock).mockResolvedValue(mockMovies);
  });

  const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'];

  const renderComponent = () => {
    render(
      <BrowserRouter>
        <FilterPanel />
      </BrowserRouter>
    );
  };

  

  it('shows loader while fetching movies', async () => {
    renderComponent();

    expect(screen.getByRole('status')).toBeInTheDocument(); 
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
  });

  it('filters movies by genre and search term', async () => {
    renderComponent();

    fireEvent.click(screen.getByText('Action'));
    fireEvent.change(screen.getByPlaceholderText(/search by title/i), {
      target: { value: 'Inception' },
    });

    await waitFor(() => {
      expect(searchByTitle).toHaveBeenCalledWith('Inception', 'Action');
      expect(screen.getByText('Inception')).toBeInTheDocument();
    });
  });

  it('paginates through movie pages', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/page 1 of 3/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/next/i));
    await waitFor(() => {
      expect(getAllMoviesPagination).toHaveBeenCalledWith(2);
    });

    fireEvent.click(screen.getByText(/previous/i));
    await waitFor(() => {
      expect(getAllMoviesPagination).toHaveBeenCalledWith(1);
    });
  });

  
  

 
});
