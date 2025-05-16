import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import MovieCard from '../components/MovieCard';
import { BrowserRouter } from 'react-router-dom';
import * as MovieServices from '../services/MovieServices';


const mockMovies = [
  {
    id: 1,
    title: 'Action Movie',
    genre: 'Action',
    director: 'John Doe',
    main_lead: 'Hero',
    rating: 9.5,
    duration: '2h',
    release_year: 2023,
    plan: 'premium',
    poster_url: '',
    banner_url: ''
  },
  {
    id: 2,
    title: 'Comedy Show',
    genre: 'Comedy',
    director: 'Jane Doe',
    main_lead: 'Comedian',
    rating: 7,
    duration: '1.5h',
    release_year: 2020,
    plan: 'basic',
    poster_url: '',
    banner_url: ''
  }
];

beforeEach(() => {
  localStorage.setItem('user', JSON.stringify({ role: 'admin', plan: 'premium' }));
});

afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});


const renderWithRouter = (ui: React.ReactElement) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

describe('MovieCard Component', () => {
  it('should show loading initially', () => {
    renderWithRouter(<MovieCard />);
    expect(screen.getByText(/loading movies/i)).toBeInTheDocument();
  });

  
  
}); 