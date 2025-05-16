import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LandingPage from '../components/LandingPage';
import * as MovieServices from '../services/MovieServices';
import * as Subscription from '../services/Subscription';
import '@testing-library/jest-dom';

jest.mock('../services/MovieServices.tsx');
jest.mock('../services/Subscription.tsx');

const mockMovies = [
  {
    id: 1,
    title: 'Movie One',
    description: 'Description One that is quite long to test the see more functionality. '.repeat(10),
    genre: 'Action',
    director: 'Director One',
    main_lead: 'Lead One',
    rating: 4.5,
    duration: '2h',
    release_year: 2023,
    plan: 'Premium',
    poster_url: 'poster1.jpg',
    banner_url: 'banner1.jpg',
  },
  {
    id: 2,
    title: 'Movie Two',
    description: 'Short Description Two',
    genre: 'Comedy',
    director: 'Director Two',
    main_lead: 'Lead Two',
    rating: 4.0,
    duration: '1.5h',
    release_year: 2022,
    plan: 'Basic',
    poster_url: 'poster2.jpg',
    banner_url: 'banner2.jpg',
  },
];

describe('LandingPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (MovieServices.getAllMovies as jest.Mock).mockResolvedValue(mockMovies);
    (Subscription.getSubscriptionStatus as jest.Mock).mockResolvedValue({ status: 'active' });
  });



  test('displays movie title and description after loading', async () => {
    render(<LandingPage />);
    await waitFor(() => {
      expect(screen.getByText('Movie One')).toBeInTheDocument();
      expect(screen.getByText(/Description One/i)).toBeInTheDocument();
    });
  });

  test('toggles description with "See More" and "See Less"', async () => {
    render(<LandingPage />);
    await waitFor(() => screen.getByText('See More'));

    const toggleBtn = screen.getByText('See More');
    fireEvent.click(toggleBtn);
    expect(screen.getByText('See Less')).toBeInTheDocument();

    fireEvent.click(screen.getByText('See Less'));
    expect(screen.getByText('See More')).toBeInTheDocument();
  });
  });
