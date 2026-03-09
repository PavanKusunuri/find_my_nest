const express = require("express");
const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviews");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getReviews)
  .post(protect, authorize("tenant", "admin"), addReview);

router
  .route("/:id")
  .get(getReview)
  .put(protect, authorize("tenant", "admin"), updateReview)
  .delete(protect, authorize("tenant", "admin"), deleteReview);

module.exports = router;
