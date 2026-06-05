const router = require("express").Router();
const Leave = require("../models/Leave");
const sendEmail = require("../utils/mailer");

// ================= APPLY LEAVE =================

router.post("/apply", async (req, res) => {

  try {

    const {
      userId,
      name,
      email,
      reason,
    } = req.body;

    if (!userId || !name || !reason) {

      return res
        .status(400)
        .json("All fields are required");

    }

    const leave = new Leave({

      userId,
      name,
      email,
      reason,
      date: new Date().toLocaleDateString(),
      status: "Pending",

    });

    await leave.save();

    res.json("Leave Applied");

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

});

// ================= GET ALL LEAVES =================

router.get("/all", async (req, res) => {

  try {

    const data = await Leave.find()
      .sort({ _id: -1 });

    res.json(data);

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

});

// ================= GET USER LEAVES =================

router.get("/my/:id", async (req, res) => {

  try {

    const data = await Leave.find({

      userId: req.params.id,

    }).sort({ _id: -1 });

    res.json(data);

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

});

// ================= UPDATE LEAVE STATUS =================

router.put("/update/:id", async (req, res) => {

  try {

    const { status } = req.body;

    const leave = await Leave.findById(
      req.params.id
    );

    if (!leave) {

      return res
        .status(404)
        .json("Leave Not Found");

    }

    leave.status = status;

    await leave.save();

    // EMAIL NOTIFICATION

    if (
      leave.email &&
      (status === "Approved" ||
        status === "Rejected")
    ) {

      await sendEmail(

        leave.email,

        `Leave Request ${status}`,

        `Hello ${leave.name},

Your leave request has been ${status}.

Reason: ${leave.reason}

Date: ${leave.date}

Thank you,
EMS PRO Team`

      );

    }

    res.json("Leave Status Updated");

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

});

// ================= DELETE LEAVE =================

router.delete("/delete/:id", async (req, res) => {

  try {

    await Leave.findByIdAndDelete(
      req.params.id
    );

    res.json("Leave Deleted");

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

});

module.exports = router;