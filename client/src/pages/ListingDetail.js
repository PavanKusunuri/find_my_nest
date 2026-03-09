import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import BookingForm from "../components/BookingForm";
import ReviewList from "../components/ReviewList";
import {
  FaMapMarkerAlt, FaStar, FaUsers, FaPhone, FaEnvelope,
  FaWifi, FaCar, FaSnowflake, FaUtensils, FaShieldAlt,
} from "react-icons/fa";

const AMENITY_ICONS = {
  wifi: <FaWifi />, ac: <FaSnowflake />, parking: <FaCar />,
  meals: <FaUtensils />, security: <FaShieldAlt />,
};

const ListingDetail = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/listings/${id}`);
        setListing(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <div className="loading-full">Loading...</div>;
  if (!listing) return <div className="not-found">Listing not found</div>;

  const handleReviewAdded = (review) => {
    setListing((prev) => ({
      ...prev,
      reviews: [review, ...(prev.reviews || [])],
    }));
  };

  const images = listing.images?.filter((i) => i !== "no-photo.jpg");

  return (
    <div className="listing-detail-page">
      <div className="container">
        {/* Image Gallery */}
        <div className="image-gallery">
          <div className="main-image">
            <img
              src={images?.[activeImg] || "/placeholder-room.jpg"}
              alt={listing.title}
            />
          </div>
          {images?.length > 1 && (
            <div className="thumbnails">
              {images.map((img, i) => (
                <img key={i} src={img} alt="" className={i === activeImg ? "active" : ""}
                  onClick={() => setActiveImg(i)} />
              ))}
            </div>
          )}
        </div>

        <div className="detail-layout">
          {/* Left: Info */}
          <div className="detail-info">
            <div className="detail-header">
              <div>
                <span className="type-badge">{listing.type}</span>
                <h1>{listing.title}</h1>
                <p className="detail-address">
                  <FaMapMarkerAlt />
                  {listing.address}
                  {listing.location?.city && ` · ${listing.location.city}`}
                </p>
              </div>
              <div className="detail-rating">
                {listing.averageRating ? (
                  <>
                    <FaStar className="star-icon" />
                    <span>{listing.averageRating}</span>
                    <span>({listing.reviewCount} reviews)</span>
                  </>
                ) : <span>No reviews yet</span>}
              </div>
            </div>

            <div className="detail-meta-row">
              <span><FaUsers /> Max {listing.maxOccupancy} guests</span>
              <span>Gender: {listing.genderPreference === "any" ? "All genders" : listing.genderPreference}</span>
              <span className={`availability ${listing.isAvailable ? "available" : "unavailable"}`}>
                {listing.isAvailable ? "✓ Available" : "✗ Unavailable"}
              </span>
            </div>

            <div className="detail-pricing">
              {listing.stayType.includes("daily") && (
                <div className="price-box">
                  <span className="price">₹{listing.pricePerDay}</span>
                  <span className="per">/day</span>
                </div>
              )}
              {listing.stayType.includes("monthly") && (
                <div className="price-box">
                  <span className="price">₹{listing.pricePerMonth}</span>
                  <span className="per">/month</span>
                </div>
              )}
            </div>

            <section className="detail-section">
              <h2>About This Place</h2>
              <p>{listing.description}</p>
            </section>

            <section className="detail-section">
              <h2>Amenities</h2>
              <div className="amenities-grid">
                {listing.amenities?.map((a) => (
                  <div key={a} className="amenity-item">
                    {AMENITY_ICONS[a] || "✓"} <span>{a}</span>
                  </div>
                ))}
              </div>
            </section>

            {listing.rules && (
              <section className="detail-section">
                <h2>House Rules</h2>
                <p>{listing.rules}</p>
              </section>
            )}

            <section className="detail-section">
              <h2>Owner</h2>
              <div className="owner-card">
                <img
                  src={listing.owner?.avatar !== "default-avatar.jpg"
                    ? listing.owner?.avatar : "/default-avatar.png"}
                  alt={listing.owner?.name}
                />
                <div>
                  <strong>{listing.owner?.name}</strong>
                  <p><FaPhone /> {listing.owner?.phone || "Contact via booking"}</p>
                  <p><FaEnvelope /> {listing.owner?.email}</p>
                  {listing.owner?.bio && <p>{listing.owner.bio}</p>}
                </div>
              </div>
            </section>

            <ReviewList
              listingId={listing._id}
              reviews={listing.reviews || []}
              onReviewAdded={handleReviewAdded}
            />
          </div>

          {/* Right: Booking */}
          <div className="booking-sidebar">
            <BookingForm listing={listing} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
