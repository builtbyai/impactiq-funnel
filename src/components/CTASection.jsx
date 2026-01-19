import { useState } from 'react'

export default function CTASection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    projectsPerMonth: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.company.trim()) newErrors.company = 'Company name is required'
    if (!formData.projectsPerMonth) newErrors.projectsPerMonth = 'Please select projects per month'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1500))

      console.log('Form submitted:', formData)

      // Show success
      setSubmitStatus('success')

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        projectsPerMonth: ''
      })

      // Hide success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000)
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')

      setTimeout(() => setSubmitStatus(null), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="get-started" className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">Start Closing More Roofing Deals Today</h2>
          <p className="cta-subtitle">
            Join hundreds of contractors using ImpactIQ to grow their roofing business. Start your 14-day free trial - no credit card required.
          </p>

          <form className="signup-form" id="signupForm" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  className={`form-input ${errors.firstName ? 'error' : ''}`}
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && <div className="input-error">{errors.firstName}</div>}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className={`form-input ${errors.lastName ? 'error' : ''}`}
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && <div className="input-error">{errors.lastName}</div>}
              </div>
            </div>
            <div className="form-group">
              <input
                type="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                name="email"
                placeholder="Work Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="input-error">{errors.email}</div>}
            </div>
            <div className="form-group">
              <input
                type="tel"
                className={`form-input ${errors.phone ? 'error' : ''}`}
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <div className="input-error">{errors.phone}</div>}
            </div>
            <div className="form-group">
              <input
                type="text"
                className={`form-input ${errors.company ? 'error' : ''}`}
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleChange}
              />
              {errors.company && <div className="input-error">{errors.company}</div>}
            </div>
            <div className="form-group">
              <select
                className={`form-input ${errors.projectsPerMonth ? 'error' : ''}`}
                name="projectsPerMonth"
                value={formData.projectsPerMonth}
                onChange={handleChange}
              >
                <option value="">Projects Per Month</option>
                <option value="1-5">1-5 Projects</option>
                <option value="6-15">6-15 Projects</option>
                <option value="16-30">16-30 Projects</option>
                <option value="30+">30+ Projects</option>
              </select>
              {errors.projectsPerMonth && <div className="input-error">{errors.projectsPerMonth}</div>}
            </div>
            <button
              type="submit"
              className={`btn btn-primary btn-lg btn-block ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              {!isSubmitting && (
                <>
                  Start Free 14-Day Trial
                  <i className="fas fa-arrow-right"></i>
                </>
              )}
            </button>
          </form>

          {submitStatus === 'success' && (
            <div className="form-success" style={{
              background: '#10b981',
              color: 'white',
              padding: '1rem',
              borderRadius: '0.75rem',
              textAlign: 'center',
              marginTop: '1rem',
              animation: 'fadeInUp 0.5s'
            }}>
              <i className="fas fa-check-circle" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></i>
              <p style={{ margin: 0, fontWeight: 600 }}>Success!</p>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem' }}>We'll be in touch soon.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="form-error" style={{
              background: '#ef4444',
              color: 'white',
              padding: '1rem',
              borderRadius: '0.75rem',
              textAlign: 'center',
              marginTop: '1rem',
              animation: 'fadeInUp 0.5s'
            }}>
              <i className="fas fa-exclamation-circle" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></i>
              <p style={{ margin: 0, fontWeight: 600 }}>Error</p>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem' }}>Something went wrong. Please try again.</p>
            </div>
          )}

          <div className="cta-features">
            <div className="cta-feature">
              <i className="fas fa-check-circle"></i>
              <span>No credit card required</span>
            </div>
            <div className="cta-feature">
              <i className="fas fa-check-circle"></i>
              <span>Full access to all features</span>
            </div>
            <div className="cta-feature">
              <i className="fas fa-check-circle"></i>
              <span>Cancel anytime</span>
            </div>
          </div>

          <div className="cta-note">
            <i className="fas fa-lock"></i>
            <span>Your information is secure. We never share your data.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
