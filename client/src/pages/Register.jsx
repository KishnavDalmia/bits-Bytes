import React from 'react'
import './Auth.css'
import Navbar from '../components/Navbar/Navbar.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) =>{
    e.preventDefault();
    const role = document.querySelector('input[name="role"]:checked').value;
    try{
      const res = await axios.post('http://localhost:3000/api/auth/register',{
        name,
        email,
        role,
        password
      });
      console.log(res.data);
      navigate(`/${role}/dashboard`);
    }catch(err){
      setError(err.response.data.message);
      console.log(err);
    }

  }
  return (
    <>
      <Navbar/>
      <div className='container'>
      <form onSubmit={handleRegister} className='form'>
        <h1 className='heading'>Register</h1>
        <h2 className='subheading'>Create a new account</h2>
        <div className="input-gp">
          <label htmlFor="name" className='form-label'>Name</label> 
          <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='John Doe' className='form-input'/>
        </div>
        <h4 className='role-heading'>Role</h4>
        <div className="input-gp-role">
          <input type="radio" name="role" value="Customer" className='form-input'/>
          <label htmlFor="role" className='form-label'>Customer</label>
          <input type="radio" name="role" value="Runner" className='form-input'/>
          <label htmlFor="role" className='form-label'>Runner</label>
        </div>
        <div className="input-gp">
          <label htmlFor="email" className='form-label'>Email</label> 
          <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='johndoe@gmail.com' className='form-input'/>
        </div>
        <div className="input-gp">
          <label htmlFor="password" className='form-label'>Password</label> 
          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Enter your password' className='form-input'/>
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

export default Register