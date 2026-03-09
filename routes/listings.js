const express = require("express");
const {
  getListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
  searchListings,
  getMyListings,
} = require("../controllers/listings");

const reviewRouter = require("./reviews");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Re-route into review router
router.use("/:listingId/reviews", reviewRouter);

router.get("/search", searchListings);
router.get("/my", protect, authorize("owner", "admin"), getMyListings);

router
  .route("/")
  .get(getListings)
  .post(protect, authorize("owner", "admin"), createListing);

router
  .route("/:id")
  .get(getListing)
  .put(protect, authorize("owner", "admin"), updateListing)
  .delete(protect, authorize("owner", "admin"), deleteListing);

module.exports = router;
