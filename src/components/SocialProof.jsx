export default function SocialProof() {
  const testimonials = [
    {
      quote: "ImpactIQ doubled our close rate. The AI damage reports are so professional that adjusters approve claims without even scheduling inspections.",
      author: "Mike Rodriguez",
      company: "Storm Restoration Pro"
    },
    {
      quote: "We went from managing 5 projects a month to 20 projects without hiring more staff. The automation is a game-changer for our business.",
      author: "Sarah Chen",
      company: "Elite Roofing Systems"
    },
    {
      quote: "The storm tracking feature helps us get to affected areas before our competition. We've increased our lead volume by 3x.",
      author: "James Wilson",
      company: "Apex Exteriors"
    }
  ]

  return (
    <section className="social-proof-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Trusted By Leading Roofing Contractors</h2>
        </div>

        <div className="testimonials">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial">
              <div className="quote-icon">
                <i className="fas fa-quote-left"></i>
              </div>
              <p className="testimonial-text">{testimonial.quote}</p>
              <div className="testimonial-author">
                <strong>{testimonial.author}</strong>
                <span>{testimonial.company}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
