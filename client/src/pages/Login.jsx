import React, { useState } from 'react'
import './Auth.css'
import Navbar from '../components/Navbar/Navbar.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
    
    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', formData, { 
        withCredentials: true 
      });
      navigate(res.data.redirectTo);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar/>
      <div className='container'>
        <form onSubmit={handleLogin} className='form'>
          <h1 className='heading'>Login</h1>
          <h2 className='subheading'>Welcome back! Please sign in.</h2>
          
          {error && <p className='auth-error'>{error}</p>}
          
          <div className="input-gp">
            <label htmlFor="email" className='form-label'>Email</label>
            <input 
              type="email" 
              id="email"
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
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
              value={formData.password} 
              onChange={handleChange} 
              placeholder='Enter your password' 
              className='form-input'
            />
          </div>
          
          <button type="submit" className='submit' disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </>
  )
}

export default Login