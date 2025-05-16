
import { toast } from 'react-hot-toast';


import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { loginApiCall } from '../services/UserServices';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|ask)\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
  toast.error(
        'Email must be a valid email with @gmail, @yahoo, or @ask and a valid domain (.com, .in, etc.).'
      );
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one digit, and one special character.'
      );
      return;
    }

    setLoading(true);
    const payload = { email, password };

try {
  const response = await loginApiCall(payload);
  console.log('Full Login Response:', response);

  if (response) {
    toast.success('Login successful!');

    const userWithPlan = {
      ...response,
      plan: response.plan || response.plan_type || 'free' // also handle plan_type if API sends that
    };

    localStorage.setItem('user', JSON.stringify(userWithPlan)); 
    localStorage.setItem('token', response.token);

    navigate('/dashboard');
    window.location.reload();
  } else {
    toast.error('Login failed. Please check your credentials.');
  }
} catch (error) {
  console.error('Error during login:', error);
  toast.error('An error occurred during login.');
} finally {
  setLoading(false);
}



     
       
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-sm p-6">
        <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
        <p className="text-gray-400 mb-6">Sign in to continue watching</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded-md bg-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <div className="relative mb-6">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-md bg-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            type="button" data-testid="toggle-password"
            className="absolute right-3 top-3 text-gray-400"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-md hover:bg-yellow-300 transition"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        <p className="text-center text-gray-400 mt-4">
          Don't have an account?{' '}
          <button
  onClick={() => navigate('/signup')}
  className="text-yellow-400 hover:underline ml-1"
>
  Sign Up
</button>

        </p>
      </div>
    </div>
  );
};

export default Login;
