import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaUsers } from "react-icons/fa";

const TYPE_LABELS = { room: "Room", hostel: "Hostel", pg: "PG", apartment: "Apartment", studio: "Studio" };
const AMENITY_ICONS = { wifi: "📶", ac: "❄️", parking: "🅿️", meals: "🍽️", gym: "🏋️", laundry: "👕" };

const ListingCard = ({ listing }) => {
  const {
    _id, title, type, images, address, location,
    pricePerDay, pricePerMonth, stayType,
    averageRating, reviewCount, maxOccupancy,
    amenities = [], genderPreference, isAvailable,
  } = listing;

  return (
    <Link to={`/listings/${_id}`} className="listing-card">
      <div className="listing-card-image">
        <img
          src={images?.[0] !== "no-photo.jpg" ? images[0] : "/placeholder-room.jpg"}
          alt={title}
        />
        <span className={`badge badge-type`}>{TYPE_LABELS[type] || type}</span>
        {!isAvailable && <span className="badge badge-unavailable">Unavailable</span>}
      </div>

      <div className="listing-card-body">
        <h3>{title}</h3>
        <p className="listing-address">
          <FaMapMarkerAlt />
          {location?.city ? `${location.city}` : address?.substring(0, 50)}
        </p>

        <div className="listing-meta">
          <span><FaUsers /> {maxOccupancy} guests</span>
          <span className={`gender-badge gender-${genderPreference}`}>
            {genderPreference === "any" ? "All" : genderPreference}
          </span>
        </div>

        <div className="listing-amenities">
          {amenities.slice(0, 4).map((a) => (
            <span key={a} className="amenity-tag" title={a}>
              {AMENITY_ICONS[a] || "✓"} {a}
            </span>
          ))}
          {amenities.length > 4 && <span className="amenity-more">+{amenities.length - 4}</span>}
        </div>

        <div className="listing-card-footer">
          <div className="listing-price">
            {stayType.includes("daily") && pricePerDay && (
              <span>₹{pricePerDay}<small>/day</small></span>
            )}
            {stayType.includes("monthly") && pricePerMonth && (
              <span>₹{pricePerMonth}<small>/mo</small></span>
            )}
          </div>
          <div className="listing-rating">
            {averageRating ? (
              <>
                <FaStar className="star-icon" />
                <span>{averageRating}</span>
                <span className="review-count">({reviewCount})</span>
              </>
            ) : (
              <span className="no-rating">New</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
