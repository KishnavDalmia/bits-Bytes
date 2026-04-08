import React from 'react'
import './Auth.css'
import Navbar from '../components/Navbar/Navbar.jsx'
import Footer from '../components/Footer/Footer.jsx'
import api from '../services/apiService'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import formValidation from '../services/formValidation'

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    formValidation.clearAllErrors('form');
    
    if (!formValidation.validateEmail('email')) {
      return;
    }
    
    if (!formValidation.validateRequired('password', 'Password')) {
      return;
    }

    setLoading(true);
    
    try {
      const res = await api.post('/auth/login', formData);
      formValidation.showSuccess('Welcome back!');
      navigate(res.data.redirectTo);
    } catch (err) {
      const errorMsg = err.message || 'Login failed. Please try again.';
      setError(errorMsg);
      formValidation.showErrorToast(errorMsg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <Navbar/>
      <div className="auth-page-container">
        <div className="card" style={{ maxWidth: '420px', width: '100%' }}>
          <div className="card-body">
            <h1 className="card-title text-center mb-1" style={{ fontSize: '2rem', fontWeight: 700 }}>Welcome Back</h1>
            <p className="text-center text-muted mb-4">Sign in to your account</p>
            
            {error && (
              <div className="alert alert-danger mb-3">
                {error}
              </div>
            )}
            
            <form onSubmit={handleLogin}>
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
                  placeholder='Enter your password' 
                  className="form-control"
                />
              </div>
              
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border me-2" style={{ width: '1rem', height: '1rem' }}></span>
                    Signing In...
                  </>
                ) : 'Sign In'}
              </button>
            </form>
            
            <p className="text-center mt-4 mb-0">
              <span className="text-muted">Don't have an account?</span>
              {' '}
              <a href="/register" style={{ color: 'var(--accent-primary)', fontWeight: 500 }}>Create one</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login