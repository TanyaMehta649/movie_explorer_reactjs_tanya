import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Signup from '../components/Signup';
import { BrowserRouter } from 'react-router-dom';
import { signupApiCall } from '../services/UserServices';

jest.mock('../services/UserServices', () => ({
  signupApiCall: jest.fn(),
}));

import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));


jest.mock('react-phone-number-input', () => (props: any) => {
  return (
    <input
      data-testid="phone-input"
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      placeholder={props.placeholder}
    />
  );
});

const mockedNavigate = jest.fn();
jest.mock('../components/withNavigation.tsx', () => ({
  withNavigation: (Component: any) => (props: any) =>
    <Component {...props} navigate={mockedNavigate} />,
}));

const renderComponent = () =>
  render(
    <BrowserRouter>
      <Signup navigate={mockedNavigate} />
    </BrowserRouter>
  );

describe('Signup Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Signup Form Validations', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('shows error when passwords do not match', async () => {
      renderComponent();

      fireEvent.change(screen.getByPlaceholderText(/full name/i), {
        target: { value: 'John Doe' },
      });
      fireEvent.change(screen.getByPlaceholderText(/email/i), {
        target: { value: 'john@gmail.com' },
      });
      fireEvent.change(screen.getByTestId('phone-input'), {
        target: { value: '+911234567890' },
      });
      fireEvent.change(screen.getByPlaceholderText(/^password$/i), {
        target: { value: 'Password@1' },
      });
      fireEvent.change(screen.getByPlaceholderText(/confirm password/i), {
        target: { value: 'Password@2' },
      });
      fireEvent.click(screen.getByRole('checkbox'));

      fireEvent.click(screen.getByRole('button', { name: /create account/i }));

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Passwords do not match');
      });
    });

    it('shows error when required fields are empty', async () => {
      renderComponent();

      fireEvent.click(screen.getByRole('button', { name: /create account/i }));

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Please fill out all required fields');
      });
    });

    it('calls signupApiCall and shows success message on valid submission', async () => {
      (signupApiCall as jest.Mock).mockResolvedValue({ message: 'Signup successful' });

      renderComponent();

      fireEvent.change(screen.getByPlaceholderText(/full name/i), {
        target: { value: 'John Doe' },
      });
      fireEvent.change(screen.getByPlaceholderText(/email/i), {
        target: { value: 'john@gmail.com' },
      });
      fireEvent.change(screen.getByTestId('phone-input'), {
        target: { value: '+911234567890' },
      });
      fireEvent.change(screen.getByPlaceholderText(/^password$/i), {
        target: { value: 'Password@1' },
      });
      fireEvent.change(screen.getByPlaceholderText(/confirm password/i), {
        target: { value: 'Password@1' },
      });
      fireEvent.click(screen.getByRole('checkbox'));

      fireEvent.click(screen.getByRole('button', { name: /create account/i }));

      await waitFor(() => {
        expect(signupApiCall).toHaveBeenCalledWith({
          fullName: 'John Doe',
          email: 'john@gmail.com',
          phone: '+911234567890',
          password: 'Password@1',
        });
        expect(toast.success).toHaveBeenCalledWith('Signup successful');
        expect(mockedNavigate).toHaveBeenCalledWith('/login');
      });
    });

    it('shows error when signupApiCall fails', async () => {
      (signupApiCall as jest.Mock).mockRejectedValue({ message: 'Signup failed' });

      renderComponent();

      fireEvent.change(screen.getByPlaceholderText(/full name/i), {
        target: { value: 'John Doe' },
      });
      fireEvent.change(screen.getByPlaceholderText(/email/i), {
        target: { value: 'john@gmail.com' },
      });
      fireEvent.change(screen.getByTestId('phone-input'), {
        target: { value: '+911234567890' },
      });
      fireEvent.change(screen.getByPlaceholderText(/^password$/i), {
        target: { value: 'Password@1' },
      });
      fireEvent.change(screen.getByPlaceholderText(/confirm password/i), {
        target: { value: 'Password@1' },
      });
      fireEvent.click(screen.getByRole('checkbox'));

      fireEvent.click(screen.getByRole('button', { name: /create account/i }));

     await waitFor(() => {
  expect(toast.error).toHaveBeenCalledWith('An error occurred during signup.');
});

    });
  });
});