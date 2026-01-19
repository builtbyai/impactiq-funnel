import { useState, useEffect } from 'react'
import { useCounter } from '../hooks/useCounter'

export default function Hero() {
  const [showContent, setShowContent] = useState(false)

  const approvalRate = useCounter(95, 2000)
  const claimTime = useCounter(48, 2000)
  const projectValue = useCounter(12, 2000)

  useEffect(() => {
    // Hide logo intro and show content after 2 seconds
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (e, id) => {
    e.preventDefault()
    const element = document.querySelector(id)
    if (element) {
      const navbarHeight = 72
      const targetPosition = element.offsetTop - navbarHeight
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="hero">
      <div className="video-container">
        <div className="logo-intro-video" id="logoIntro" style={{ opacity: showContent ? 0 : 1 }}>
          <div className="logo-animation">
            <img
              src="/assets/impactiq-logo-animated.gif"
              alt="ImpactIQ Logo Animation"
              className="animated-logo"
              onError={(e) => {
                e.target.parentElement.innerHTML = '<div class="logo-fallback"><i class="fas fa-home"></i><span>ImpactIQ</span></div>'
              }}
            />
          </div>
        </div>
      </div>

      <div className="hero-content" style={{ opacity: showContent ? 1 : 0 }}>
        <div className="container">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="title-line">Transform Roofing Claims Into</span>
              <span className="title-highlight">Instant Approvals</span>
            </h1>
            <p className="hero-subtitle">
              The future of roofing is here. ImpactIQ uses AI to detect storm damage, automate insurance claims, and close more roofing projects faster.
            </p>
            <div className="hero-cta">
              <a href="#get-started" className="btn btn-primary btn-lg" onClick={(e) => scrollToSection(e, '#get-started')}>
                Start Free Trial
                <i className="fas fa-arrow-right"></i>
              </a>
              <a href="#features" className="btn btn-secondary btn-lg" onClick={(e) => scrollToSection(e, '#features')}>
                See How It Works
                <i className="fas fa-chevron-down"></i>
              </a>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">{approvalRate}%</span>
                <span className="stat-label">Claim Approval Rate</span>
              </div>
              <div className="stat">
                <span className="stat-number">{claimTime}hrs</span>
                <span className="stat-label">Average Claim Time</span>
              </div>
              <div className="stat">
                <span className="stat-number">${projectValue}k</span>
                <span className="stat-label">Avg. Project Value</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-bg">
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
        <div className="bg-orb orb-3"></div>
      </div>
    </section>
  )
}
