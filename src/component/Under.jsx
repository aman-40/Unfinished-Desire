import React, { useState, useEffect } from 'react';
import './Under.css';

function Under() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2025-06-01T00:00:00');
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className='Under'>
      <h1>Launching on June 1, 2025</h1>
      <div className='countdown'>
        <p>{timeLeft.days} Days</p>
        <p>{timeLeft.hours} Hours</p>
        <p>{timeLeft.minutes} Minutes</p>
        <p>{timeLeft.seconds} Seconds</p>
      </div>
    </div>
  );
}

export default Under;