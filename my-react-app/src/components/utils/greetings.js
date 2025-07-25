import { useState, useEffect } from 'react';

export const useGreeting = () => {
  const [greeting, setGreeting] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {

    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    setUserName(user ? user.firstName : 'User'); 

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