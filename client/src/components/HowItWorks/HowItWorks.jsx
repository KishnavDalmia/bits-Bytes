import './HowItWorks.css'

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Place Your Order',
      description: 'Submit a delivery request with pickup and drop-off locations. Add special instructions for the runner.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 11l3 3L22 4"/>
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
        </svg>
      )
    },
    {
      number: '02',
      title: 'Runner Accepts',
      description: 'A verified runner from your campus accepts your delivery request and picks up your package.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="7" r="4"/>
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
        </svg>
      )
    },
    {
      number: '03',
      title: 'Get Delivered',
      description: 'Track your delivery in real-time and receive your package at your doorstep. Simple and fast!',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13"/>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
          <circle cx="5.5" cy="18.5" r="2.5"/>
          <circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      )
    }
  ]

  return (
    <section id="how-it-works" className="how-it-works">
      <div className="hiw-container">
        <div className="hiw-header">
          <h2 className="hiw-title">How It Works</h2>
          <p className="hiw-subtitle">Get your packages delivered in three simple steps</p>
        </div>
        
        <div className="hiw-steps">
          {steps.map((step, index) => (
            <div key={index} className="hiw-step">
              <div className="hiw-icon-wrapper">
                <div className="hiw-icon">{step.icon}</div>
                <span className="hiw-number">{step.number}</span>
              </div>
              <h3 className="hiw-step-title">{step.title}</h3>
              <p className="hiw-step-description">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hiw-connector">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks