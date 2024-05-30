// HomePage.js
import React from 'react';
import Clock from './components/Date/Date';
import Header from './components/Header/Header';




const Home = () => {
  return (
    <div>
     
      <Header />
      
      {/* Other content of your homepage */}
      <Clock/>
      
      
    </div>
  );
}

export default Home;
