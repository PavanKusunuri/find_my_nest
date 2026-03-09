const Booking = require("../models/Booking");
const Listing = require("../models/Listing");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc    Get all bookings (admin) or my bookings (tenant/owner)
// @route   GET /api/v1/bookings
// @access  Private
exports.getBookings = asyncHandler(async (req, res, next) => {
  let query;
  if (req.user.role === "admin") {
    query = Booking.find()
      .populate("listing", "title images address")
      .populate("tenant", "name email phone")
      .populate("owner", "name email");
  } else if (req.user.role === "owner") {
    query = Booking.find({ owner: req.user.id })
      .populate("listing", "title images address")
      .populate("tenant", "name email phone");
  } else {
    query = Booking.find({ tenant: req.user.id })
      .populate("listing", "title images address pricePerDay pricePerMonth")
      .populate("owner", "name email phone");
  }

  const bookings = await query.sort("-createdAt");
  res.status(200).json({ success: true, count: bookings.length, data: bookings });
});

// @desc    Get single booking
// @route   GET /api/v1/bookings/:id
// @access  Private
exports.getBooking = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id)
    .populate("listing", "title images address type pricePerDay pricePerMonth")
    .populate("tenant", "name email phone avatar")
    .populate("owner", "name email phone avatar");

  if (!booking) {
    return next(new ErrorResponse(`Booking not found with id ${req.params.id}`, 404));
  }

  if (
    booking.tenant._id.toString() !== req.user.id &&
    booking.owner._id.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(new ErrorResponse("Not authorized to view this booking", 403));
  }

  res.status(200).json({ success: true, data: booking });
});

// @desc    Create booking
// @route   POST /api/v1/bookings
// @access  Private (tenant)
exports.createBooking = asyncHandler(async (req, res, next) => {
  const { listingId, checkIn, checkOut, stayType, numberOfGuests, specialRequests } = req.body;

  const listing = await Listing.findById(listingId);
  if (!listing) {
    return next(new ErrorResponse(`Listing not found with id ${listingId}`, 404));
  }
  if (!listing.isAvailable) {
    return next(new ErrorResponse("This listing is currently unavailable", 400));
  }
  if (!listing.stayType.includes(stayType)) {
    return next(new ErrorResponse(`This listing does not support ${stayType} stays`, 400));
  }

  const booking = await Booking.create({
    listing: listingId,
    tenant: req.user.id,
    owner: listing.owner,
    stayType,
    checkIn: new Date(checkIn),
    checkOut: new Date(checkOut),
    numberOfGuests,
    specialRequests,
    totalPrice: 0, // pre-save hook calculates this
  });

  res.status(201).json({ success: true, data: booking });
});

// @desc    Update booking status (owner/admin)
// @route   PUT /api/v1/bookings/:id
// @access  Private
exports.updateBooking = asyncHandler(async (req, res, next) => {
  let booking = await Booking.findById(req.params.id);
  if (!booking) {
    return next(new ErrorResponse(`Booking not found with id ${req.params.id}`, 404));
  }

  const isOwner = booking.owner.toString() === req.user.id;
  const isTenant = booking.tenant.toString() === req.user.id;
  const isAdmin = req.user.role === "admin";

  if (!isOwner && !isTenant && !isAdmin) {
    return next(new ErrorResponse("Not authorized to update this booking", 403));
  }

  // Owners can confirm/cancel, tenants can cancel
  const { status, paymentStatus, cancellationReason } = req.body;
  const updateData = {};
  if (status) updateData.status = status;
  if (paymentStatus && (isOwner || isAdmin)) updateData.paymentStatus = paymentStatus;
  if (cancellationReason) updateData.cancellationReason = cancellationReason;

  booking = await Booking.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: booking });
});

// @desc    Cancel booking
// @route   DELETE /api/v1/bookings/:id
// @access  Private
exports.cancelBooking = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return next(new ErrorResponse(`Booking not found with id ${req.params.id}`, 404));
  }

  if (
    booking.tenant.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(new ErrorResponse("Not authorized to cancel this booking", 403));
  }

  if (booking.status === "completed") {
    return next(new ErrorResponse("Cannot cancel a completed booking", 400));
  }

  await Booking.findByIdAndUpdate(req.params.id, {
    status: "cancelled",
    cancellationReason: req.body.reason || "Cancelled by user",
  });

  res.status(200).json({ success: true, data: {} });
});
