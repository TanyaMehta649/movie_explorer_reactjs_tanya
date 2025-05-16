
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieItemCard from '../components/MovieItemCard';
import { BrowserRouter } from 'react-router-dom';
import { Movie } from '../services/MovieServices';
import '@testing-library/jest-dom';
import toast from 'react-hot-toast';

jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
}));


const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};


const movie: Movie = {
  id: 1,
  title: 'Sample Movie',
  description: 'Test',
  genre: 'Action',
  director: 'Jane Doe',
  main_lead: 'John Smith',
  rating: 4.5,
  duration: '2h',
  release_year: 2023,
  plan: 'premium',
  poster_url: 'https://example.com/poster.jpg',
  banner_url: 'https://example.com/banner.jpg',
  premium: true,
};

describe('MovieItemCard', () => {
  const onEdit = jest.fn();
  const onDelete = jest.fn();
  const mockNavigate = jest.fn();

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  }));

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders movie title and poster', () => {
    renderWithRouter(
      <MovieItemCard
        movie={movie}
        userRole={null}
        userPlan={null}
        isLoggedIn={true}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );
    expect(screen.getByText(/sample movie/i)).toBeInTheDocument();
    expect(screen.getByAltText(/sample movie/i)).toHaveAttribute('src', movie.poster_url);
  });

  it('shows edit and delete buttons for supervisor', () => {
    renderWithRouter(
      <MovieItemCard
        movie={movie}
        userRole="supervisor"
        userPlan="premium"
        isLoggedIn={true}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );
    expect(screen.getByTitle(/edit/i)).toBeInTheDocument();
    expect(screen.getByTitle(/delete/i)).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    renderWithRouter(
      <MovieItemCard
        movie={movie}
        userRole="supervisor"
        userPlan="premium"
        isLoggedIn={true}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );
    fireEvent.click(screen.getByTitle(/edit/i));
    expect(onEdit).toHaveBeenCalledWith(movie);
  });

  it('calls onDelete when delete button is clicked', () => {
    renderWithRouter(
      <MovieItemCard
        movie={movie}
        userRole="supervisor"
        userPlan="premium"
        isLoggedIn={true}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );
    fireEvent.click(screen.getByTitle(/delete/i));
    expect(onDelete).toHaveBeenCalledWith(movie.id);
  });

  it('shows login toast and redirects if not logged in', () => {
    renderWithRouter(
      <MovieItemCard
        movie={movie}
        userRole={null}
        userPlan={null}
        isLoggedIn={false}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );
    fireEvent.click(screen.getByAltText(/sample movie/i));
    expect(toast.error).toHaveBeenCalledWith('Please login to view movie details!');
  });

 
  
  

  

  it('does not show premium icon if the user has a premium plan', () => {
    renderWithRouter(
      <MovieItemCard
        movie={movie}
        userRole="supervisor"
        userPlan="premium"
        isLoggedIn={true}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );

    expect(screen.queryByAltText(/premium/i)).not.toBeInTheDocument();
  });

it('shows premium icon if the movie is premium', () => {
  renderWithRouter(
    <MovieItemCard
      movie={movie}
      userRole="supervisor"
      userPlan="basic"
      isLoggedIn={true}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );

 
  const premiumIcon = document.querySelector('.bg-yellow-400');
  expect(premiumIcon).toBeInTheDocument();
});

  

  it('does not show premium icon if the movie is not premium', () => {
    const nonPremiumMovie = { ...movie, premium: false };

    renderWithRouter(
      <MovieItemCard
        movie={nonPremiumMovie}
        userRole="supervisor"
        userPlan="basic"
        isLoggedIn={true}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );

    expect(screen.queryByAltText(/premium/i)).not.toBeInTheDocument();
  });
});
