import './Testimonials.css'

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Computer Science Major',
      content: 'Bits&Bytes saved me so much time during finals week. I could focus on studying while my food deliveries came right to my dorm!',
      rating: 5,
      avatar: 'SC'
    },
    {
      name: 'Marcus Johnson',
      role: 'Business Student',
      content: 'Being a runner helps me earn extra money between classes. The app is super easy to use and I can work whenever I want.',
      rating: 5,
      avatar: 'MJ'
    },
    {
      name: 'Priya Patel',
      role: 'Biology Major',
      content: 'The real-time tracking is amazing. I always know exactly where my package is and when it will arrive. Highly recommend!',
      rating: 5,
      avatar: 'PP'
    }
  ]

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`star ${index < rating ? 'filled' : ''}`}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))
  }

  return (
    <section id="testimonials" className="testimonials">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2 className="testimonials-title">What Students Say</h2>
          <p className="testimonials-subtitle">Join thousands of students already using Bits&Bytes</p>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-rating">
                {renderStars(testimonial.rating)}
              </div>
              <p className="testimonial-content">"{testimonial.content}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{testimonial.avatar}</div>
                <div className="testimonial-info">
                  <h4 className="testimonial-name">{testimonial.name}</h4>
                  <p className="testimonial-role">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials