
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const Success = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);
  const location = useLocation();
  const { width, height } = useWindowSize();

 
  const handlePaymentSuccess = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      parsedUser.plan = 'premium'; 
      localStorage.setItem("user", JSON.stringify(parsedUser));
    }
  };

  useEffect(() => {
    const verifySubscription = async () => {
      const params = new URLSearchParams(location.search);
      const sessionId = params.get('session_id');

      if (!sessionId) {
        setError('No session ID found in the URL.');
        setLoading(false);
        return;
      }

      try {
        const authToken = localStorage.getItem('token');
        if (!authToken) {
          setError('Authentication token not found. Please login again.');
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `https://movie-explorer-app.onrender.com/api/v1/subscriptions/success?session_id=${sessionId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

       
        setSubscriptionDetails(response.data);
        handlePaymentSuccess(); 

        setLoading(false);
      } catch (err: any) {
        console.error('Error verifying subscription:', err);
        setError(
          err.response?.data?.error ||
          'Failed to verify subscription. Please try again.'
        );
        setLoading(false);
      }
    };

    verifySubscription();
  }, [location]);

  return (
    <div className="bg-[#14141e] min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white text-black rounded-xl border border-white/10 p-8 text-center shadow-md">
          {loading ? (
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
              <h2 className="text-lg font-semibold">Verifying your subscription...</h2>
            </div>
          ) : error ? (
            <>
              <h2 className="text-2xl font-bold mb-2">Subscription Error</h2>
              <p className="text-red-500 mb-6">{error}</p>
              <button
                onClick={() => (window.location.href = '/user/subscription')}
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded"
              >
                Try Again
              </button>
            </>
          ) : (
            <>
              <Confetti width={width} height={height} />
              <div className="w-24 h-30 mx-auto mb-6">
                <img
                  src="https://i.gifer.com/7efs.gif"
                  alt="Success Tick"
                  className="w-full h-full object-contain"
                />
              </div>

              <h2 className="text-2xl font-bold mb-2">
                Hooray! <br /> Your subscription is activated!
              </h2>

              <p className="text-white/70 mb-6">
                Your subscription has been successfully activated.
                {subscriptionDetails?.plan_name &&
                  ` Enjoy your ${subscriptionDetails.plan_name}!`}
              </p>
              <button
                onClick={() => (window.location.href = '/dashboard')}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded"
              >
                Start Exploring Movies
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Success;
