import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './NewOrderModal.css'

const NewOrderModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Close on Escape key and prevent body scroll
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.from.trim() || !formData.to.trim() || !formData.description.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await axios.post('http://localhost:3000/api/orders', formData, { 
        withCredentials: true 
      });
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div 
      className='modal-overlay' 
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '1rem'
      }}
    >
      <div 
        className='modal' 
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#111113',
          border: '1px solid #2a2a2d',
          borderRadius: '1rem',
          padding: '2rem',
          width: '100%',
          maxWidth: '480px'
        }}
      >
        <div className='modal-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #2a2a2d' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#ffffff' }}>New Delivery Request</h2>
          <button className='close-btn' onClick={onClose} aria-label="Close" style={{ background: 'none', border: 'none', color: '#6b6b70', fontSize: '1.5rem', cursor: 'pointer', padding: '0.25rem' }}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className='modal-form' style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {error && <p className='modal-error' style={{ color: '#ff6b6b', fontSize: '0.875rem', padding: '0.75rem 1rem', background: 'rgba(255, 107, 107, 0.1)', border: '1px solid rgba(255, 107, 107, 0.2)', borderRadius: '0.5rem', textAlign: 'center' }}>{error}</p>}
          
          <div className='modal-input-gp' style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="from" style={{ fontSize: '0.875rem', color: '#a0a0a5', fontWeight: '500' }}>Pickup Location</label>
            <input
              id="from"
              name="from"
              type='text'
              placeholder='e.g. Hostel Block A, Main Gate'
              value={formData.from}
              onChange={handleChange}
              autoFocus
              style={{ background: '#1a1a1d', border: '1px solid #2a2a2d', borderRadius: '0.5rem', color: '#ffffff', padding: '0.875rem 1rem', fontSize: '0.95rem', outline: 'none', width: '100%' }}
            />
          </div>
          
          <div className='modal-input-gp' style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="to" style={{ fontSize: '0.875rem', color: '#a0a0a5', fontWeight: '500' }}>Drop Location</label>
            <input
              id="to"
              name="to"
              type='text'
              placeholder='e.g. Library, Canteen, Academic Block'
              value={formData.to}
              onChange={handleChange}
              style={{ background: '#1a1a1d', border: '1px solid #2a2a2d', borderRadius: '0.5rem', color: '#ffffff', padding: '0.875rem 1rem', fontSize: '0.95rem', outline: 'none', width: '100%' }}
            />
          </div>
          
          <div className='modal-input-gp' style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="description" style={{ fontSize: '0.875rem', color: '#a0a0a5', fontWeight: '500' }}>Description</label>
            <textarea
              id="description"
              name="description"
              placeholder='Describe what needs to be delivered (size, weight, special instructions)'
              value={formData.description}
              onChange={handleChange}
              rows={4}
              style={{ background: '#1a1a1d', border: '1px solid #2a2a2d', borderRadius: '0.5rem', color: '#ffffff', padding: '0.875rem 1rem', fontSize: '0.95rem', outline: 'none', width: '100%', resize: 'none' }}
            />
          </div>
          
          <button type='submit' className='modal-submit' disabled={loading} style={{ background: '#ff7e5b', color: '#0a0a0b', border: 'none', borderRadius: '0.5rem', padding: '1rem', fontSize: '1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}>
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default NewOrderModal;