const joi = require("joi");

module.exports.listingSchema = joi.object({
  listing: joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    image: joi.string().uri().required(),
    price: joi.number().min(0).required(),
    location: joi.string().required(),
    country: joi.string().required(),
  }).required() // 👈 fixed here
});

module.exports.reviewSchema = joi.object({
  review: joi.object({
    rating: joi.number().min(1).max(5).required(),
    comment: joi.string().required()
    // user: joi.string().required()  
  }).required()
});


module.exports.validateReview = (req, res, next) => {
  // console.log(req.body);
  const { error } = this.reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
