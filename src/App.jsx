import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Events from './components/Events'
import Gallery from './components/Gallery'
import Booking from './components/Booking'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-night font-sans overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Events />
      <Gallery />
      <Booking />
      <Footer />
    </div>
  )
}
