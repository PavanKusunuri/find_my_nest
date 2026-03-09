import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaHome, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    history.push("/");
  };

  const dashboardLink =
    user?.role === "owner" || user?.role === "admin"
      ? "/owner/dashboard"
      : "/dashboard";

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <FaHome className="brand-icon" />
          <span>FindMyNest</span>
        </Link>
      </div>

      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <li><Link to="/listings" onClick={() => setMenuOpen(false)}>Browse Rooms</Link></li>

        {user ? (
          <li className="dropdown">
            <button className="dropdown-trigger" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <FaUserCircle /> {user.name}
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to={dashboardLink} onClick={() => setDropdownOpen(false)}>Dashboard</Link></li>
                {(user.role === "owner" || user.role === "admin") && (
                  <li>
                    <Link to="/owner/listings/new" onClick={() => setDropdownOpen(false)}>
                      + List Property
                    </Link>
                  </li>
                )}
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            )}
          </li>
        ) : (
          <>
            <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
            <li>
              <Link to="/register" className="btn-primary" onClick={() => setMenuOpen(false)}>
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
