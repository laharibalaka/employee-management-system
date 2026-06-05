const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({

  userId: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
  },

  reason: {
    type: String,
    required: true,
  },

  date: {
    type: String,
  },

  status: {
    type: String,
    default: "Pending",
  },

});

module.exports = mongoose.model(
  "Leave",
  leaveSchema
);