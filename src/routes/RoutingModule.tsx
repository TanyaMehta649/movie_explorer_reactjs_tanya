// import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import Login from "../components/Login";
// import Signup from "../components/Signup";
// import { BookDashed } from "lucide-react";
// import DashBoard from "../components/DashBoard";
// import MovieDetail from "../pages/MovieDetail";
// import FilterPanel from "../pages/FilterPanel";
// import AddMovie from "../components/AddMovie";
// import AboutUs from "../pages/AboutUs";
// import Success from "../pages/Success";

// const RoutingModule: React.FC = () => {
//   const route = createBrowserRouter([
//     {
//       path: '',
//       element: <Login />,
//     },
//     {
//       path: '/signup',
//       element: <Signup />,
//     },
//     {
//       path: '/moviedetail',
//       element: <MovieDetail />
//     },
//     {
//       path: '/movie/:id',
//       element: <MovieDetail />
//     },
//     {
//       path: '/filterpanel',
//       element: <FilterPanel />
//     },
//     {
//       path: '/addmovie',
//       element: <AddMovie />
//     },
//     {
//       path: '/aboutus',
//       element: <AboutUs/>
//     },
//     {
//       path: '/success',
//       element: <Success/>
//     },
//   {path:'/footer',
//   element: <Footer />},
//     {
//       path: '/dashboard',
//       element: <DashBoard />,
  
//     },
//   ]);

//   return <RouterProvider router={route} />;
// };

// export default RoutingModule;
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Login from "../components/Login";
import Signup from "../components/Signup";
import DashBoard from "../components/DashBoard";
import MovieDetail from "../pages/MovieDetail";
import FilterPanel from "../pages/FilterPanel";
import AddMovie from "../components/AddMovie";
import AboutUs from "../pages/AboutUs";
import Success from "../pages/Success";
import ProtectedRoute from "./ProtectedRoute";
import SubscriptionPlan from "../pages/SubscriptionPlan";

const RoutingModule: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Dashboard and nested routes */}
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/dashboard/subscription" element={<SubscriptionPlan />} />
      <Route path="/addmovie" element={<AddMovie />} />
      <Route path="/filterpanel" element={<FilterPanel />} />

      {/* Other pages */}
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );44444
};

export default RoutingModule;
