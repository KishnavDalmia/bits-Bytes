import React from 'react'
import './Hero.css'

const Hero = () => {
  return (
    <div className='hero-container'>
      <div className="info">
        <h1 className='hero-text'>Parcels Delivered.<br/><span className='grad'>Campus Fast.</span></h1>
        <p className='info-text'>Get your packages delivered across campus in no time! Earn money as a runner or track your deliveries in real time.</p>
        <div className="cta">
          <button className='customer'>Request Delivery</button>
          <button className='runner'>Become a runner</button>
        </div>
      </div>
      <div className="image">
        <img src="/hero.png" alt="" />
      </div>
    </div>
  )
}

export default Hero