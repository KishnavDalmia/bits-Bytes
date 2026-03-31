import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import api from '../../services/apiService'
import './NewOrderModal.css'

const NewOrderModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    description: '',
    cost: 50
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
      await api.post('/orders', formData);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to create order. Please try again.');
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
      className='nom-overlay' 
      onClick={handleOverlayClick}
    >
      <div 
        className='nom-container' 
        onClick={(e) => e.stopPropagation()}
      >
        <div className='nom-header'>
          <h2>New Delivery Request</h2>
          <button className='nom-close-btn' onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className='nom-form'>
          {error && <p className='nom-error'>{error}</p>}
          
          <div className='nom-input-group'>
            <label htmlFor="from">Pickup Location</label>
            <input
              id="from"
              name="from"
              type='text'
              placeholder='e.g. Hostel Block A, Main Gate'
              value={formData.from}
              onChange={handleChange}
              autoFocus
            />
          </div>
          
          <div className='nom-input-group'>
            <label htmlFor="to">Drop Location</label>
            <input
              id="to"
              name="to"
              type='text'
              placeholder='e.g. Library, Canteen, Academic Block'
              value={formData.to}
              onChange={handleChange}
            />
          </div>
          
          <div className='nom-input-group'>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder='Describe what needs to be delivered (size, weight, special instructions)'
              value={formData.description}
              onChange={handleChange}
              rows={4}
            />
          </div>
          
          <div className='nom-input-group'>
            <label htmlFor="cost">Delivery Fee (₹)</label>
            <input
              id="cost"
              name="cost"
              type='number'
              min='10'
              max='500'
              placeholder='50'
              value={formData.cost}
              onChange={handleChange}
            />
          </div>
          
          <button type='submit' className='nom-submit' disabled={loading}>
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default NewOrderModal;