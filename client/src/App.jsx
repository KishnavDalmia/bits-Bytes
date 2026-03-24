import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import RunnnerDashboard from './pages/runner/RunnerDashboard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/customer/dashboard" element={<CustomerDashboard />} />
      <Route path="/runner/dashboard" element={<RunnnerDashboard />} />
    </Routes>
  );
}