
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/Login'; 
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
describe('Login Component', () => {
  beforeEach(() => {
    window.alert = jest.fn();
  });

test('renders login form with email and password fields', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
});

 test('shows alert on invalid email format', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: 'invalidemail' },
  });
  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: 'Valid@123' },
  });

  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  expect(window.alert).toHaveBeenCalledWith(
    expect.stringContaining('@gmail, @yahoo, or @ask')
  );
});


  test('shows alert on invalid password format', () => {
  window.alert = jest.fn();
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: 'test@gmail.com' },
  });

  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: 'weakpass' },
  });

  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
  expect(window.alert).toHaveBeenCalledWith(
    expect.stringContaining('Password must be at least 8 characters')
  );
});
test('successful login flow', async () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: 'test@gmail.com' },
  });
  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: 'Valid@123' },
  });

  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  expect(window.alert).not.toHaveBeenCalled();
});
test('allows typing in email and password fields', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });

    expect(emailInput).toHaveValue('test@gmail.com');
    expect(passwordInput).toHaveValue('Password123!');

  });
 
   

});
