import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import { toast } from "react-toastify";
import { differenceInDays, differenceInCalendarMonths, addDays, addMonths } from "date-fns";
import {
  FaMapMarkerAlt, FaStar, FaUsers, FaCalendarAlt,
  FaCheckCircle, FaArrowLeft,
} from "react-icons/fa";

const BookingPage = () => {
  const { id } = useParams();
  const history = useHistory();
  useAuth(); // ensure auth context is available (PrivateRoute handles redirect)

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState(1); // 1=select dates, 2=confirm

  const [stayType, setStayType] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await api.get(`/listings/${id}`);
        const l = res.data.data;
        setListing(l);
        setStayType(l.stayType[0]);
      } catch {
        toast.error("Listing not found");
        history.push("/listings");
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id, history]);

  const calculatePrice = () => {
    if (!checkIn || !checkOut) return null;
    if (stayType === "daily") {
      const days = differenceInDays(checkOut, checkIn);
      return days > 0 ? { amount: days * listing.pricePerDay, unit: `${days} day(s)` } : null;
    } else {
      const months = differenceInCalendarMonths(checkOut, checkIn) || 1;
      return { amount: months * listing.pricePerMonth, unit: `${months} month(s)` };
    }
  };

  const priceInfo = listing ? calculatePrice() : null;

  const handleStayTypeChange = (type) => {
    setStayType(type);
    setCheckIn(null);
    setCheckOut(null);
  };

  const handleCheckInChange = (date) => {
    setCheckIn(date);
    if (stayType === "daily") {
      setCheckOut(date ? addDays(date, 1) : null);
    } else {
      setCheckOut(date ? addMonths(date, 1) : null);
    }
  };

  const handleNext = () => {
    if (!checkIn || !checkOut || !priceInfo) {
      toast.error("Please select valid check-in and check-out dates");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await api.post("/bookings", {
        listingId: listing._id,
        stayType,
        checkIn,
        checkOut,
        numberOfGuests: guests,
        specialRequests,
      });
      toast.success("Booking request sent! The owner will confirm shortly.");
      history.push("/dashboard");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading-full">Loading listing...</div>;
  if (!listing) return null;

  return (
    <div className="booking-page">
      <div className="container">
        <button className="back-btn" onClick={() => (step === 2 ? setStep(1) : history.goBack())}>
          <FaArrowLeft /> Back
        </button>

        <div className="booking-page-layout">
          {/* Left: Form */}
          <div className="booking-form-panel">
            <h1>Book Your Stay</h1>

            {/* Step indicator */}
            <div className="step-indicator">
              <div className={`step-dot ${step >= 1 ? "active" : ""}`}>1</div>
              <div className="step-line" />
              <div className={`step-dot ${step >= 2 ? "active" : ""}`}>2</div>
            </div>

            {step === 1 && (
              <div className="booking-step">
                <h2>Select Your Dates</h2>

                {listing.stayType.length > 1 && (
                  <div className="form-group">
                    <label>Stay Type</label>
                    <div className="stay-type-toggle">
                      {listing.stayType.map((t) => (
                        <button
                          key={t}
                          type="button"
                          className={`toggle-btn ${stayType === t ? "active" : ""}`}
                          onClick={() => handleStayTypeChange(t)}
                        >
                          {t === "daily" ? "📅 Daily" : "📆 Monthly"}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label><FaCalendarAlt /> Check-in Date</label>
                    <DatePicker
                      selected={checkIn}
                      onChange={handleCheckInChange}
                      selectsStart
                      startDate={checkIn}
                      endDate={checkOut}
                      minDate={new Date()}
                      placeholderText="Select check-in"
                      className="datepicker-input"
                      dateFormat={stayType === "monthly" ? "MMMM yyyy" : "dd/MM/yyyy"}
                      showMonthYearPicker={stayType === "monthly"}
                    />
                  </div>

                  <div className="form-group">
                    <label><FaCalendarAlt /> Check-out Date</label>
                    <DatePicker
                      selected={checkOut}
                      onChange={setCheckOut}
                      selectsEnd
                      startDate={checkIn}
                      endDate={checkOut}
                      minDate={checkIn ? addDays(checkIn, 1) : new Date()}
                      placeholderText="Select check-out"
                      className="datepicker-input"
                      dateFormat={stayType === "monthly" ? "MMMM yyyy" : "dd/MM/yyyy"}
                      showMonthYearPicker={stayType === "monthly"}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label><FaUsers /> Number of Guests</label>
                  <div className="guest-counter">
                    <button
                      type="button"
                      className="counter-btn"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    >−</button>
                    <span className="guest-count">{guests}</span>
                    <button
                      type="button"
                      className="counter-btn"
                      onClick={() => setGuests((g) => Math.min(listing.maxOccupancy, g + 1))}
                    >+</button>
                    <span className="guest-hint">Max {listing.maxOccupancy}</span>
                  </div>
                </div>

                <div className="form-group">
                  <label>Special Requests (optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Any special requirements or notes for the owner..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                  />
                </div>

                {priceInfo && (
                  <div className="price-preview">
                    <span>Estimated Total</span>
                    <strong>₹{priceInfo.amount} <small>({priceInfo.unit})</small></strong>
                  </div>
                )}

                <button className="btn-primary btn-full" onClick={handleNext}>
                  Continue to Review →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="booking-step">
                <h2>Confirm Booking</h2>

                <div className="booking-summary">
                  <div className="summary-row">
                    <span>Property</span>
                    <strong>{listing.title}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Stay Type</span>
                    <strong>{stayType.charAt(0).toUpperCase() + stayType.slice(1)}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Check-in</span>
                    <strong>{checkIn?.toLocaleDateString("en-IN")}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Check-out</span>
                    <strong>{checkOut?.toLocaleDateString("en-IN")}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Guests</span>
                    <strong>{guests}</strong>
                  </div>
                  {specialRequests && (
                    <div className="summary-row">
                      <span>Special Requests</span>
                      <strong>{specialRequests}</strong>
                    </div>
                  )}
                  <div className="summary-divider" />
                  <div className="summary-row summary-total">
                    <span>Total Amount</span>
                    <strong className="total-amount">₹{priceInfo?.amount}</strong>
                  </div>
                </div>

                <div className="booking-terms">
                  <FaCheckCircle className="terms-icon" />
                  <p>
                    By confirming, you agree that this sends a <strong>booking request</strong> to
                    the owner. Your stay is confirmed once the owner approves.
                  </p>
                </div>

                <div className="booking-actions-row">
                  <button className="btn-outline" onClick={() => setStep(1)}>
                    ← Edit
                  </button>
                  <button className="btn-primary" onClick={handleSubmit} disabled={submitting}>
                    {submitting ? "Sending Request..." : "Confirm Booking"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Listing Summary Card */}
          <div className="booking-listing-card">
            <div className="booking-listing-img">
              <img
                src={
                  listing.images?.[0] !== "no-photo.jpg"
                    ? listing.images[0]
                    : "/placeholder-room.jpg"
                }
                alt={listing.title}
              />
            </div>
            <div className="booking-listing-info">
              <span className="type-badge">{listing.type}</span>
              <h3>{listing.title}</h3>
              <p className="listing-address">
                <FaMapMarkerAlt /> {listing.address}
              </p>
              {listing.averageRating > 0 && (
                <div className="listing-rating-sm">
                  <FaStar className="star-icon" />
                  <span>{listing.averageRating} ({listing.reviewCount} reviews)</span>
                </div>
              )}
              <div className="listing-price-info">
                {listing.stayType.includes("daily") && (
                  <div>
                    <strong>₹{listing.pricePerDay}</strong>
                    <span> / day</span>
                  </div>
                )}
                {listing.stayType.includes("monthly") && (
                  <div>
                    <strong>₹{listing.pricePerMonth}</strong>
                    <span> / month</span>
                  </div>
                )}
              </div>
              <div className="listing-host-info">
                <img
                  src={
                    listing.owner?.avatar !== "default-avatar.jpg"
                      ? listing.owner?.avatar
                      : "/default-avatar.png"
                  }
                  alt={listing.owner?.name}
                  className="host-avatar-sm"
                />
                <div>
                  <p className="host-label">Hosted by</p>
                  <strong>{listing.owner?.name}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
