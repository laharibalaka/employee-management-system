const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema({

  name: String,

  email: String,

  amount: Number,

  baseSalary: Number,

  presentDays: Number,

  workingDays: Number,

  month: String,

  date: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model(
  "Salary",
  salarySchema
);