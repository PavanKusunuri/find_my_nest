const Review = require("../models/Review");
const Listing = require("../models/Listing");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc    Get reviews for a listing
// @route   GET /api/v1/listings/:listingId/reviews
// @access  Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  const filter = req.params.listingId ? { listing: req.params.listingId } : {};
  const reviews = await Review.find(filter)
    .populate("user", "name avatar")
    .sort("-createdAt");
  res.status(200).json({ success: true, count: reviews.length, data: reviews });
});

// @desc    Get single review
// @route   GET /api/v1/reviews/:id
// @access  Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id)
    .populate("user", "name avatar")
    .populate("listing", "title");

  if (!review) {
    return next(new ErrorResponse(`Review not found with id ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true, data: review });
});

// @desc    Add review
// @route   POST /api/v1/listings/:listingId/reviews
// @access  Private (tenant)
exports.addReview = asyncHandler(async (req, res, next) => {
  req.body.listing = req.params.listingId;
  req.body.user = req.user.id;

  const listing = await Listing.findById(req.params.listingId);
  if (!listing) {
    return next(new ErrorResponse(`Listing not found with id ${req.params.listingId}`, 404));
  }

  const review = await Review.create(req.body);
  res.status(201).json({ success: true, data: review });
});

// @desc    Update review
// @route   PUT /api/v1/reviews/:id
// @access  Private
exports.updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);
  if (!review) {
    return next(new ErrorResponse(`Review not found with id ${req.params.id}`, 404));
  }

  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse("Not authorized to update this review", 403));
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: review });
});

// @desc    Delete review
// @route   DELETE /api/v1/reviews/:id
// @access  Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return next(new ErrorResponse(`Review not found with id ${req.params.id}`, 404));
  }

  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse("Not authorized to delete this review", 403));
  }

  await review.deleteOne();
  res.status(200).json({ success: true, data: {} });
});
