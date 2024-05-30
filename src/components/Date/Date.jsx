import React, { useState, useEffect } from 'react';
import './Date.css';

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update the time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='date'>
      <h1>{currentTime.toLocaleTimeString()}</h1>
      <h2>{currentTime.toLocaleDateString()}</h2>
    </div>
  );
}

export default Clock;
