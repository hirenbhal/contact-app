const mongoose = require("mongoose");

const messageListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  messageBody: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const message = mongoose.model("MESSAGES", messageListSchema);
module.exports = message;
