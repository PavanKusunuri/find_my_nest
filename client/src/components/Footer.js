import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaEnvelope, FaShieldAlt, FaFileContract } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">

          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <FaHome className="footer-logo-icon" />
              <span>FindMyNest</span>
            </Link>
            <p className="footer-tagline">
              Connecting tenants with their perfect home. Trusted listings, seamless bookings.
            </p>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><Link to="/listings">Browse Rooms</Link></li>
              <li><Link to="/register">Create Account</Link></li>
              <li><Link to="/login">Sign In</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>For Owners</h4>
            <ul>
              <li><Link to="/register">List Your Property</Link></li>
              <li><Link to="/owner/dashboard">Owner Dashboard</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li>
                <Link to="/privacy">
                  <FaShieldAlt className="footer-link-icon" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms">
                  <FaFileContract className="footer-link-icon" />
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href="mailto:support@findmynest.com">
                  <FaEnvelope className="footer-link-icon" />
                  support@findmynest.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p>
            &copy; {currentYear} FindMyNest. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <span>·</span>
            <Link to="/terms">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
