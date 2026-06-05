const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({

  employeeId: String,

  name: String,

  status: String,

  date: String,

});

module.exports = mongoose.model(
  "Attendance",
  attendanceSchema
);