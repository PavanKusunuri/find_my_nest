import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import ListingCard from "../components/ListingCard";
import api from "../utils/api";
import { FaBuilding, FaBed, FaUniversity, FaHome } from "react-icons/fa";

const CATEGORIES = [
  { label: "Rooms", type: "room", icon: <FaBed /> },
  { label: "Hostels", type: "hostel", icon: <FaUniversity /> },
  { label: "PG", type: "pg", icon: <FaBuilding /> },
  { label: "Apartments", type: "apartment", icon: <FaHome /> },
];

const Home = () => {
  const [featuredListings, setFeaturedListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get("/listings?limit=6&sort=-averageRating");
        setFeaturedListings(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Perfect Nest</h1>
          <p>Rooms, PGs & Hostels for daily and monthly stays</p>
          <SearchBar />
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <h2>Browse by Category</h2>
          <div className="categories-grid">
            {CATEGORIES.map((cat) => (
              <Link key={cat.type} to={`/listings?type=${cat.type}`} className="category-card">
                <div className="category-icon">{cat.icon}</div>
                <span>{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Properties</h2>
            <Link to="/listings" className="view-all-link">View All →</Link>
          </div>
          {loading ? (
            <div className="loading-grid">
              {[...Array(6)].map((_, i) => <div key={i} className="skeleton-card" />)}
            </div>
          ) : (
            <div className="listings-grid">
              {featuredListings.map((l) => <ListingCard key={l._id} listing={l} />)}
            </div>
          )}
        </div>
      </section>

      {/* How it Works */}
      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Search</h3>
              <p>Browse rooms, hostels and PGs by location, type and budget</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Book</h3>
              <p>Choose daily or monthly stay and send a booking request</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Stay</h3>
              <p>Get confirmation from the owner and move in hassle-free</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA for owners */}
      <section className="owner-cta">
        <div className="container">
          <h2>Have a Property to Rent?</h2>
          <p>List your room, hostel or PG and reach thousands of tenants</p>
          <Link to="/register" className="btn-primary btn-large">List Your Property</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
