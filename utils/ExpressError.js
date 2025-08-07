class ExpressError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.message = message || "Something went wrong";
  }
}

module.exports = ExpressError;