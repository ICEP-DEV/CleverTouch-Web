import React, { useState } from 'react';
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Present from './pages/Present/Present';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccessPage from './pages/AccessPage/AccessPage';
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPopup from './components/LoginPopup/LoginPopup';

function App() {

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
      <Header setShowLogin={setShowLogin} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
      
      <Routes>
        <Route path="/" element={<Home />} />
       
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/AccessPage" element={<AccessPage />} />
        <Route path="/present" element={<Present />} />

      </Routes>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
