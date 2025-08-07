const express = require("express");
const router = express.Router({mergeParams: true}); // Allows access to params from parent route
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Reviews = require("../models/review.js");
const { isLoggedIn, isOwner, validateListing, validateReview } = require("../middleware.js");
const reviewController = require("../controllers/review.js");
// Reviews Route
router.post("/", validateReview, isLoggedIn, wrapAsync(reviewController.createReview));

// Delete Review Route
router.delete("/:reviewId", wrapAsync(reviewController.deleteReview));


module.exports = router;
