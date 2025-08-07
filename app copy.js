const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const Reviews = require("./models/review.js");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const { reviewSchema } = require("./schema.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const validateReview = (req, res, next) => {
  // console.log(req.body);
  const { error } = reviewSchema.validate(req.body);  
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

//   const allListings = await Listing.find({});
//   res.render("listings/index.ejs", { allListings });
// }));

// // New Route (Fixed plural)
// app.get("/listings/new", (req, res) => {
//   res.render("listings/new.ejs");
// });

// // Create Route
// app.post("/listings", wrapAsync(async (req, res) => {
//   let newListing = new Listing(req.body.listing);
//   await newListing.save();
//   res.redirect("/listings");
// }));

// // Show Route
// app.get("/listings/:id", wrapAsync(async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id).populate("reviews");
//   if (!listing) throw new ExpressError("Listing not found", 404);
//   res.render("listings/show.ejs", { listing });
// }));

// // Edit Route
// app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id);
//   if (!listing) throw new ExpressError("Listing not found", 404);
//   res.render("listings/edit.ejs", { listing });
// }));

// // Update Route
// app.put("/listings/:id", wrapAsync(async (req, res) => {
//   let { id } = req.params;
//   await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//   res.redirect(`/listings/${id}`);
// }));

// // Delete Route
// app.delete("/listings/:id", wrapAsync(async (req, res) => {
//   let { id } = req.params;
//   let deleteListing = await Listing.findByIdAndDelete(id);
//   if (!deleteListing) throw new ExpressError("Listing not found", 404);
//   res.redirect("/listings");
// }));

// // Reviews Route
// app.post("/listings/:id/reviews", validateReview, wrapAsync(async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id);
//   if (!listing) throw new ExpressError("Listing not found", 404);
  
//   const review = new Reviews(req.body.review);
//   listing.reviews.push(review);
//   await review.save();
//   await listing.save();
//   console.log(review);
//   // res.send("Review added successfully");
//   res.redirect(`/listings/${id}`);
// }));

// // Delete Review Route
// app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async (req, res) => {
//   let { id, reviewId } = req.params;
//   const listing = await Listing.findById(id);
//   if (!listing) throw new ExpressError("Listing not found", 404);
  
//   await Reviews.findByIdAndDelete(reviewId);
//   listing.reviews.pull(reviewId);
//   await listing.save();
  
//   res.redirect(`/listings/${id}`);
// }));

// Test route (optional)
app.get("/testListing", async (req, res) => {
  let sampleListing = new Listing({
    title: "My New Villa",
    description: "By the beach",
    price: 1200,
    location: "Calangute, Goa",
    country: "India"
  });
  await sampleListing.save();
  res.send("Sample saved");
});

// 404 Route
// app.all("*", (req, res, next) => {
//   next(new ExpressError("Page Not Found", 404));
// });

// Global Error Handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).send(message);
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
