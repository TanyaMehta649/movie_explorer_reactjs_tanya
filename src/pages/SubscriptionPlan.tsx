
import React, { useState, useRef } from 'react';
import { Plan } from '../pages/Types';
import { createSubscription } from '../services/Subscription';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function SubscriptionPlan() {
  window.scrollTo(0, 0);
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const confirmRef = useRef<HTMLDivElement>(null);

  const plans: Plan[] = [
    {
      id: '1_day',
      name: '1 Day Pass',
      price: '$3',
      features: ['Full access to all movies', 'Unlimited streaming', 'HD quality', 'No ads'],
      duration: '24 hours of premium access',
    },
    {
      id: '1_month',
      name: '1 Month Pass',
      price: '$89',
      features: ['Full access to all movies', 'Unlimited streaming', 'HD & 4K quality', 'No ads', 'Offline downloads'],
      duration: '30 days of premium access',
      popular: true,
    },
    {
      id: '3_months',
      name: '3 Month Premium',
      price: '$259',
      features: [
        'Full access to all movies',
        'Unlimited streaming',
        'HD & 4K quality',
        'No ads',
        'Offline downloads',
        'Priority customer support',
        'Early access to new releases',
      ],
      duration: '120 days of premium access',
    },
  ];

  const isTokenExpired = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp;
      const now = Math.floor(Date.now() / 1000);
      return expiry < now;
    } catch (err) {
      return true;
    }
  };

  const isLoggedIn = (() => {
    const token = localStorage.getItem('token');
    return token && !isTokenExpired(token);
  })();

  const handlePlanClick = (planId: string) => {
    if (!isLoggedIn) {
      toast.error('Please login to select a subscription plan!');
      return;
    }
    setSelectedPlan(planId);
    setTimeout(() => {
      confirmRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },);
  };

  const handleSubscribe = async () => {
    if (!selectedPlan) {
      setError('Please select a plan.');
      confirmRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const checkoutUrl = await createSubscription(selectedPlan);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        throw new Error('No checkout URL returned from server.');
      }
    } catch (err: any) {
      console.error('Error in handleSubscribe:', err);
      setError(err.message || 'Failed to initiate subscription. Please try again.');
      setIsProcessing(false);
    }
  };

  if (showSuccess) {
    const plan = plans.find((p) => p.id === selectedPlan);
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
        <div className="bg-gray-800 max-w-md w-full p-6 rounded-lg border border-white/10 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            ✓
          </div>
          <h2 className="text-2xl font-bold mb-2">Subscription Activated!</h2>
          <p className="mb-4 text-gray-300">
            Thank you for subscribing. Your {plan?.name} ({plan?.price}) has been activated.
          </p>
          <button
            className="bg-red-600 hover:bg-red-700 text-white w-full py-2 rounded"
            onClick={() => (window.location.href = '/dashboard')}
          >
            Start Exploring
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Choose your Plan</h1>
        <p className="text-gray-400">Discover the perfect plan tailored just for you.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-8 mb-10">
        {plans.map((plan) => (
          <div key={plan.id} className="relative w-[90%] max-w-[320px] sm:w-[280px] rounded-xl transition-all group">
            <div
              className={`absolute inset-0 rounded-xl blur-xl opacity-50 transition duration-500 group-hover:opacity-90 group-hover:scale-105 ${
                plan.popular
                  ? 'bg-gradient-to-tr from-green-400 via-emerald-500 to-lime-400'
                  : 'bg-gradient-to-tr from-pink-500 to-red-500'
              }`}
            ></div>

            <div
              className={`relative z-10 bg-white/10 backdrop-blur-xl text-white rounded-xl shadow-xl border border-white/10 p-6 transition-transform duration-300 group-hover:-translate-y-1 ${
                selectedPlan === plan.id ? 'ring-2 ring-red-600' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-green-500 text-xs px-3 py-1 rounded-b-full font-bold shadow-lg">
                  MOST POPULAR
                </div>
              )}
              <h2 className="text-xl font-semibold mb-1">{plan.name}</h2>
              <p className="text-gray-300 text-sm mb-2">{plan.duration}</p>
              <p className="text-3xl font-bold mb-4">
                {plan.price} <span className="text-sm font-light">/ month</span>
              </p>
              <ul className="text-sm space-y-2 mb-4">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    ✅ {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePlanClick(plan.id)}
                className={`w-full py-2 rounded-md font-semibold transition ${
                  selectedPlan === plan.id
                    ? 'bg-red-600 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {selectedPlan === plan.id ? 'Selected' : 'Get it now'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <div
          ref={confirmRef}
          className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg border border-white/10"
        >
          <h2 className="text-2xl font-bold mb-2">Confirm Your Subscription</h2>
          <p className="text-gray-300 mb-4">
            You have selected the {plans.find((p) => p.id === selectedPlan)?.name} plan for{' '}
            {plans.find((p) => p.id === selectedPlan)?.price}.
          </p>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            onClick={handleSubscribe}
            disabled={isProcessing}
            className="bg-red-600 hover:bg-red-700 text-white w-full py-3 rounded flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                Subscribe Now <span className="text-lg">→</span>
              </>
            )}
          </button>
          <p className="text-gray-400 text-center mt-3">
            You can cancel your subscription at any time from your account settings
          </p>
        </div>
      )}
    </div>
  );
}
