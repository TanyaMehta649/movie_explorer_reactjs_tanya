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
});
