export default function Features() {
  const features = [
    {
      icon: 'fa-robot',
      title: 'AI Damage Detection',
      description: 'Advanced AI analyzes roof photos to instantly identify hail damage, wind damage, and storm impacts with 99% accuracy.',
      items: ['Instant damage analysis', 'Photo documentation', 'AI-powered reports'],
      featured: false
    },
    {
      icon: 'fa-file-invoice-dollar',
      title: 'Claim Automation',
      description: 'Automatically generate insurance claims with detailed reports, photos, and damage assessments ready for adjuster review.',
      items: ['One-click claim generation', 'Adjuster-ready reports', 'Supplement tracking'],
      featured: true
    },
    {
      icon: 'fa-camera',
      title: 'Digital Inspections',
      description: 'Conduct professional roof inspections with our mobile app. Capture measurements, photos, and notes in minutes.',
      items: ['Mobile inspection app', 'Roof measurements', 'Before/after photos'],
      featured: false
    },
    {
      icon: 'fa-cloud-showers-heavy',
      title: 'Storm Tracking',
      description: 'Get real-time storm alerts and hail maps. Know exactly when and where storms hit to target your canvassing efforts.',
      items: ['Real-time storm alerts', 'Hail size mapping', 'Territory targeting'],
      featured: false
    },
    {
      icon: 'fa-user-circle',
      title: 'Homeowner Portal',
      description: 'Branded customer portal where homeowners track their project status, view photos, and sign contracts digitally.',
      items: ['Project tracking', 'Digital signatures', 'Payment processing'],
      featured: false
    },
    {
      icon: 'fa-chart-line',
      title: 'Sales Pipeline CRM',
      description: 'Manage leads, track progress, and close more deals with our roofing-specific CRM built for storm restoration.',
      items: ['Lead management', 'Pipeline tracking', 'Team performance'],
      featured: false
    }
  ]

  return (
    <section id="features" className="features-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Powerful Roofing Features</h2>
          <p className="section-subtitle">Everything you need to close more deals</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card ${feature.featured ? 'featured' : ''}`}
            >
              {feature.featured && <div className="feature-badge">Most Popular</div>}
              <div className="feature-icon">
                <i className={`fas ${feature.icon}`}></i>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <ul className="feature-list">
                {feature.items.map((item, i) => (
                  <li key={i}>
                    <i className="fas fa-check"></i> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
