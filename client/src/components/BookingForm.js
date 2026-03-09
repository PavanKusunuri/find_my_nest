import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import api from "../utils/api";
import { toast } from "react-toastify";
import { differenceInDays, differenceInCalendarMonths } from "date-fns";

const BookingForm = ({ listing }) => {
  const { user } = useAuth();
  const history = useHistory();
  const [stayType, setStayType] = useState(listing.stayType[0]);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");
  const [loading, setLoading] = useState(false);

  const calculatePrice = () => {
    if (!checkIn || !checkOut) return null;
    if (stayType === "daily") {
      const days = differenceInDays(checkOut, checkIn);
      return days > 0 ? days * listing.pricePerDay : null;
    } else {
      const months = differenceInCalendarMonths(checkOut, checkIn) || 1;
      return months * listing.pricePerMonth;
    }
  };

  const totalPrice = calculatePrice();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) { history.push("/login"); return; }
    if (!checkIn || !checkOut || !totalPrice) {
      toast.error("Please select valid check-in and check-out dates");
      return;
    }
    setLoading(true);
    try {
      await api.post("/bookings", {
        listingId: listing._id,
        stayType,
        checkIn,
        checkOut,
        numberOfGuests: guests,
        specialRequests,
      });
      toast.success("Booking request sent! Owner will confirm shortly.");
      history.push("/dashboard");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h3>Book This Place</h3>

      {listing.stayType.length > 1 && (
        <div className="form-group">
          <label>Stay Type</label>
          <div className="stay-type-toggle">
            {listing.stayType.map((t) => (
              <button key={t} type="button"
                className={`toggle-btn ${stayType === t ? "active" : ""}`}
                onClick={() => setStayType(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="form-group">
        <label>Check In</label>
        <DatePicker
          selected={checkIn}
          onChange={setCheckIn}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={new Date()}
          placeholderText="Select date"
          className="datepicker-input"
        />
      </div>

      <div className="form-group">
        <label>Check Out</label>
        <DatePicker
          selected={checkOut}
          onChange={setCheckOut}
          selectsEnd
          startDate={checkIn}
          endDate={checkOut}
          minDate={checkIn || new Date()}
          placeholderText="Select date"
          className="datepicker-input"
        />
      </div>

      <div className="form-group">
        <label>Guests</label>
        <input
          type="number" min={1} max={listing.maxOccupancy}
          value={guests} onChange={(e) => setGuests(Number(e.target.value))}
        />
        <small>Max {listing.maxOccupancy} guests</small>
      </div>

      <div className="form-group">
        <label>Special Requests</label>
        <textarea
          rows={3} placeholder="Any special requirements..."
          value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)}
        />
      </div>

      {totalPrice && (
        <div className="price-summary">
          <div className="price-row">
            <span>
              {stayType === "daily"
                ? `₹${listing.pricePerDay} × ${differenceInDays(checkOut, checkIn)} days`
                : `₹${listing.pricePerMonth} × ${differenceInCalendarMonths(checkOut, checkIn) || 1} months`}
            </span>
            <span>₹{totalPrice}</span>
          </div>
          <div className="price-row total">
            <strong>Total</strong>
            <strong>₹{totalPrice}</strong>
          </div>
        </div>
      )}

      <button type="submit" className="btn-primary btn-full" disabled={loading}>
        {loading ? "Sending Request..." : user ? "Request to Book" : "Login to Book"}
      </button>
    </form>
  );
};

export default BookingForm;
