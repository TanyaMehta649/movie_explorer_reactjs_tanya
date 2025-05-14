import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddMovie from '../components/AddMovie';
import { addMovie, updateMovie } from '../services/MovieServices';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../services/MovieServices');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ state: null }), 
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('AddMovie Component - Add Mode', () => {
  test('renders the form correctly', () => {
    renderWithRouter(<AddMovie />);
    expect(screen.getByText(/Add New Movie/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Premium/i)).toBeInTheDocument();
  });

  test('submits form and calls addMovie', async () => {
    (addMovie as jest.Mock).mockResolvedValue({ success: true });

    renderWithRouter(<AddMovie />);

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Movie' } });
    fireEvent.change(screen.getByLabelText(/Genre/i), { target: { value: 'Action' } });
    fireEvent.change(screen.getByLabelText(/Release Year/i), { target: { value: '2023' } });
    fireEvent.change(screen.getByLabelText(/Rating/i), { target: { value: '8.5' } });
    fireEvent.change(screen.getByLabelText(/Director/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Duration/i), { target: { value: '120 min' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'A test movie' } });
    fireEvent.change(screen.getByLabelText(/Premium/i), { target: { value: 'true' } });

    fireEvent.submit(screen.getByRole('button', { name: /Add Movie/i }));

    await waitFor(() => {
      expect(addMovie).toHaveBeenCalled();
    });
  });

  test('uploads poster and banner files', () => {
    renderWithRouter(<AddMovie />);

    const file = new File(['dummy'], 'poster.png', { type: 'image/png' });

    const posterInput = screen.getByLabelText(/Upload Poster/i) as HTMLInputElement;
    const bannerInput = screen.getByLabelText(/Upload Banner/i) as HTMLInputElement;

    fireEvent.change(posterInput, { target: { files: [file] } });
    fireEvent.change(bannerInput, { target: { files: [file] } });

    expect(posterInput.files?.[0].name).toBe('poster.png');
    expect(bannerInput.files?.[0].name).toBe('poster.png');
  });
});

describe('AddMovie Component - Edit Mode', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => jest.fn(),
      useLocation: () => ({
        state: {
          movieToEdit: {
            id: 101,
            title: 'Edit Title',
            genre: 'Drama',
            release_year: 2022,
            rating: 7.8,
            director: 'Jane Doe',
            duration: '90 min',
            description: 'Edit description',
            plan: 'premium',
          },
        },
      }),
    }));
  });

  test('renders with pre-filled data and calls updateMovie', async () => {
    const { default: EditMovie } = await import('./AddMovie');
    (updateMovie as jest.Mock).mockResolvedValue({ success: true });

    renderWithRouter(<EditMovie />);

    expect(screen.getByDisplayValue(/Edit Title/)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Updated Title' } });

    fireEvent.submit(screen.getByRole('button', { name: /Update Movie/i }));

    await waitFor(() => {
      expect(updateMovie).toHaveBeenCalled();
    });
  });
});
