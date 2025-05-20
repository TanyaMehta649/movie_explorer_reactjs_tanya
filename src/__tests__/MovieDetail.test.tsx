
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MovieDetail from '../pages/MovieDetail';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
}));
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const userMock = { token: 'mock-token' };
beforeAll(() => {
  Storage.prototype.getItem = jest.fn(() => JSON.stringify(userMock));
});

describe('MovieDetail Component', () => {
  it('renders loading state initially', () => {
    render(
      <MemoryRouter initialEntries={['/movies/1']}>
        <Routes>
          <Route path="/movies/:id" element={<MovieDetail />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('handles fetch error gracefully', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    render(
      <MemoryRouter initialEntries={['/movies/1']}>
        <Routes>
          <Route path="/movies/:id" element={<MovieDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });

  it('renders movie details after successful fetch', async () => {
    const movieMock = {
      title: 'Test Movie',
      genre: 'Action, Adventure',
      director: 'John Doe',
      release_year: 2023,
      duration: '120',
      rating: 4.5,
      description: 'This is a test movie description',
      poster_url: 'https://example.com/poster.jpg',
      banner_url: 'https://example.com/banner.jpg',
    };

    mockedAxios.get.mockResolvedValueOnce({ data: movieMock });

    render(
      <MemoryRouter initialEntries={['/movies/1']}>
        <Routes>
          <Route path="/movies/:id" element={<MovieDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Test Movie/)).toBeInTheDocument();
      expect(screen.getByText(/Action/)).toBeInTheDocument();
      expect(screen.getByText(/John Doe/)).toBeInTheDocument();
      expect(screen.getByText(/2023/)).toBeInTheDocument();
      expect(screen.getByText(/120/)).toBeInTheDocument();
      expect(screen.getByText(/4.5/)).toBeInTheDocument();
      expect(screen.getByText(/This is a test movie description/)).toBeInTheDocument();
    });
  });

 
  

  it('handles no related movies gracefully', async () => {
    const movieMock = {
      title: 'Test Movie',
      genre: 'Action, Adventure',
      director: 'John Doe',
      release_year: 2023,
      duration: '120',
      rating: 4.5,
      description: 'This is a test movie description',
      poster_url: 'https://example.com/poster.jpg',
      banner_url: 'https://example.com/banner.jpg',
    };

    mockedAxios.get.mockResolvedValueOnce({ data: movieMock }); // First fetch: Movie details
    mockedAxios.get.mockResolvedValueOnce({ data: { movies: [] } }); // Second fetch: No related movies

    render(
      <MemoryRouter initialEntries={['/movies/1']}>
        <Routes>
          <Route path="/movies/:id" element={<MovieDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Test Movie/)).toBeInTheDocument();
      expect(screen.queryByText(/Related Movie/)).toBeNull();
    });
  });

  it('removes loading state once data is fetched', async () => {
    const movieMock = {
      title: 'Test Movie',
      genre: 'Action, Adventure',
      director: 'John Doe',
      release_year: 2023,
      duration: '120',
      rating: 4.5,
      description: 'This is a test movie description',
      poster_url: 'https://example.com/poster.jpg',
      banner_url: 'https://example.com/banner.jpg',
    };

    mockedAxios.get.mockResolvedValueOnce({ data: movieMock });

    render(
      <MemoryRouter initialEntries={['/movies/1']}>
        <Routes>
          <Route path="/movies/:id" element={<MovieDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).toBeNull();
      expect(screen.getByText(/Test Movie/)).toBeInTheDocument();
    });
  });

  it('navigates correctly when user is not logged in', () => {
    Storage.prototype.getItem = jest.fn(() => null); // Simulate no user

    render(
      <MemoryRouter initialEntries={['/movies/1']}>
        <Routes>
          <Route path="/movies/:id" element={<MovieDetail />} />
        </Routes>
      </MemoryRouter>
    );

   
  });
});
