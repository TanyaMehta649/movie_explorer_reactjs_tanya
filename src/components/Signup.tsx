
import React, { Component, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-hot-toast';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { signupApiCall } from '../services/UserServices';

interface SignupProps {
  navigate: (path: string) => void;
}

interface SignupState {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreed: boolean;
  isSubmitting: boolean;
}

class Signup extends Component<SignupProps, SignupState> {
  constructor(props: SignupProps) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      agreed: false,
      isSubmitting: false,
    };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    this.setState({
      [name]: type === 'checkbox' ? checked : value,
    } as Pick<SignupState, keyof SignupState>);
  };

  handlePhoneChange = (value: string | undefined) => {
    this.setState({ phone: value || '' });
  };

  
handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.state.isSubmitting) return;

    this.setState({ isSubmitting: true });

    const { fullName, email, password, confirmPassword, agreed, phone } = this.state;

    const nameRegex = /^[A-Z][a-zA-Z]{2,}(?: [A-Z][a-zA-Z]{2,})*$/;
    if (!nameRegex.test(fullName)) {
      toast.error('Full Name must start with a capital letter...');
      this.setState({ isSubmitting: false });
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|ask)\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error('Email must be valid with @gmail, @yahoo, or @ask...');
      this.setState({ isSubmitting: false });
      return;
    }

    if (!agreed) {
      toast.error('Please agree to the Terms and Policy');
      this.setState({ isSubmitting: false });
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error('Password must meet complexity requirements');
      this.setState({ isSubmitting: false });
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      this.setState({ isSubmitting: false });
      return;
    }

    if (!isValidPhoneNumber(phone)) {
      toast.error('Please enter a valid phone number');
      this.setState({ isSubmitting: false });
      return;
    }




    const payload = {
      name: fullName,
      email,
      mobile_number: phone,
      password,
      password_confirmation: confirmPassword
    };

    try {
      const response = await signupApiCall(payload);
      if (response) {
         toast.success('Signup successful!');
        this.props.navigate('/dashboard'); 
      } else {
         toast.error('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
       toast.error('An error occurred during signup.');
    } finally {
      this.setState({ isSubmitting: false });
    }
  };

  render() {
    return (
    
      <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={this.handleSubmit}
          className="text-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Create Account</h2>
          <p className="mb-6 text-sm text-gray-300 sm:text-base">Join MovieExplorer+ today</p>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={this.state.fullName}
            onChange={this.handleChange}
            className="w-full p-3 mb-4 rounded-md bg-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm sm:text-base"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            className="w-full p-3 mb-4 rounded-md bg-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm sm:text-base"
            required
          />

          <PhoneInput
            placeholder="Enter phone number"
            defaultCountry="IN"
            value={this.state.phone || undefined}
            onChange={this.handlePhoneChange}
            className="w-full p-3 mb-4 rounded-md bg-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm sm:text-base"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            className="w-full p-3 mb-4 rounded-md bg-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm sm:text-base"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            className="w-full p-3 mb-4 rounded-md bg-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm sm:text-base"
            required
          />

          <label className="flex items-start gap-2 mb-4 text-sm text-gray-300">
            <input
              type="checkbox"
              name="agreed"
              checked={this.state.agreed}
              onChange={this.handleChange}
              className="mt-1"
              required
            />
            <span>
              I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </span>
          </label>

          <button
            type="submit"
            disabled={this.state.isSubmitting}
            className={`w-full bg-yellow-400 text-black py-3 rounded-md font-semibold transition ${
              this.state.isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-500'
            }`}
          >
            {this.state.isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>

          <p className="text-center mt-4 text-sm">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => this.props.navigate('/')}
              className="text-yellow-400 hover:underline bg-transparent border-none cursor-pointer"
            >
              Sign In
            </button>
          </p>
        </form>
      </div>
    );
  }
}

import { withNavigation } from './withNavigation';

export default withNavigation(Signup);
