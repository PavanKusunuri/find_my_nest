const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Please add a title for the review"],
      maxlength: 100,
    },
    text: {
      type: String,
      required: [true, "Please add some text"],
      maxlength: [1000, "Review cannot exceed 1000 characters"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please add a rating between 1 and 5"],
    },
    listing: {
      type: mongoose.Schema.ObjectId,
      ref: "Listing",
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent user from submitting more than one review per listing
ReviewSchema.index({ listing: 1, user: 1 }, { unique: true });

// Static method to get average rating and save
ReviewSchema.statics.getAverageRating = async function (listingId) {
  const obj = await this.aggregate([
    { $match: { listing: listingId } },
    { $group: { _id: "$listing", averageRating: { $avg: "$rating" }, count: { $sum: 1 } } },
  ]);

  try {
    if (obj.length > 0) {
      await this.model("Listing").findByIdAndUpdate(listingId, {
        averageRating: Math.round(obj[0].averageRating * 10) / 10,
        reviewCount: obj[0].count,
      });
    } else {
      await this.model("Listing").findByIdAndUpdate(listingId, {
        averageRating: undefined,
        reviewCount: 0,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageRating after save
ReviewSchema.post("save", function () {
  this.constructor.getAverageRating(this.listing);
});

// Call getAverageRating after remove
ReviewSchema.post("remove", function () {
  this.constructor.getAverageRating(this.listing);
});

module.exports = mongoose.model("Review", ReviewSchema);
