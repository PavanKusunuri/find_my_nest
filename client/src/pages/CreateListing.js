import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../utils/api";
import { toast } from "react-toastify";

const AMENITY_OPTIONS = [
  "wifi", "ac", "parking", "laundry", "kitchen", "gym", "pool",
  "tv", "geyser", "security", "meals", "cleaning", "power_backup", "furnished"
];

const CreateListing = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "", description: "", type: "room",
    stayType: ["monthly"],
    pricePerDay: "", pricePerMonth: "",
    address: "", maxOccupancy: 1, totalRooms: 1,
    genderPreference: "any", amenities: [],
    rules: "", availableFrom: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const toggleStayType = (type) => {
    setForm((prev) => ({
      ...prev,
      stayType: prev.stayType.includes(type)
        ? prev.stayType.filter((t) => t !== type)
        : [...prev.stayType, type],
    }));
  };

  const toggleAmenity = (a) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(a)
        ? prev.amenities.filter((x) => x !== a)
        : [...prev.amenities, a],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.stayType.length === 0) {
      toast.error("Please select at least one stay type");
      return;
    }
    setLoading(true);
    try {
      const payload = { ...form };
      if (!payload.pricePerDay) delete payload.pricePerDay;
      if (!payload.pricePerMonth) delete payload.pricePerMonth;
      if (!payload.availableFrom) delete payload.availableFrom;

      const res = await api.post("/listings", payload);
      toast.success("Listing created successfully!");
      history.push(`/listings/${res.data.data._id}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-listing-page">
      <div className="container">
        <h1>Create New Listing</h1>
        <form onSubmit={handleSubmit} className="listing-form">

          <section className="form-section">
            <h2>Basic Information</h2>
            <div className="form-group">
              <label>Title *</label>
              <input type="text" name="title" required maxLength={100}
                placeholder="e.g. Cozy Room near IT Park" value={form.title} onChange={handleChange} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Property Type *</label>
                <select name="type" value={form.type} onChange={handleChange}>
                  <option value="room">Room</option>
                  <option value="hostel">Hostel</option>
                  <option value="pg">PG</option>
                  <option value="apartment">Apartment</option>
                  <option value="studio">Studio</option>
                </select>
              </div>
              <div className="form-group">
                <label>Gender Preference</label>
                <select name="genderPreference" value={form.genderPreference} onChange={handleChange}>
                  <option value="any">Any</option>
                  <option value="male">Male only</option>
                  <option value="female">Female only</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Description *</label>
              <textarea name="description" required rows={5} maxLength={2000}
                placeholder="Describe your property..." value={form.description} onChange={handleChange} />
            </div>
          </section>

          <section className="form-section">
            <h2>Stay Type & Pricing</h2>
            <div className="form-group">
              <label>Available For *</label>
              <div className="checkbox-row">
                {["daily", "monthly"].map((t) => (
                  <label key={t} className="checkbox-label">
                    <input type="checkbox" checked={form.stayType.includes(t)} onChange={() => toggleStayType(t)} />
                    {t.charAt(0).toUpperCase() + t.slice(1)} Stay
                  </label>
                ))}
              </div>
            </div>
            <div className="form-row">
              {form.stayType.includes("daily") && (
                <div className="form-group">
                  <label>Price Per Day (₹) *</label>
                  <input type="number" name="pricePerDay" min={0}
                    placeholder="500" value={form.pricePerDay} onChange={handleChange} />
                </div>
              )}
              {form.stayType.includes("monthly") && (
                <div className="form-group">
                  <label>Price Per Month (₹) *</label>
                  <input type="number" name="pricePerMonth" min={0}
                    placeholder="5000" value={form.pricePerMonth} onChange={handleChange} />
                </div>
              )}
            </div>
          </section>

          <section className="form-section">
            <h2>Location & Capacity</h2>
            <div className="form-group">
              <label>Full Address *</label>
              <input type="text" name="address" required
                placeholder="123, Main Street, City, State - PIN"
                value={form.address} onChange={handleChange} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Max Occupancy *</label>
                <input type="number" name="maxOccupancy" min={1} required value={form.maxOccupancy} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Total Rooms</label>
                <input type="number" name="totalRooms" min={1} value={form.totalRooms} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Available From</label>
                <input type="date" name="availableFrom" value={form.availableFrom} onChange={handleChange} />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2>Amenities</h2>
            <div className="amenities-checkboxes">
              {AMENITY_OPTIONS.map((a) => (
                <label key={a} className="amenity-checkbox">
                  <input type="checkbox" checked={form.amenities.includes(a)} onChange={() => toggleAmenity(a)} />
                  {a}
                </label>
              ))}
            </div>
          </section>

          <section className="form-section">
            <h2>House Rules</h2>
            <div className="form-group">
              <textarea name="rules" rows={3} maxLength={500}
                placeholder="e.g. No pets, No smoking, Quiet hours after 10pm..."
                value={form.rules} onChange={handleChange} />
            </div>
          </section>

          <div className="form-actions">
            <button type="button" className="btn-outline" onClick={() => history.goBack()}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Creating..." : "Create Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
