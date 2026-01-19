import React from 'react'

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: 'fa-mobile-alt',
      title: 'Inspect & Document',
      description: 'Use our mobile app to photograph roof damage. AI instantly analyzes and identifies all impacts.'
    },
    {
      number: 2,
      icon: 'fa-file-alt',
      title: 'Generate Report',
      description: 'AI creates a professional inspection report with damage maps, photos, and measurements in seconds.'
    },
    {
      number: 3,
      icon: 'fa-handshake',
      title: 'Submit Claim',
      description: 'Send the report to insurance, get homeowner signatures, and track claim status in real-time.'
    },
    {
      number: 4,
      icon: 'fa-money-bill-wave',
      title: 'Close & Get Paid',
      description: 'Complete the project, collect payment through the platform, and start your next job.'
    }
  ]

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">How ImpactIQ Works</h2>
          <p className="section-subtitle">From inspection to payment in 4 simple steps</p>
        </div>

        <div className="steps-container">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="step">
                <div className="step-number">{step.number}</div>
                <div className="step-icon">
                  <i className={`fas ${step.icon}`}></i>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="step-arrow">
                  <i className="fas fa-arrow-right"></i>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
