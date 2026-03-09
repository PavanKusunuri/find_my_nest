import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import api from "../utils/api";
import { FaFilter, FaTimes } from "react-icons/fa";

const AMENITY_OPTIONS = ["wifi", "ac", "parking", "meals", "gym", "laundry", "geyser", "security", "furnished"];

const Listings = () => {
  const location = useLocation();
  const [listings, setListings] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    q: "", city: "", type: "", stayType: "",
    minPrice: "", maxPrice: "", genderPreference: "",
    amenities: [],
  });

  // Parse URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFilters((prev) => ({
      ...prev,
      q: params.get("q") || "",
      city: params.get("city") || "",
      type: params.get("type") || "",
      stayType: params.get("stayType") || "",
    }));
  }, [location.search]);

  const fetchListings = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => {
        if (v && k !== "amenities") params.set(k, v);
      });
      if (filters.amenities.length) params.set("amenities", filters.amenities.join(","));
      params.set("page", page);
      params.set("limit", 12);

      const endpoint = Object.values(filters).some(Boolean)
        ? `/listings/search?${params}`
        : `/listings?${params}`;

      const res = await api.get(endpoint);
      setListings(res.data.data);
      setTotal(res.data.total || res.data.count);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => { fetchListings(); }, [fetchListings]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  };

  const toggleAmenity = (a) => {
    setFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(a)
        ? prev.amenities.filter((x) => x !== a)
        : [...prev.amenities, a],
    }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({ q: "", city: "", type: "", stayType: "", minPrice: "", maxPrice: "", genderPreference: "", amenities: [] });
    setPage(1);
  };

  return (
    <div className="listings-page">
      <div className="listings-header">
        <h1>Browse Properties</h1>
        <p>{total} properties found</p>
        <button className="btn-outline filter-toggle" onClick={() => setShowFilters(!showFilters)}>
          <FaFilter /> Filters
        </button>
      </div>

      <div className="listings-layout">
        {/* Sidebar Filters */}
        <aside className={`filters-sidebar ${showFilters ? "open" : ""}`}>
          <div className="filters-header">
            <h3>Filters</h3>
            <button onClick={clearFilters} className="clear-filters"><FaTimes /> Clear</button>
          </div>

          <div className="filter-group">
            <label>Keyword</label>
            <input type="text" name="q" value={filters.q} onChange={handleFilterChange} placeholder="Search..." />
          </div>
          <div className="filter-group">
            <label>City</label>
            <input type="text" name="city" value={filters.city} onChange={handleFilterChange} placeholder="City" />
          </div>
          <div className="filter-group">
            <label>Property Type</label>
            <select name="type" value={filters.type} onChange={handleFilterChange}>
              <option value="">All Types</option>
              <option value="room">Room</option>
              <option value="hostel">Hostel</option>
              <option value="pg">PG</option>
              <option value="apartment">Apartment</option>
              <option value="studio">Studio</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Stay Type</label>
            <select name="stayType" value={filters.stayType} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Gender Preference</label>
            <select name="genderPreference" value={filters.genderPreference} onChange={handleFilterChange}>
              <option value="">Any</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Min Price (₹)</label>
            <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} placeholder="0" />
          </div>
          <div className="filter-group">
            <label>Max Price (₹)</label>
            <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} placeholder="50000" />
          </div>
          <div className="filter-group">
            <label>Amenities</label>
            <div className="amenities-checkboxes">
              {AMENITY_OPTIONS.map((a) => (
                <label key={a} className="amenity-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(a)}
                    onChange={() => toggleAmenity(a)}
                  />
                  {a}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Listings Grid */}
        <main className="listings-main">
          {loading ? (
            <div className="listings-grid">
              {[...Array(6)].map((_, i) => <div key={i} className="skeleton-card" />)}
            </div>
          ) : listings.length === 0 ? (
            <div className="no-results">
              <h3>No properties found</h3>
              <p>Try adjusting your filters</p>
              <button className="btn-primary" onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
            <>
              <div className="listings-grid">
                {listings.map((l) => <ListingCard key={l._id} listing={l} />)}
              </div>
              <div className="pagination">
                <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="btn-outline">← Prev</button>
                <span>Page {page}</span>
                <button disabled={listings.length < 12} onClick={() => setPage(p => p + 1)} className="btn-outline">Next →</button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Listings;
