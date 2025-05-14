import React from 'react'
import Footer from './Footer'
import Header from './Header'
import LandingPage from './LandingPage'
import { Car } from 'lucide-react'
import MovieCard from './MovieCard'
import SubscriptionPlan from '../pages/SubscriptionPlan'
function DashBoard() {
  return (
    <div>
<Header />
<LandingPage />
<MovieCard role="user" />

 <SubscriptionPlan />
<Footer/>


    </div>

  )
}

export default DashBoard