import React from 'react'
import './CurrentCard.css'
const CurrentCard = ({from,to,runner}) => {
  return (
    <div className='card-container'>
        <div className="tag">
          <span>On the way</span>
        </div>
        <div className="flex-item">
            <h2>From</h2>
            <span>{from}</span>
        </div>
        <div className="flex-item">
            <h2>To</h2>
            <span>{to}</span>
        </div>
        <div className="flex-item">
            <h2>Runner</h2>
            <span>{runner}</span>
        </div>
    </div>
  )
}

export default CurrentCard