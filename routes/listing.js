const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const listingController = require("../controllers/listings.js");
const { isLoggedIn, isOwner, validateListing, isReviewAuthor } = require("../middleware.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// Route to show form
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Create Listing + File Upload
router.route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    validateListing,
    upload.single('listing[image]'), // ⚠️ make sure this matches the input field name
    wrapAsync(listingController.createListings)
  );
// router.route("/")
//   .get(wrapAsync(listingController.index))
// .post(isLoggedIn, validateListing, wrapAsync(listingController.createListings));
// .post(upload.single('listing[image]'), (req, res) => res.send(req.file));
// .post(
//   isLoggedIn,
//   upload.single('listing[image]'),
//   wrapAsync(async (req, res) => {
//     console.log("Uploaded File: ", req.file); // Debug log
//     res.send(req.file); // Temporary response
//   })
// );

// console.log(require('dotenv').config());
// Show, Update, Delete
router.route("/:id")
  .get(wrapAsync(listingController.showListings))
  .put(isLoggedIn,
    validateListing,
    upload.single('listing[image]'), // ⚠️ make sure this matches the input field name, wrapAsync(listingController.updateListings))
  .delete (isLoggedIn, isOwner, isReviewAuthor, wrapAsync(listingController.destroyListings));

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListings));

module.exports = router;
