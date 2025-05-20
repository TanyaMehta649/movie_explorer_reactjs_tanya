import React from 'react';
import cancelPaymentGif from '../assets/cancelpayment.gif'; 

const CancelPayment: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0c1634] px-4 text-center">
    
      <img
        src={cancelPaymentGif}
        alt="Transfer Failed"
        className="w-32 h-32 mb-6"
      />

      <h1 className="text-white text-2xl font-semibold mb-2">Transfer Failed</h1>
      <p className="text-gray-300 text-sm max-w-md">
        An unexpected error occurred while processing your request. Please try again later.
      </p>
    </div>
  );
};

export default CancelPayment;
