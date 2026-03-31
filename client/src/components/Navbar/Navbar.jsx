import React, { useState, useEffect } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Navbar = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            setIsMobileMenuOpen(false);
            navigate('/');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className='nav-container'>
            <div className="logo">Bits&Bytes</div>
            
            {/* Hamburger Menu Button */}
            <button className='hamburger' onClick={toggleMobileMenu} aria-label="Toggle menu">
                <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
                <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
                <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            </button>
            
            {/* Navigation Links */}
            <div className={`options ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                <button className='link' onClick={() => handleNavigation('/')}>
                    Home
                </button>
                <button className='link' onClick={() => handleNavigation('/#how-it-works')}>
                    How it Works
                </button>
            </div>
            
            {/* Auth Buttons */}
            <div className={`auth ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                {isAuthenticated ? (
                    <button className='logout' onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    <>
                        <button className='login' onClick={()=> handleNavigation('/login')}>
                            Login
                        </button>
                        <button className='register' onClick={() => handleNavigation('/register')}>
                            Register
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Navbar
