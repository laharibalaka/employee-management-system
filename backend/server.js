require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoute = require("./routes/auth");
const employeeRoute = require("./routes/employee");
const attendanceRoute = require("./routes/attendance");
const leaveRoute = require("./routes/leave");

const Employee = require("./models/Employee");
const Leave = require("./models/Leave");
const Attendance = require("./models/Attendance");
const salaryRoute = require("./routes/salary");
const uploadRoute =
  require("./routes/upload");

const app = express();


// middleware
app.use(cors());
app.use(express.json());


// MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/employeeDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


// routes
app.use("/api/auth", authRoute);
app.use("/api/employee", employeeRoute);
app.use("/api/attendance", attendanceRoute);
app.use("/api/leave", leaveRoute);
app.use("/api/salary", salaryRoute);
app.use(
  "/api/upload",
  uploadRoute
);


////////////////////////////////////////////////////
// ✅ STATS API (THIS WAS MISSING)
////////////////////////////////////////////////////

app.get("/api/stats", async (req, res) => {

  try {

    const emp = await Employee.countDocuments();
    const leave = await Leave.countDocuments();
    const att = await Attendance.countDocuments();

    res.json({
      employees: emp,
      leaves: leave,
      attendance: att,
    });

  } catch (err) {

    res.status(500).json(err);

  }

});


////////////////////////////////////////////////////


// test
app.get("/", (req, res) => {
  res.send("Backend running");
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});