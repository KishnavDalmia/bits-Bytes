import { useEffect, useState } from 'react'
import api from '../../services/apiService'
import Navbar from '../../components/Navbar/Navbar'
import ChatModal from '../../components/ChatModal/ChatModal'
import formValidation from '../../services/formValidation'
import './RunnerDashboard.css'

const RunnerDashboard = () => {
  const [availableOrders, setAvailableOrders] = useState([])
  const [myDeliveries, setMyDeliveries] = useState([])
  const [accepting, setAccepting] = useState(null)
  const [completing, setCompleting] = useState(null)
  const [error, setError] = useState('')
  const [chatOrderId, setChatOrderId] = useState(null)

  const fetchData = async () => {
    try {
      const [pendingRes, myDeliveriesRes] = await Promise.all([
        api.get('/orders/pending'),
        api.get('/orders/my-deliveries')
      ])
      setAvailableOrders(pendingRes.data)
      setMyDeliveries(myDeliveriesRes.data)
    } catch {
      setError('Failed to load orders.')
    }
  }

  useEffect(() => {
    fetchData()
    const poll = setInterval(fetchData, 10000)
    return () => clearInterval(poll)
  }, [])

  const handleAccept = async (orderId) => {
    setAccepting(orderId)
    try {
      await api.patch(`/orders/${orderId}/accept`)
      await fetchData()
      formValidation.showSuccess('Order accepted!')
    } catch (err) {
      setError(err.message || 'Failed to accept order.')
      formValidation.showErrorToast(err.message || 'Failed to accept order.')
    } finally {
      setAccepting(null)
    }
  }

  const handleComplete = async (orderId) => {
    setCompleting(orderId)
    try {
      await api.patch(`/orders/${orderId}/complete`)
      await fetchData()
      formValidation.showSuccess('Delivery completed!')
    } catch (err) {
      setError(err.message || 'Failed to complete order.')
      formValidation.showErrorToast(err.message || 'Failed to complete order.')
    } finally {
      setCompleting(null)
    }
  }

  const statusBadge = (status) => (
    <span className={`status-badge ${status}`}>{status}</span>
  )

  const activeDeliveries = myDeliveries.filter(o => o.status === 'active')
  const completedDeliveries = myDeliveries.filter(o => o.status === 'completed')

  return (
    <div className="runner-dashboard">
      <Navbar />
      {chatOrderId && (
        <ChatModal
          orderId={chatOrderId}
          onClose={() => setChatOrderId(null)}
          userRole="runner"
        />
      )}

      <div className="runner-container">
        <div className="runner-header">
          <div>
            <h1>Runner Dashboard</h1>
            <p>Pick up and deliver orders around campus.</p>
          </div>
          <span className="runner-badge">Runner</span>
        </div>

        {error && (
          <div className="error-alert">
            <span>{error}</span>
            <button onClick={() => setError('')}>×</button>
          </div>
        )}

        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-number available">{availableOrders.length}</div>
            <div className="stat-label">Available</div>
          </div>
          <div className="stat-card">
            <div className="stat-number active">{activeDeliveries.length}</div>
            <div className="stat-label">My Active</div>
          </div>
          <div className="stat-card">
            <div className="stat-number completed">{completedDeliveries.length}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>

        <div className="content-row">
          <div className="section">
            <h4 className="section-title">Available Orders</h4>
            {availableOrders.length === 0 ? (
              <div className="empty-state">No pending orders right now. Check back soon!</div>
            ) : (
              <div className="orders-list">
                {availableOrders.map(order => (
                  <div key={order._id} className="order-card">
                    <div className="order-header">
                      <div className="order-badges">
                        <span className="location-badge from">From: {order.from}</span>
                        <span className="arrow-text">→</span>
                        <span className="location-badge to">To: {order.to}</span>
                      </div>
                      {statusBadge(order.status)}
                    </div>
                    <p className="order-description">{order.description}</p>
                    <div className="order-cost">₹{order.cost || 50}</div>
                    <div className="order-footer">
                      <small className="order-time">
                        {new Date(order.createdAt).toLocaleString()}
                      </small>
                      <button
                        className="accept-btn"
                        onClick={() => handleAccept(order._id)}
                        disabled={accepting === order._id}
                      >
                        {accepting === order._id ? (
                          <><span className="spinner"></span> Accepting...</>
                        ) : 'Accept Order'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="section">
            <h4 className="section-title">My Active Deliveries</h4>
            {activeDeliveries.length === 0 ? (
              <div className="empty-state">No active deliveries.</div>
            ) : (
              <div className="orders-list">
                {activeDeliveries.map(order => (
                  <div key={order._id} className="order-card active">
                    <div className="order-header">
                      <span className="order-title">{order.from} → {order.to}</span>
                      {statusBadge(order.status)}
                    </div>
                    <p className="order-description">{order.description}</p>
                    <div className="order-cost">₹{order.cost || 50}</div>
                    <div className="order-footer">
                      <small className="order-time">
                        {new Date(order.createdAt).toLocaleString()}
                      </small>
                      <div className="action-buttons">
                        <button
                          className="chat-btn"
                          onClick={() => setChatOrderId(order._id)}
                        >
                          Chat
                        </button>
                        <button
                          className="complete-btn"
                          onClick={() => handleComplete(order._id)}
                          disabled={completing === order._id}
                        >
                          {completing === order._id ? (
                            <><span className="spinner"></span> Completing...</>
                          ) : 'Mark Delivered'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {completedDeliveries.length > 0 && (
          <div className="section completed-section">
            <h4 className="section-title">Completed Deliveries</h4>
            <div className="orders-list">
              {completedDeliveries.map(order => (
                <div key={order._id} className="order-card completed">
                  <div className="order-header">
                    <span className="order-title">{order.from} → {order.to}</span>
                    {statusBadge(order.status)}
                  </div>
                  <p className="order-description">{order.description}</p>
                  <div className="order-cost">₹{order.cost || 50}</div>
                  <div className="order-footer">
                    <small className="order-time">
                      {new Date(order.createdAt).toLocaleString()}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RunnerDashboard