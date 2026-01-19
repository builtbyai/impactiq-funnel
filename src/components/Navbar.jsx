import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    document.body.style.overflow = !isMenuOpen ? 'hidden' : ''
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    document.body.style.overflow = ''
  }

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
      closeMenu()
    }
  }

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <div className="nav-brand">
          <img
            src="/assets/impactiq-logo.png"
            alt="ImpactIQ Logo"
            className="nav-logo"
            onError={(e) => (e.target.style.display = 'none')}
          />
          <span className="brand-text">ImpactIQ</span>
        </div>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="navMenu">
          <a href="#features" className="nav-link" onClick={(e) => scrollToSection(e, '#features')}>
            Features
          </a>
          <a href="#benefits" className="nav-link" onClick={(e) => scrollToSection(e, '#benefits')}>
            Benefits
          </a>
          <a href="#how-it-works" className="nav-link" onClick={(e) => scrollToSection(e, '#how-it-works')}>
            How It Works
          </a>
          <a href="#get-started" className="nav-link nav-link-cta" onClick={(e) => scrollToSection(e, '#get-started')}>
            Get Started
          </a>
        </div>

        <button
          className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
          id="navToggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}
