const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({

  name: String,

  email: String,

  baseSalary: {
    type: Number,
    default: 30000,
  },

});

module.exports = mongoose.model(
  "Employee",
  employeeSchema
);