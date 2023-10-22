import React, { useState, useEffect } from 'react';
import './Nav.css';

export default function Nav() {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    // Event listener to track scrolling
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Remove the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navClasses = `nav ${scrolling ? 'nav__scrolled' : ''}`;

  return (
    <div className={navClasses}>
      <img
        className="nav__logo"
        src="src/component/logo.svg"
        width="100"
        height="100"
        alt="Netflix_Logo"
      />
      <img
        className="nav__avatar"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        width="100"
        height="100"
        alt="Avatar"
      />
    </div>
  );
}
