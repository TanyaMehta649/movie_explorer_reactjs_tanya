
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import cancelPaymentGif from '../assets/cancelpayment.gif';

const CancelPayment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const logCancellation = async () => {
      const params = new URLSearchParams(location.search);
      const sessionId = params.get('session_id');

      if (!sessionId) {
        setError('No session ID found in the URL.');
        setLoading(false);
        return;
      }

      try {
        const authToken = 'your-valid-jwt-token-here';
        await axios.post(
          'https://movie-explorer-app.onrender.com/api/v1/subscriptions/cancel',
          { session_id: sessionId },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setLoading(false);
      } catch (err: any) {
        setError(err?.response?.data?.error || 'Failed to process cancellation.');
        setLoading(false);
      }
    };

    logCancellation();
  }, [location.search]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0c1634] px-4 text-center">
      {loading ? (
        <>
          <div className="animate-spin h-12 w-12 border-4 border-red-600 border-t-transparent rounded-full mb-6" />
          <h2 className="text-white text-xl font-semibold">Processing cancellation...</h2>
        </>
      ) : (
        <>
          <img
            src={cancelPaymentGif}
            alt="Transfer Failed"
            className="w-32 h-32 mb-6"
          />
          <h1 className="text-white text-2xl font-semibold mb-2">Transfer Failed</h1>
          <p className="text-gray-300 text-sm max-w-md mb-4">
            {error
              ? error
              : "Your subscription process was cancelled. You can try again whenever you're ready."}
          </p>
          <button
            onClick={() => navigate('/user/subscription')}
            className="mt-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
          >
            Return to Subscription Page
          </button>
          <p className="text-sm text-gray-400 mt-4">
            Need help?{' '}
            <span
              className="text-red-400 underline cursor-pointer"
              onClick={() => navigate('/support')}
            >
              Contact Support
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default CancelPayment;
