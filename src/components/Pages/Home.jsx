import React from 'react'
import FilterPage from '../Fillter'
import HeroSection from '../LandingSections/HeroSection'
import Navbar from '../Navbar'
import Opportunities from '../LandingSections/Opportunities'
import WhyUs from '../LandingSections/WhyUs'
import BecomePublisher from '../LandingSections/BecomePublisher'
import Faqs from '../LandingSections/Faqs'
import Pricing from '../LandingSections/Pricing'
import Contact from '../LandingSections/Contact'
import Footer from '../Footer'
import ReviewsSection from '../LandingSections/Reviews'
import Reviews from '../LandingSections/Reviews'

const Home = () => {
    return (
        <div>
            < Navbar />
            < HeroSection />
            < Opportunities />
            < WhyUs />
            < FilterPage />
            < BecomePublisher />
            < Faqs />
            < Pricing />
            < Reviews />
            < Contact />
            < Footer />
        </div>
    )
}

export default Home
