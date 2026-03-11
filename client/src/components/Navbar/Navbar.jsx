import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    
  return (
    <div className='nav-container'>
        <div className="logo">Bits&Bytes</div>
        <div className="options">
            <button className='link' onClick={() => navigate('/')}>
                Home
            </button>
            <button className='link' onClick={() => navigate('/#how-it-works')}>
                How it Works
            </button>
        </div>
        <div className="auth">
            <button className='login' onClick={()=> navigate('/login')}>
                Login
            </button>
            <button className='register' onClick={() => navigate('/register')}>
                Register
            </button>
        </div>
    </div>
  )
}

export default Navbar