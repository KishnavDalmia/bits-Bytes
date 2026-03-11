import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
//import { useEffect, useState } from 'react'
import CurrentCard from '../../components/CurrentCard/CurrentCard'
import PastCard from '../../components/PastCard/PastCard'
import './CustomerDashboard.css'

const CustomerDashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="customer-container">
        <div className="header">
          <div className="heading">
            <h1>Welcome back,</h1>
            <h2>Place orders and track deliveries.</h2>
          </div>
          <button className='place-order-btn'>New Delivery Request</button>
        </div>
        <div className="orders">
          <h1>Active Deliveries</h1>
          <div className="cards">
            <CurrentCard key={1} from="Location A" to="Location B" runner="John Doe"/>
          </div>
        </div>
        <div className="orders">
          <h1>Past Deliveries</h1>
          <div className="cards">
            <PastCard key={1} from="Location A" to="Location B" runner="John Doe"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerDashboard