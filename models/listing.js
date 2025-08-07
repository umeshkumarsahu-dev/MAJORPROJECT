const { ref } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  // image: {
  //   filename: String,
  //   url: {
  //     type: String,
  //     // required: true,
  //     set: (v) =>
  //       v === ""
  //         ? "https://plus.unsplash.com/premium_photo-1749729695562-61175ca6a387?w=1000&auto=format&fit=crop&q=60"
  //         : v,
  //   },
  // },
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review"
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
});

listingSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await mongoose.model("Review").deleteMany({ _id: { $in: doc.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
