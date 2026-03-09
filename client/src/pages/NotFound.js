import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const NotFound = () => (
  <div className="not-found-page">
    <div className="not-found-content">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn-primary">
        <FaHome /> Go Home
      </Link>
    </div>
  </div>
);

export default NotFound;
