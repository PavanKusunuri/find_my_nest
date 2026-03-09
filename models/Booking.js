const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    listing: {
      type: mongoose.Schema.ObjectId,
      ref: "Listing",
      required: true,
    },
    tenant: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    stayType: {
      type: String,
      required: [true, "Please specify stay type"],
      enum: ["daily", "monthly"],
    },
    checkIn: {
      type: Date,
      required: [true, "Please add a check-in date"],
    },
    checkOut: {
      type: Date,
      required: [true, "Please add a check-out date"],
    },
    numberOfGuests: {
      type: Number,
      required: [true, "Please specify number of guests"],
      min: [1, "At least 1 guest is required"],
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded"],
      default: "unpaid",
    },
    paymentId: {
      type: String,
    },
    specialRequests: {
      type: String,
      maxlength: [500, "Special requests cannot exceed 500 characters"],
    },
    cancellationReason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate total price before saving
BookingSchema.pre("save", async function (next) {
  if (!this.isNew && !this.isModified("checkIn") && !this.isModified("checkOut")) {
    return next();
  }

  const Listing = mongoose.model("Listing");
  const listing = await Listing.findById(this.listing);
  if (!listing) return next(new Error("Listing not found"));

  const msPerDay = 1000 * 60 * 60 * 24;
  const days = Math.ceil((this.checkOut - this.checkIn) / msPerDay);

  if (this.stayType === "daily") {
    this.totalPrice = days * listing.pricePerDay;
  } else {
    const months = Math.ceil(days / 30);
    this.totalPrice = months * listing.pricePerMonth;
  }

  next();
});

module.exports = mongoose.model("Booking", BookingSchema);
