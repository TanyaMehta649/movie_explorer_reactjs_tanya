import React, { useEffect } from 'react';
import './index.css';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast'
import RoutingModule from './routes/RoutingModule';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Carousel from './components/LandingPage';
import { generateToken, messaging, onMessage } from './Notifications/firebase';
import { BrowserRouter, useLocation } from "react-router-dom";
import './i18n'; // Ensure this is imported once


function LayoutWrapper() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/' || location.pathname === '/signup' || location.pathname==='/cancelpayment' || location.pathname==='/success';

  return (
    <>
      {!hideHeaderFooter && <Header />}
 <Toaster
  position="top-right"
  toastOptions={{
    duration: 8000,
    style: {
      background: '#333',
      color: '#fff',
      borderRadius: '10px',
      padding: '14px 20px',
      fontSize: '15px',
    },
    success: {
      style: {
        background: '#22c55e', 
        color: '#fff',
      },
    },
    error: {
      style: {
        background: '#ef4444', 
        color: '#fff',
      },
    },
  }}
/>
      <RoutingModule />
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  useEffect(() => {
  generateToken();

  onMessage(messaging, (payload) => {
    console.log("Foreground message received:", payload);

    const { title, body } = payload.notification || {};

    if (title && body) {
      toast(`${title}: ${body}`);
    }
  });
}, []); 

  return (
    <BrowserRouter>
      <LayoutWrapper />
    </BrowserRouter>
  );
}

export default App;
