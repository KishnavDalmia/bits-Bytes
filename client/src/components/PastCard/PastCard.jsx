import React from 'react'
import './PastCard.css'

const PastCard = ({from,to,runner}) => {
  return (
    <div className='card-container'>
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

export default PastCard