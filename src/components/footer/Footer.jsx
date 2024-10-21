import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <a href="/" className="footer-link">About Us</a>
          <a href="/" className="footer-link">Services</a>
          <a href="/" className="footer-link">Contact</a>
        </div>
        <div className="footer-social">
          <a href="https://facebook.com" className="footer-icon">Facebook</a>
          <a href="https://twitter.com" className="footer-icon">Twitter</a>
          <a href="https://instagram.com" className="footer-icon">Instagram</a>
        </div>
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} Mine Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
