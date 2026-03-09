const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxlength: [2000, "Description cannot be more than 2000 characters"],
    },
    type: {
      type: String,
      required: [true, "Please specify the listing type"],
      enum: ["room", "hostel", "apartment", "pg", "studio"],
    },
    stayType: {
      type: [String],
      required: [true, "Please specify stay type"],
      enum: ["daily", "monthly"],
    },
    pricePerDay: {
      type: Number,
      min: [0, "Price per day cannot be negative"],
    },
    pricePerMonth: {
      type: Number,
      min: [0, "Price per month cannot be negative"],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    location: {
      // GeoJSON
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    images: {
      type: [String],
      default: ["no-photo.jpg"],
    },
    amenities: {
      type: [String],
      enum: [
        "wifi",
        "ac",
        "parking",
        "laundry",
        "kitchen",
        "gym",
        "pool",
        "tv",
        "geyser",
        "security",
        "meals",
        "cleaning",
        "power_backup",
        "furnished",
      ],
    },
    genderPreference: {
      type: String,
      enum: ["male", "female", "any"],
      default: "any",
    },
    maxOccupancy: {
      type: Number,
      required: [true, "Please specify max occupancy"],
      min: [1, "Occupancy must be at least 1"],
    },
    totalRooms: {
      type: Number,
      default: 1,
    },
    availableRooms: {
      type: Number,
      default: 1,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    availableFrom: {
      type: Date,
      default: Date.now,
    },
    rules: {
      type: String,
      maxlength: [500, "Rules cannot be more than 500 characters"],
    },
    averageRating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot be more than 5"],
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

// Virtual populate reviews
ListingSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "listing",
  justOne: false,
});

// Ensure at least one price is provided based on stayType
ListingSchema.pre("save", function (next) {
  if (this.stayType.includes("daily") && !this.pricePerDay) {
    return next(new Error("Price per day is required for daily stay listings"));
  }
  if (this.stayType.includes("monthly") && !this.pricePerMonth) {
    return next(
      new Error("Price per month is required for monthly stay listings")
    );
  }
  next();
});

module.exports = mongoose.model("Listing", ListingSchema);
