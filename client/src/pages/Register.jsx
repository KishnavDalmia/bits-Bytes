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
    
    if (!formValidation.validateRequired('name', 'Name')) {
      return;
    }
    
    if (!formValidation.validateEmail('email')) {
      return;
    }
    
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
        <div className="auth-card" style={{ maxWidth: '450px', width: '100%' }}>
          <div className="auth-card-body">
            <h1 className="auth-card-title auth-text-center auth-mb-1" style={{ fontSize: '2rem', fontWeight: 700 }}>Create Account</h1>
            <p className="auth-text-center auth-text-muted auth-mb-4">Join Bits&Bytes today</p>
            
            {error && (
              <div className="auth-alert-danger auth-mb-3">
                {error}
              </div>
            )}
            
            <form onSubmit={handleRegister}>
              <div className="auth-mb-3">
                <label htmlFor="name" className="auth-form-label">Full Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder='John Doe' 
                  className="auth-form-control"
                />
              </div>
              
              <div className="auth-mb-3">
                <label className="auth-form-label">I want to</label>
                <div className="auth-d-flex auth-gap-3 auth-mt-2">
                  <div className="auth-form-check">
                    <input 
                      type="radio" 
                      name="role" 
                      value="Customer" 
                      id="customer"
                      checked={formData.role === 'Customer'}
                      onChange={handleChange}
                      className="auth-form-check-input"
                    />
                    <label htmlFor="customer" className="auth-form-check-label">Send Packages</label>
                  </div>
                  <div className="auth-form-check">
                    <input 
                      type="radio" 
                      name="role" 
                      value="Runner" 
                      id="runner"
                      checked={formData.role === 'Runner'}
                      onChange={handleChange}
                      className="auth-form-check-input"
                    />
                    <label htmlFor="runner" className="auth-form-check-label">Deliver & Earn</label>
                  </div>
                </div>
              </div>
              
              <div className="auth-mb-3">
                <label htmlFor="email" className="auth-form-label">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  name="email" 
                  onChange={handleChange} 
                  value={formData.email} 
                  placeholder='johndoe@university.edu' 
                  className="auth-form-control"
                />
              </div>
              
              <div className="auth-mb-4">
                <label htmlFor="password" className="auth-form-label">Password</label>
                <input 
                  type="password" 
                  id="password"
                  name="password" 
                  onChange={handleChange} 
                  value={formData.password} 
                  placeholder='Create a strong password' 
                  className="auth-form-control"
                />
                <div className="auth-form-text">Must be at least 6 characters</div>
              </div>
              
              <button type="submit" className="auth-btn-primary auth-w-100" disabled={loading}>
                {loading ? (
                  <>
                    <span className="auth-spinner-border"></span>
                    Creating Account...
                  </>
                ) : 'Create Account'}
              </button>
            </form>
            
            <p className="auth-text-center auth-mt-4" style={{ marginBottom: 0 }}>
              <span className="auth-text-muted">Already have an account?</span>
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