const express = require("express");
const {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  cancelBooking,
} = require("../controllers/bookings");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .get(protect, getBookings)
  .post(protect, authorize("tenant", "admin"), createBooking);

router
  .route("/:id")
  .get(protect, getBooking)
  .put(protect, updateBooking)
  .delete(protect, cancelBooking);

module.exports = router;
