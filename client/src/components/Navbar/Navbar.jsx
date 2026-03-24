import React, { useState, useEffect } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Navbar = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get('http://localhost:3000/api/auth/me', { 
                    withCredentials: true 
                });
                setIsAuthenticated(true);
            } catch {
                setIsAuthenticated(false);
            }
        };
        
        checkAuth();
        
        // Listen for storage changes (in case of login in another tab)
        window.addEventListener('storage', checkAuth);
        
        // Also check auth when window gains focus
        window.addEventListener('focus', checkAuth);
        
        return () => {
            window.removeEventListener('storage', checkAuth);
            window.removeEventListener('focus', checkAuth);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:3000/api/auth/logout', { 
                withCredentials: true 
            });
            setIsAuthenticated(false);
            navigate('/');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

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
                {isAuthenticated ? (
                    <button className='logout' onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    <>
                        <button className='login' onClick={()=> navigate('/login')}>
                            Login
                        </button>
                        <button className='register' onClick={() => navigate('/register')}>
                            Register
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Navbar
