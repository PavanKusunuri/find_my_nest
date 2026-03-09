import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import { toast } from "react-toastify";
import { format } from "date-fns";

const StarRating = ({ value, onChange }) => (
  <div className="star-rating">
    {[1, 2, 3, 4, 5].map((n) => (
      <FaStar
        key={n}
        className={n <= value ? "star filled" : "star"}
        onClick={() => onChange && onChange(n)}
        style={{ cursor: onChange ? "pointer" : "default" }}
      />
    ))}
  </div>
);

const ReviewList = ({ listingId, reviews, onReviewAdded }) => {
  const { user } = useAuth();
  const [form, setForm] = useState({ title: "", text: "", rating: 5 });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post(`/listings/${listingId}/reviews`, form);
      toast.success("Review added!");
      setForm({ title: "", text: "", rating: 5 });
      setShowForm(false);
      onReviewAdded && onReviewAdded(res.data.data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reviews-section">
      <div className="reviews-header">
        <h3>Reviews ({reviews.length})</h3>
        {user && user.role === "tenant" && (
          <button className="btn-outline" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "+ Write a Review"}
          </button>
        )}
      </div>

      {showForm && (
        <form className="review-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Rating</label>
            <StarRating value={form.rating} onChange={(r) => setForm({ ...form, rating: r })} />
          </div>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text" required placeholder="Sum up your experience"
              value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Review</label>
            <textarea
              rows={4} required placeholder="Share your experience..."
              value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      )}

      <div className="review-list">
        {reviews.length === 0 ? (
          <p className="no-reviews">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="review-card">
              <div className="review-header">
                <img
                  src={review.user?.avatar !== "default-avatar.jpg"
                    ? review.user?.avatar : "/default-avatar.png"}
                  alt={review.user?.name}
                  className="reviewer-avatar"
                />
                <div>
                  <strong>{review.user?.name}</strong>
                  <StarRating value={review.rating} />
                </div>
                <span className="review-date">
                  {format(new Date(review.createdAt), "MMM yyyy")}
                </span>
              </div>
              <h4 className="review-title">{review.title}</h4>
              <p className="review-text">{review.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewList;
