export default function Benefits() {
  const benefits = [
    {
      number: '01',
      title: 'Close More Deals Faster',
      description: 'Professional AI-generated reports build instant trust with homeowners and insurance adjusters, increasing close rates by 40%.'
    },
    {
      number: '02',
      title: 'Reduce Claim Denials',
      description: 'AI-powered damage detection ensures you never miss hail hits, reducing claim denials and increasing supplement approvals.'
    },
    {
      number: '03',
      title: 'Scale Your Operations',
      description: 'Manage more projects with less overhead. Our automation tools let you handle 3x more jobs with the same team size.'
    },
    {
      number: '04',
      title: 'Get Paid Faster',
      description: 'Integrated payment processing and digital contracts reduce payment cycles from 45 days to 15 days on average.'
    }
  ]

  return (
    <section id="benefits" className="benefits-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Why Roofing Contractors Choose ImpactIQ</h2>
          <p className="section-subtitle">Real results for your roofing business</p>
        </div>

        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <div className="benefit-number">{benefit.number}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
