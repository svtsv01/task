// Custom hook for generating personalized greetings
// Provides time-based greetings and user name from stored session data
import { useState, useEffect } from 'react';

export const useGreeting = () => {
  // State for storing the greeting message and user name
  const [greeting, setGreeting] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Retrieve user data from localStorage and extract the first name
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    setUserName(user ? user.firstName : 'User'); 

    // Determine appropriate greeting based on current time of day
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('Good morning');
    } else if (currentHour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  return { greeting, userName };
};