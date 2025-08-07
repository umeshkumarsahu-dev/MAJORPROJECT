const Listing = require("../models/listing");
const Reviews = require("../models/review");

module.exports.createReview = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) throw new ExpressError("Listing not found", 404);

  const review = new Reviews(req.body.review);
  review.author = req.user._id;
  listing.reviews.push(review);
  await review.save();
  await listing.save();
  console.log(review);
  // res.send("Review added successfully");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) throw new ExpressError("Listing not found", 404);

  await Reviews.findByIdAndDelete(reviewId);
  listing.reviews.pull(reviewId);
  await listing.save();

  res.redirect(`/listings/${id}`);
};