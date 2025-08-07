const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const passwordLocalMongoose = require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  }, username: {
    type: String,
    required: true,
    unique: true,
  }
});

userSchema.plugin(passwordLocalMongoose);

module.exports = mongoose.model("User", userSchema);
