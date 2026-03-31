import React from 'react'
import './Auth.css'
import Navbar from '../components/Navbar/Navbar.jsx'
import Footer from '../components/Footer/Footer.jsx'
import api from '../services/apiService'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import formValidation from '../services/formValidation'

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Customer'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    formValidation.clearAllErrors('form');
    
    // Validate name
    if (!formValidation.validateRequired('name', 'Name')) {
      return;
    }
    
    // Validate email
    if (!formValidation.validateEmail('email')) {
      return;
    }
    
    // Validate password
    if (!formValidation.validatePassword('password', 6)) {
      return;
    }

    setLoading(true);
    
    try {
      const res = await api.post('/auth/register', formData);
      formValidation.showSuccess('Account created successfully!');
      navigate(res.data.redirectTo);
    } catch (err) {
      const errorMsg = err.message || 'Registration failed. Please try again.';
      setError(errorMsg);
      formValidation.showErrorToast(errorMsg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar/>
      <div className="auth-page-container">
        <div className="card" style={{ maxWidth: '450px', width: '100%' }}>
          <div className="card-body">
            <h1 className="card-title text-center mb-1" style={{ fontSize: '2rem', fontWeight: 700 }}>Create Account</h1>
            <p className="text-center text-muted mb-4">Join Bits&Bytes today</p>
            
            {error && (
              <div className="alert alert-danger mb-3">
                {error}
              </div>
            )}
            
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder='John Doe' 
                  className="form-control"
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">I want to</label>
                <div className="d-flex gap-3 mt-2">
                  <div className="form-check">
                    <input 
                      type="radio" 
                      name="role" 
                      value="Customer" 
                      id="customer"
                      checked={formData.role === 'Customer'}
                      onChange={handleChange}
                      className="form-check-input"
                    />
                    <label htmlFor="customer" className="form-check-label">Send Packages</label>
                  </div>
                  <div className="form-check">
                    <input 
                      type="radio" 
                      name="role" 
                      value="Runner" 
                      id="runner"
                      checked={formData.role === 'Runner'}
                      onChange={handleChange}
                      className="form-check-input"
                    />
                    <label htmlFor="runner" className="form-check-label">Deliver & Earn</label>
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  name="email" 
                  onChange={handleChange} 
                  value={formData.email} 
                  placeholder='johndoe@university.edu' 
                  className="form-control"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input 
                  type="password" 
                  id="password"
                  name="password" 
                  onChange={handleChange} 
                  value={formData.password} 
                  placeholder='Create a strong password' 
                  className="form-control"
                />
                <div className="form-text">Must be at least 6 characters</div>
              </div>
              
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border me-2" style={{ width: '1rem', height: '1rem' }}></span>
                    Creating Account...
                  </>
                ) : 'Create Account'}
              </button>
            </form>
            
            <p className="text-center mt-4 mb-0">
              <span className="text-muted">Already have an account?</span>
              {' '}
              <a href="/login" style={{ color: 'var(--accent-primary)', fontWeight: 500 }}>Sign in</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Register