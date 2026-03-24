import React from 'react'
import './Auth.css'
import Navbar from '../components/Navbar/Navbar.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

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
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    
    try {
      const res = await axios.post('http://localhost:3000/api/auth/register', formData, { 
        withCredentials: true 
      });
      navigate(res.data.redirectTo);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar/>
      <div className='container'>
        <form onSubmit={handleRegister} className='form'>
          <h1 className='heading'>Register</h1>
          <h2 className='subheading'>Create a new account</h2>
          
          {error && <p className='auth-error'>{error}</p>}
          
          <div className="input-gp">
            <label htmlFor="name" className='form-label'>Name</label> 
            <input 
              type="text" 
              id="name"
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder='John Doe' 
              className='form-input'
            />
          </div>
          
          <div className="input-gp">
            <span className='role-heading'>Role</span>
            <div className="input-gp-role">
              <label className="radio-item">
                <input 
                  type="radio" 
                  name="role" 
                  value="Customer" 
                  checked={formData.role === 'Customer'}
                  onChange={handleChange}
                  className='form-radio'
                />
                <span className="radio-label">Customer</span>
              </label>
              <label className="radio-item">
                <input 
                  type="radio" 
                  name="role" 
                  value="Runner" 
                  checked={formData.role === 'Runner'}
                  onChange={handleChange}
                  className='form-radio'
                />
                <span className="radio-label">Runner</span>
              </label>
            </div>
          </div>
          
          <div className="input-gp">
            <label htmlFor="email" className='form-label'>Email</label> 
            <input 
              type="email" 
              id="email"
              name="email" 
              onChange={handleChange} 
              value={formData.email} 
              placeholder='johndoe@gmail.com' 
              className='form-input'
            />
          </div>
          
          <div className="input-gp">
            <label htmlFor="password" className='form-label'>Password</label> 
            <input 
              type="password" 
              id="password"
              name="password" 
              onChange={handleChange} 
              value={formData.password} 
              placeholder='Enter your password' 
              className='form-input'
            />
          </div>
          
          <button type="submit" className='submit' disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </>
  )
}

export default Register