import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Benefits from './components/Benefits'
import HowItWorks from './components/HowItWorks'
import SocialProof from './components/SocialProof'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Page transition effect
    setIsLoaded(true)
  }, [])

  return (
    <div className={`page-transition ${isLoaded ? 'loaded' : ''}`}>
      <Navbar />
      <Hero />
      <Features />
      <Benefits />
      <HowItWorks />
      <SocialProof />
      <CTASection />
      <Footer />
    </div>
  )
}

export default App
