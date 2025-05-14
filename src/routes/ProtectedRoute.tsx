import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Login from '../components/Login'; 

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  const [showModal, setShowModal] = useState(!token);

  if (!token && showModal) {
    return <Login />;
  }

  return <Outlet />;
};

export default ProtectedRoute;