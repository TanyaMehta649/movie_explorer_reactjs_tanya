import React, { useEffect } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import './index.css';
import { Toaster } from 'react-hot-toast';
import  RoutingModule  from './routes/RoutingModule';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Carousel from './components/LandingPage';
import { generateToken, messaging, onMessage } from './Notifications/firebase';
import { BrowserRouter } from "react-router-dom";

function App() {
  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) => {
      console.log("Foreground message received:", payload);
    });
  }, []);
  return (
    <>
     <Toaster position="top-right" />
    
    <BrowserRouter>
    <RoutingModule />
    </BrowserRouter>
    </>



  );
}

export default App;
