
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Login from "../components/Login";
import Signup from "../components/Signup";
import DashBoard from "../components/DashBoard";
import MovieDetail from "../pages/MovieDetail";
import AddMovie from "../components/AddMovie";
import AboutUs from "../pages/AboutUs";
import Success from "../pages/Success";
import ProtectedRoute from "./ProtectedRoute";
import SubscriptionPlan from "../pages/SubscriptionPlan";
import FilterPanel from '../pages/FilterPanel'
import CancelPayment from '../pages/CancelPayment'
const RoutingModule: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/subscription" element={<SubscriptionPlan />} />
      <Route path="/addmovie" element={<AddMovie />} />
      <Route path="/filterpanel" element={<FilterPanel />} />

      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/success" element={<Success />} />
      <Route path="/cancelpayment" element={<CancelPayment />} />

    </Routes>
  );
};

export default RoutingModule;
