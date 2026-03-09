import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

const SearchBar = () => {
  const history = useHistory();
  const [query, setQuery] = useState({ q: "", city: "", type: "", stayType: "" });

  const handleChange = (e) =>
    setQuery({ ...query, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(query).forEach(([k, v]) => { if (v) params.set(k, v); });
    history.push(`/listings?${params.toString()}`);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-group">
        <FaSearch className="search-icon" />
        <input
          type="text"
          name="q"
          placeholder="Search by keyword..."
          value={query.q}
          onChange={handleChange}
        />
      </div>
      <div className="search-input-group">
        <FaMapMarkerAlt className="search-icon" />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={query.city}
          onChange={handleChange}
        />
      </div>
      <select name="type" value={query.type} onChange={handleChange}>
        <option value="">All Types</option>
        <option value="room">Room</option>
        <option value="hostel">Hostel</option>
        <option value="pg">PG</option>
        <option value="apartment">Apartment</option>
        <option value="studio">Studio</option>
      </select>
      <select name="stayType" value={query.stayType} onChange={handleChange}>
        <option value="">Stay Type</option>
        <option value="daily">Daily</option>
        <option value="monthly">Monthly</option>
      </select>
      <button type="submit" className="btn-primary">Search</button>
    </form>
  );
};

export default SearchBar;
