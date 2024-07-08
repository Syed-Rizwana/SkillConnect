// Navbar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <nav className={`navbar ${isOpen ? 'active' : ''}`}>
      <div className="container">
        <h1 className="logo">Your Logo</h1>
        <div className="menu-toggle" onClick={toggleMenu}>
          <div className={`line ${isOpen ? 'line-1-active' : ''}`}></div>
          <div className={`line ${isOpen ? 'line-2-active' : ''}`}></div>
          <div className={`line ${isOpen ? 'line-3-active' : ''}`}></div>
        </div>
        <ul className={`menu ${isOpen ? 'active' : ''}`}>
          <li><Link to="/home">Home</Link></li> {/* Use Link instead of anchor tag */}
          <li><Link to="/upload">Upload</Link></li> {/* Use Link instead of anchor tag */}
          <li>
            <Link to="/contact">Contact</Link>
            <ul className="dropdown-menu">
              <li><Link to="/services/submenu-1">Submenu 1</Link></li>
              <li><Link to="/services/submenu-2">Submenu 2</Link></li>
              <li><Link to="/services/submenu-3">Submenu 3</Link></li>
            </ul>
          </li>
          <li><Link to="/display">Display</Link></li>
          <li><Link to="/signin">Signup/Signin</Link></li>
        </ul>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
