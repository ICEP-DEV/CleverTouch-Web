import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Home from './Home';
import About from './About';
import AccessPage from './AccessPage';
import Present from './Present';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Initial user state is null

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("authToken"); // Example: removing a token from localStorage
  };

  return (
    <Router>
      <div className='app'>
        {showLogin && <LoginPopup setShowLogin={setShowLogin} onLoginSuccess={handleLoginSuccess} />}
        <Navbar setShowLogin={setShowLogin} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/AccessPage" element={<AccessPage />} />
          <Route path="/present" element={<Present />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
