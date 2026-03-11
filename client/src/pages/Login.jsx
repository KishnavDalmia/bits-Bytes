import React from 'react'
import './Auth.css'
import Navbar from '../components/Navbar/Navbar.jsx'
const Login = () => {
  const handleLogin = async (e) =>{
    e.preventDefault();
  }
  return (
    <>
      <Navbar/>
      <div className='container'>
      <form onSubmit={handleLogin} className='form'>
        <h1 className='heading'>Login</h1>
        <div className="input-gp">
          <label htmlFor="email" className='form-label'>Email</label> 
          <input type="text" name="email" placeholder='johndoe@gmail.com' className='form-input'/>
        </div>
        <div className="input-gp">
          <label htmlFor="password" className='form-label'>Password</label> 
          <input type="password" name="password" placeholder='Enter your password' className='form-input'/>
        </div>
        <button type="submit" className='submit'>Submit</button>
      </form>
      <div className='image'>
        <img src="/hero.png" alt="cover photo" />
      </div>
    </div>
    </>
    
  )
}

export default Login