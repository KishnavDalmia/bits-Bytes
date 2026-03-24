import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './ChatModal.css'

const API = 'http://localhost:3000/api/orders'

const ChatModal = ({ orderId, onClose, userRole }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    let isMounted = true
    
    const fetchMessages = async () => {
      try {
        console.log('Fetching messages for orderId:', orderId)
        const res = await axios.get(`${API}/${orderId}/messages`, { withCredentials: true })
        if (isMounted) {
          setMessages(res.data)
          setLoading(false)
          setError('')
        }
      } catch (err) {
        if (isMounted) {
          console.error('Chat error:', err.response?.status, err.response?.data)
          setError(`Error ${err.response?.status}: ${err.response?.data?.message || 'Failed to load messages'}`)
          setLoading(false)
        }
      }
    }

    fetchMessages()
    const interval = setInterval(fetchMessages, 3000)
    
    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [orderId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    try {
      const res = await axios.post(
        `${API}/${orderId}/messages`,
        { text: newMessage },
        { withCredentials: true }
      )
      setMessages(prev => [...prev, res.data])
      setNewMessage('')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message')
    }
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const getSenderLabel = (senderRole) => {
    if (senderRole === userRole) return 'You'
    return senderRole === 'customer' ? 'Customer' : 'Runner'
  }

  return (
    <div className="chat-modal-overlay" onClick={onClose}>
      <div className="chat-modal" onClick={e => e.stopPropagation()}>
        <div className="chat-header">
          <h3>Chat</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {loading ? (
          <div className="chat-loading">Loading messages...</div>
        ) : error ? (
          <div className="chat-error">{error}</div>
        ) : (
          <>
            <div className="chat-messages">
              {messages.length === 0 ? (
                <div className="no-messages">No messages yet. Start the conversation!</div>
              ) : (
                messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`message ${msg.senderRole === userRole ? 'own' : 'other'}`}
                  >
                    <div className="message-header">
                      <span className="sender-role">{getSenderLabel(msg.senderRole)}</span>
                      <span className="message-time">{formatTime(msg.createdAt)}</span>
                    </div>
                    <div className="message-text">{msg.text}</div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <form className="chat-input-form" onSubmit={handleSend}>
              <input
                type="text"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="chat-input"
              />
              <button type="submit" className="send-btn" disabled={!newMessage.trim()}>
                Send
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default ChatModal