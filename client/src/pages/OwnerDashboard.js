import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";

const STATUS_COLORS = {
  pending: "badge-yellow",
  confirmed: "badge-green",
  cancelled: "badge-red",
  completed: "badge-blue",
};

const OwnerDashboard = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("listings");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [listRes, bookRes] = await Promise.all([
          api.get("/listings/my"),
          api.get("/bookings"),
        ]);
        setListings(listRes.data.data);
        setBookings(bookRes.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this listing? This cannot be undone.")) return;
    try {
      await api.delete(`/listings/${id}`);
      setListings((prev) => prev.filter((l) => l._id !== id));
      toast.success("Listing deleted");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleBookingStatus = async (id, status) => {
    try {
      await api.put(`/bookings/${id}`, { status });
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
      );
      toast.success(`Booking ${status}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const pendingBookings = bookings.filter((b) => b.status === "pending");

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>Owner Dashboard</h1>
            <p>Welcome back, <strong>{user?.name}</strong></p>
          </div>
          <Link to="/owner/listings/new" className="btn-primary">
            <FaPlus /> Add New Listing
          </Link>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{listings.length}</h3>
            <p>Total Listings</p>
          </div>
          <div className="stat-card">
            <h3>{bookings.length}</h3>
            <p>Total Bookings</p>
          </div>
          <div className="stat-card">
            <h3>{pendingBookings.length}</h3>
            <p>Pending Requests</p>
          </div>
          <div className="stat-card">
            <h3>{bookings.filter(b => b.status === "confirmed").length}</h3>
            <p>Confirmed</p>
          </div>
        </div>

        <div className="dashboard-tabs">
          <button className={activeTab === "listings" ? "tab active" : "tab"} onClick={() => setActiveTab("listings")}>
            My Listings ({listings.length})
          </button>
          <button className={activeTab === "bookings" ? "tab active" : "tab"} onClick={() => setActiveTab("bookings")}>
            Booking Requests {pendingBookings.length > 0 && <span className="badge-count">{pendingBookings.length}</span>}
          </button>
        </div>

        {loading ? <div className="loading">Loading...</div> : (
          <>
            {activeTab === "listings" && (
              <div className="owner-listings">
                {listings.length === 0 ? (
                  <div className="empty-state">
                    <h3>No listings yet</h3>
                    <p>Create your first listing to start renting</p>
                    <Link to="/owner/listings/new" className="btn-primary"><FaPlus /> Create Listing</Link>
                  </div>
                ) : (
                  <div className="owner-listing-list">
                    {listings.map((l) => (
                      <div key={l._id} className="owner-listing-card">
                        <img
                          src={l.images?.[0] !== "no-photo.jpg" ? l.images[0] : "/placeholder-room.jpg"}
                          alt={l.title}
                        />
                        <div className="owner-listing-info">
                          <h3>{l.title}</h3>
                          <p>{l.address}</p>
                          <div className="listing-price-row">
                            {l.stayType.includes("daily") && <span>₹{l.pricePerDay}/day</span>}
                            {l.stayType.includes("monthly") && <span>₹{l.pricePerMonth}/mo</span>}
                          </div>
                          <span className={`badge ${l.isAvailable ? "badge-green" : "badge-red"}`}>
                            {l.isAvailable ? "Available" : "Unavailable"}
                          </span>
                        </div>
                        <div className="owner-listing-actions">
                          <Link to={`/listings/${l._id}`} className="btn-icon" title="View"><FaEye /></Link>
                          <Link to={`/owner/listings/${l._id}/edit`} className="btn-icon" title="Edit"><FaEdit /></Link>
                          <button className="btn-icon btn-danger" title="Delete" onClick={() => handleDelete(l._id)}><FaTrash /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "bookings" && (
              <div className="bookings-list">
                {bookings.length === 0 ? (
                  <div className="empty-state">
                    <h3>No booking requests yet</h3>
                    <p>Booking requests will appear here once tenants request a stay</p>
                  </div>
                ) : (
                  bookings.map((b) => (
                    <div key={b._id} className="booking-card">
                      <div className="booking-info">
                        <h3>{b.listing?.title}</h3>
                        <p>Tenant: <strong>{b.tenant?.name}</strong> · {b.tenant?.email}</p>
                        <p>
                          {format(new Date(b.checkIn), "dd MMM yyyy")} →{" "}
                          {format(new Date(b.checkOut), "dd MMM yyyy")} · {b.stayType}
                        </p>
                        <p>Guests: {b.numberOfGuests} · Total: <strong>₹{b.totalPrice}</strong></p>
                        {b.specialRequests && <p className="special-req">Note: {b.specialRequests}</p>}
                      </div>
                      <div className="booking-actions">
                        <span className={`badge ${STATUS_COLORS[b.status]}`}>{b.status}</span>
                        {b.status === "pending" && (
                          <>
                            <button className="btn-success btn-sm" onClick={() => handleBookingStatus(b._id, "confirmed")}>
                              Confirm
                            </button>
                            <button className="btn-danger btn-sm" onClick={() => handleBookingStatus(b._id, "cancelled")}>
                              Decline
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
