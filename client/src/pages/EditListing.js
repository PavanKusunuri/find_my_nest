import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../utils/api";
import { toast } from "react-toastify";

const AMENITY_OPTIONS = [
  "wifi", "ac", "parking", "laundry", "kitchen", "gym", "pool",
  "tv", "geyser", "security", "meals", "cleaning", "power_backup", "furnished"
];

const EditListing = () => {
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/listings/${id}`);
        const l = res.data.data;
        setForm({
          title: l.title, description: l.description, type: l.type,
          stayType: l.stayType, pricePerDay: l.pricePerDay || "",
          pricePerMonth: l.pricePerMonth || "", address: l.address,
          maxOccupancy: l.maxOccupancy, totalRooms: l.totalRooms,
          genderPreference: l.genderPreference, amenities: l.amenities || [],
          rules: l.rules || "", isAvailable: l.isAvailable,
        });
      } catch {
        toast.error("Failed to load listing");
        history.push("/owner/dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id, history]);

  const handleChange = (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: val });
  };

  const toggleStayType = (type) =>
    setForm((prev) => ({
      ...prev,
      stayType: prev.stayType.includes(type)
        ? prev.stayType.filter((t) => t !== type)
        : [...prev.stayType, type],
    }));

  const toggleAmenity = (a) =>
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(a)
        ? prev.amenities.filter((x) => x !== a)
        : [...prev.amenities, a],
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/listings/${id}`, form);
      toast.success("Listing updated!");
      history.push(`/listings/${id}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !form) return <div className="loading-full">Loading...</div>;

  return (
    <div className="create-listing-page">
      <div className="container">
        <h1>Edit Listing</h1>
        <form onSubmit={handleSubmit} className="listing-form">
          <section className="form-section">
            <h2>Basic Information</h2>
            <div className="form-group">
              <label>Title *</label>
              <input type="text" name="title" required value={form.title} onChange={handleChange} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Type</label>
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
              <div className="form-group">
                <label>
                  <input type="checkbox" name="isAvailable" checked={form.isAvailable} onChange={handleChange} />
                  {" "}Available
                </label>
              </div>
            </div>
            <div className="form-group">
              <label>Description *</label>
              <textarea name="description" required rows={5} value={form.description} onChange={handleChange} />
            </div>
          </section>

          <section className="form-section">
            <h2>Stay Type & Pricing</h2>
            <div className="form-group">
              <div className="checkbox-row">
                {["daily", "monthly"].map((t) => (
                  <label key={t} className="checkbox-label">
                    <input type="checkbox" checked={form.stayType.includes(t)} onChange={() => toggleStayType(t)} />
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-row">
              {form.stayType.includes("daily") && (
                <div className="form-group">
                  <label>Price Per Day (₹)</label>
                  <input type="number" name="pricePerDay" value={form.pricePerDay} onChange={handleChange} />
                </div>
              )}
              {form.stayType.includes("monthly") && (
                <div className="form-group">
                  <label>Price Per Month (₹)</label>
                  <input type="number" name="pricePerMonth" value={form.pricePerMonth} onChange={handleChange} />
                </div>
              )}
            </div>
          </section>

          <section className="form-section">
            <h2>Location & Capacity</h2>
            <div className="form-group">
              <label>Address *</label>
              <input type="text" name="address" required value={form.address} onChange={handleChange} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Max Occupancy</label>
                <input type="number" name="maxOccupancy" min={1} value={form.maxOccupancy} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Total Rooms</label>
                <input type="number" name="totalRooms" min={1} value={form.totalRooms} onChange={handleChange} />
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
              <textarea name="rules" rows={3} value={form.rules} onChange={handleChange} />
            </div>
          </section>

          <div className="form-actions">
            <button type="button" className="btn-outline" onClick={() => history.goBack()}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditListing;
