const Listing = require("../models/Listing");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc    Get all listings
// @route   GET /api/v1/listings
// @access  Public
exports.getListings = asyncHandler(async (req, res, next) => {
  const reqQuery = { ...req.query };
  const removeFields = ["select", "sort", "page", "limit"];
  removeFields.forEach((param) => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

  let query = Listing.find(JSON.parse(queryStr)).populate("owner", "name email phone avatar");

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 12;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Listing.countDocuments(JSON.parse(queryStr));

  query = query.skip(startIndex).limit(limit);

  const listings = await query;

  const pagination = {};
  if (endIndex < total) pagination.next = { page: page + 1, limit };
  if (startIndex > 0) pagination.prev = { page: page - 1, limit };

  res.status(200).json({
    success: true,
    count: listings.length,
    total,
    pagination,
    data: listings,
  });
});

// @desc    Get single listing
// @route   GET /api/v1/listings/:id
// @access  Public
exports.getListing = asyncHandler(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id)
    .populate("owner", "name email phone avatar bio")
    .populate({
      path: "reviews",
      select: "title text rating user createdAt",
      populate: { path: "user", select: "name avatar" },
    });

  if (!listing) {
    return next(new ErrorResponse(`Listing not found with id ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: listing });
});

// @desc    Create listing
// @route   POST /api/v1/listings
// @access  Private (owner, admin)
exports.createListing = asyncHandler(async (req, res, next) => {
  req.body.owner = req.user.id;
  const listing = await Listing.create(req.body);
  res.status(201).json({ success: true, data: listing });
});

// @desc    Update listing
// @route   PUT /api/v1/listings/:id
// @access  Private (owner, admin)
exports.updateListing = asyncHandler(async (req, res, next) => {
  let listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(new ErrorResponse(`Listing not found with id ${req.params.id}`, 404));
  }

  if (listing.owner.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse("Not authorized to update this listing", 403));
  }

  listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: listing });
});

// @desc    Delete listing
// @route   DELETE /api/v1/listings/:id
// @access  Private (owner, admin)
exports.deleteListing = asyncHandler(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(new ErrorResponse(`Listing not found with id ${req.params.id}`, 404));
  }

  if (listing.owner.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse("Not authorized to delete this listing", 403));
  }

  await listing.deleteOne();
  res.status(200).json({ success: true, data: {} });
});

// @desc    Search listings by location / keyword
// @route   GET /api/v1/listings/search
// @access  Public
exports.searchListings = asyncHandler(async (req, res, next) => {
  const { q, type, stayType, minPrice, maxPrice, amenities, city, genderPreference } = req.query;

  const filter = { isAvailable: true };

  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
      { address: { $regex: q, $options: "i" } },
    ];
  }
  if (type) filter.type = type;
  if (stayType) filter.stayType = stayType;
  if (city) filter["location.city"] = { $regex: city, $options: "i" };
  if (genderPreference) filter.genderPreference = { $in: [genderPreference, "any"] };
  if (amenities) filter.amenities = { $all: amenities.split(",") };

  if (minPrice || maxPrice) {
    if (stayType === "daily") {
      filter.pricePerDay = {};
      if (minPrice) filter.pricePerDay.$gte = Number(minPrice);
      if (maxPrice) filter.pricePerDay.$lte = Number(maxPrice);
    } else {
      filter.pricePerMonth = {};
      if (minPrice) filter.pricePerMonth.$gte = Number(minPrice);
      if (maxPrice) filter.pricePerMonth.$lte = Number(maxPrice);
    }
  }

  const listings = await Listing.find(filter)
    .populate("owner", "name avatar")
    .sort("-createdAt")
    .limit(20);

  res.status(200).json({ success: true, count: listings.length, data: listings });
});

// @desc    Get listings by owner
// @route   GET /api/v1/listings/my
// @access  Private (owner)
exports.getMyListings = asyncHandler(async (req, res, next) => {
  const listings = await Listing.find({ owner: req.user.id }).sort("-createdAt");
  res.status(200).json({ success: true, count: listings.length, data: listings });
});
