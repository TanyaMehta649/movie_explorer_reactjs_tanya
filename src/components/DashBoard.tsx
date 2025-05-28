import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import LandingPage from './LandingPage';
import MovieCard from './MovieCard';
import SubscriptionPlan from '../pages/SubscriptionPlan';

function DashBoard() {
  const [role, setRole] = useState<string | undefined>();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed && typeof parsed === "object") {
          setRole(parsed.role);
        }
      } catch (err) {
        console.warn("Invalid user data in localStorage:", err);
      }
    }
  }, []);

  return (
    <div>
      <LandingPage />
      <MovieCard />

      {role !== 'supervisor' && <SubscriptionPlan />}

      {/* <Footer /> */}
    </div>
  );
}

export default DashBoard;
