require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoute = require("./routes/auth");
const employeeRoute = require("./routes/employee");
const attendanceRoute = require("./routes/attendance");
const leaveRoute = require("./routes/leave");
const salaryRoute = require("./routes/salary");
const uploadRoute = require("./routes/upload");

const Employee = require("./models/Employee");
const Leave = require("./models/Leave");
const Attendance = require("./models/Attendance");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ===============================
// MongoDB Connection
// ===============================


mongoose
  .connect(process.env.MONGODB_URL, {
    serverSelectionTimeoutMS: 10000,
    family: 4,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:");
    console.error(err);
  });

// ===============================
// Routes
// ===============================

app.use("/api/auth", authRoute);
app.use("/api/employee", employeeRoute);
app.use("/api/attendance", attendanceRoute);
app.use("/api/leave", leaveRoute);
app.use("/api/salary", salaryRoute);
app.use("/api/upload", uploadRoute);

// ===============================
// Stats API
// ===============================

app.get("/api/stats", async (req, res) => {
  try {
    const employees = await Employee.countDocuments();
    const leaves = await Leave.countDocuments();
    const attendance = await Attendance.countDocuments();

    res.status(200).json({
      employees,
      leaves,
      attendance,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch stats",
      error: err.message,
    });
  }
});

// ===============================
// Test Route
// ===============================

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// ===============================
// Start Server
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});