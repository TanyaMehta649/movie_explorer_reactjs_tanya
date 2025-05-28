
import React, { useState, useRef, useEffect } from 'react';
import { Plan } from '../pages/Types';
import { createSubscription } from '../services/Subscription';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import tick from '../assets/checked.png';

export default function SubscriptionPlan() {
  window.scrollTo(0, 0);
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPremiumActive, setIsPremiumActive] = useState(false);
  const [userPlanId, setUserPlanId] = useState<string | null>(null);
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

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser.plan && parsedUser.plan !== 'free') {
          setIsPremiumActive(true);
          setUserPlanId(parsedUser.plan);
        }
      } catch (err) {
        console.error('Failed to parse user data:', err);
      }
    }
  }, []);

  const handlePlanClick = (planId: string) => {
    if (!isLoggedIn) {
      toast.error('Please login to select a subscription plan!');
      return;
    }

    if (isPremiumActive) {
      toast.error('You already have an active premium subscription.');
      return;
    }

    setSelectedPlan(planId);
    setTimeout(() => {
      confirmRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
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
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Discover the perfect plan tailored just for you</h1>
        {isPremiumActive && (
          <p className="text-yellow-400 mt-2 text-sm">You already have an active premium plan: <strong>{userPlanId}</strong></p>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-8 mb-10">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-gray-900 border-2 border-white/10 hover:border-yellow-400 rounded-xl w-[280px] text-center p-6 shadow-lg hover:scale-105 transition-all duration-300">
            <h3 className="text-yellow-400 font-semibold mb-2 text-xl">{plan.name}</h3>
            <p className="text-gray-400 text-sm mb-2">{plan.duration}</p>
            <p className="text-3xl font-bold mb-4">{plan.price} <span className="text-sm font-light">/Month</span></p>
            <ul className="text-sm text-left space-y-2 mb-4">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <img src={tick} alt="tick" className="w-4 h-4" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handlePlanClick(plan.id)}
              disabled={isPremiumActive}
              className={`w-full py-2 rounded font-semibold transition ${
                isPremiumActive
                  ? 'bg-gray-600 cursor-not-allowed text-white'
                  : selectedPlan === plan.id
                    ? 'bg-yellow-500 text-white'
                    : 'bg-yellow-500 hover:bg-yellow-600 text-black'
              }`}
            >
              {isPremiumActive ? 'Already Subscribed' : selectedPlan === plan.id ? 'Selected' : 'Get it now'}
            </button>
          </div>
        ))}
      </div>

      {selectedPlan && !isPremiumActive && (
        <div ref={confirmRef} className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg border border-white/10">
          <h2 className="text-2xl font-bold mb-2">Confirm Your Subscription</h2>
          <p className="text-gray-300 mb-4">
            You have selected the {plans.find((p) => p.id === selectedPlan)?.name} plan for{' '}
            {plans.find((p) => p.id === selectedPlan)?.price}.
          </p>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            onClick={handleSubscribe}
            disabled={isProcessing}
            className="bg-yellow-600 hover:bg-yellow-700 text-white w-full py-3 rounded flex items-center justify-center gap-2"
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
