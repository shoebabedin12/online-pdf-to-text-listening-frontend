import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import CustomLayout from './components/layout/CustomLayout';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Signup from './pages/Signup';

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<CustomLayout />}>
        <Route index element={<Home />} />
        <Route path='profile' element={<Profile />} />
        <Route path='settings' element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  </>
  );
}

export default App;
