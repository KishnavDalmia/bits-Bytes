import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import PastCard from '../../components/PastCard/PastCard'
import NewOrderModal from '../../components/NewOrderModal/NewOrderModal'
import ChatModal from '../../components/ChatModal/ChatModal'
import api from '../../services/apiService'
import './CustomerDashboard.css'

const CustomerDashboard = () => {
  const [orders, setOrders] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [chatOrderId, setChatOrderId] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders/mine')
        if (isMounted) setOrders(res.data)
      } catch (err) {
        console.error('Failed to fetch orders', err)
      }
    }

    fetchOrders()
    return () => { isMounted = false }
  }, [])

  const activeOrders = orders.filter(o => o.status === 'pending' || o.status === 'active')
  const pastOrders = orders.filter(o => o.status === 'completed')

  const getStatusBadge = (status) => {
    const statusClass = status === 'active' ? 'status-active' : 'status-pending'
    return <span className={`status-badge ${statusClass}`}>{status}</span>
  }

  return (
    <div className="customer-page">
      <Navbar />
      {showModal && (
        <NewOrderModal onClose={() => setShowModal(false)} onSuccess={async () => {
          try {
            const res = await api.get('/orders/mine')
            setOrders(res.data)
          } catch (err) {
            console.error('Failed to refetch orders', err)
          }
        }} />
      )}
      {chatOrderId && (
        <ChatModal
          orderId={chatOrderId}
          onClose={() => setChatOrderId(null)}
          userRole="customer"
        />
      )}
      <div className="customer-container">
        <div className="header">
          <div className="heading">
            <h1>Welcome back,</h1>
            <h2>Place orders and track deliveries.</h2>
          </div>
          <button className="place-order-btn" onClick={() => setShowModal(true)}>
            New Delivery Request
          </button>
        </div>

        <div className="orders">
          <h1>Active Deliveries</h1>
          <div className="cards">
            {activeOrders.length === 0 ? (
              <p className="empty-message">No active deliveries.</p>
            ) : (
              activeOrders.map(order => (
                <div key={order._id} className="order-card">
                  <div className="order-card-header">
                    <div className="order-route">
                      <span className="from">{order.from}</span>
                      <span className="arrow">→</span>
                      <span className="to">{order.to}</span>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                  <p className="order-description">{order.description}</p>
                  <div className="order-cost">₹{order.cost || 50}</div>
                  {order.status === 'active' && order.runnerId?.name && (
                    <div className="runner-info">Runner: {order.runnerId.name}</div>
                  )}
                  {order.status === 'active' && (
                    <button
                      className="chat-btn"
                      onClick={() => setChatOrderId(order._id)}
                    >
                      Chat with Runner
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="orders">
          <h1>Past Deliveries</h1>
          <div className="cards">
            {pastOrders.length === 0 ? (
              <p className="empty-message">No past deliveries.</p>
            ) : (
              pastOrders.map(order => (
                <PastCard
                  key={order._id}
                  from={order.from}
                  to={order.to}
                  runner={order.runnerId?.name || "Unassigned"}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerDashboard