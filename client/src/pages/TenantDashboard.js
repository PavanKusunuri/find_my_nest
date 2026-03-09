import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import { format } from "date-fns";
import { FaCalendar, FaMapMarkerAlt, FaStar } from "react-icons/fa";

const STATUS_COLORS = {
  pending: "badge-yellow",
  confirmed: "badge-green",
  cancelled: "badge-red",
  completed: "badge-blue",
};

const TenantDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("bookings");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings");
        setBookings(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await api.delete(`/bookings/${id}`, { data: { reason: "Cancelled by tenant" } });
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: "cancelled" } : b))
      );
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>My Dashboard</h1>
          <p>Welcome back, <strong>{user?.name}</strong></p>
        </div>

        <div className="dashboard-tabs">
          <button className={activeTab === "bookings" ? "tab active" : "tab"} onClick={() => setActiveTab("bookings")}>
            My Bookings ({bookings.length})
          </button>
          <button className={activeTab === "profile" ? "tab active" : "tab"} onClick={() => setActiveTab("profile")}>
            Profile
          </button>
        </div>

        {activeTab === "bookings" && (
          <div className="bookings-list">
            {loading ? <div className="loading">Loading bookings...</div> : (
              bookings.length === 0 ? (
                <div className="empty-state">
                  <h3>No bookings yet</h3>
                  <p>Find your perfect room and book it!</p>
                  <Link to="/listings" className="btn-primary">Browse Rooms</Link>
                </div>
              ) : (
                bookings.map((b) => (
                  <div key={b._id} className="booking-card">
                    <div className="booking-img">
                      <img
                        src={b.listing?.images?.[0] !== "no-photo.jpg" ? b.listing?.images?.[0] : "/placeholder-room.jpg"}
                        alt={b.listing?.title}
                      />
                    </div>
                    <div className="booking-info">
                      <Link to={`/listings/${b.listing?._id}`}>
                        <h3>{b.listing?.title}</h3>
                      </Link>
                      <p><FaMapMarkerAlt /> {b.listing?.address}</p>
                      <p>
                        <FaCalendar />
                        {format(new Date(b.checkIn), "dd MMM yyyy")} → {format(new Date(b.checkOut), "dd MMM yyyy")}
                      </p>
                      <p><strong>Total: ₹{b.totalPrice}</strong> · {b.stayType} stay</p>
                    </div>
                    <div className="booking-actions">
                      <span className={`badge ${STATUS_COLORS[b.status]}`}>{b.status}</span>
                      {b.status === "pending" && (
                        <button className="btn-danger btn-sm" onClick={() => handleCancel(b._id)}>
                          Cancel
                        </button>
                      )}
                      {b.status === "completed" && (
                        <Link to={`/listings/${b.listing?._id}`} className="btn-outline btn-sm">
                          <FaStar /> Review
                        </Link>
                      )}
                    </div>
                  </div>
                ))
              )
            )}
          </div>
        )}

        {activeTab === "profile" && (
          <div className="profile-section">
            <h3>Account Details</h3>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Phone:</strong> {user?.phone || "Not provided"}</p>
            <p><strong>Role:</strong> {user?.role}</p>
            <p><strong>Member since:</strong> {user?.createdAt ? format(new Date(user.createdAt), "MMMM yyyy") : ""}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TenantDashboard;
