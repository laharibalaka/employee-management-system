const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/mailer");
const XLSX = require("xlsx");
const multer = require("multer");
const fs = require("fs");

const upload = multer({
  dest: "uploads/",
});

// ================= TEST ROUTE =================

router.get("/test", (req, res) => {

  console.log("AUTH TEST ROUTE HIT");

  res.send("Auth Route Working");

});

// ================= REGISTER =================

router.post("/register", async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role,
    } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {

      return res
        .status(400)
        .json("Email already exists");

    }

    const hashed = await bcrypt.hash(
      password,
      10
    );

    const user = new User({

      name,
      email,
      password: hashed,
      role,

    });

    await user.save();

    res.json("User Registered");

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

});

// ================= LOGIN =================

router.post("/login", async (req, res) => {

  console.log("LOGIN ROUTE HIT");

  try {

    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {

      return res
        .status(404)
        .json("User Not Found");

    }

    const valid = await bcrypt.compare(
      password,
      user.password
    );

    console.log("Password Match:", valid);

    const token = jwt.sign(

      {
        id: user._id,
        role: user.role,
      },

      "secret123",

      {
        expiresIn: "1d",
      }

    );

    res.json({

      token,
      role: user.role,
      id: user._id,
      name: user.name,
      email: user.email,
      photo: user.photo,

    });

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

});

// ================= UPDATE PROFILE =================

router.put("/profile/:id", async (req, res) => {

  try {

    const { email, password } = req.body;

    let updateData = {};

    if (email) {

      updateData.email = email;

    }

    if (password) {

      const hashed = await bcrypt.hash(
        password,
        10
      );

      updateData.password = hashed;

    }

    await User.findByIdAndUpdate(

      req.params.id,
      updateData

    );

    res.json("Profile Updated");

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

});

// ================= GET ALL HRS =================

router.get("/hrs", async (req, res) => {

  try {

    const hrs = await User.find({
      role: "hr",
    }).select("-password");

    res.json(hrs);

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

});
// ================= OTP STORAGE =================

const otpStore = {};

// ================= SEND OTP =================

router.post("/send-otp", async (req, res) => {

  try {

    const { email } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {

      return res
        .status(404)
        .json("User Not Found");

    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    otpStore[email] = otp;

    await sendEmail(

      email,

      "Password Reset OTP",

      `Your OTP is: ${otp}`

    );

    res.json("OTP Sent");

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

});

// ================= RESET PASSWORD =================

router.post("/reset-password", async (req, res) => {

  try {

    const {
      email,
      otp,
      password,
    } = req.body;

    if (
      otpStore[email] !== otp
    ) {

      return res
        .status(400)
        .json("Invalid OTP");

    }

    const hashed =
      await bcrypt.hash(
        password,
        10
      );

    await User.findOneAndUpdate(

      { email },

      {
        password: hashed,
      }

    );

    delete otpStore[email];

    res.json(
      "Password Reset Successful"
    );

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

});
// ================= UPDATE PHOTO =================

router.put("/photo/:id", async (req, res) => {

  try {

    const { photo } = req.body;

    await User.findByIdAndUpdate(

      req.params.id,

      {
        photo,
      }

    );

    res.json("Photo Updated");

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

});
// ================= IMPORT HRS FROM EXCEL =================

router.post(
  "/import-hrs",
  upload.single("file"),
  async (req, res) => {

    try {

      if (!req.file) {

        return res
          .status(400)
          .json("No file uploaded");

      }

      const workbook =
        XLSX.readFile(
          req.file.path
        );

      const sheetName =
        workbook.SheetNames[0];

      const data =
        XLSX.utils.sheet_to_json(
          workbook.Sheets[sheetName]
        );

      let added = 0;
      let skipped = 0;

      for (const row of data) {

        const name =
          row.Name?.trim();

        const email =
          row.Email?.trim();

        if (
          !name ||
          !email
        ) continue;

        const existingUser =
          await User.findOne({
            email,
          });

        if (existingUser) {

          skipped++;
          continue;

        }

        const tempPassword =
          name.split(" ")[0] +
          "@" +
          Math.floor(
            1000 +
              Math.random() * 9000
          );

        const hashedPassword =
          await bcrypt.hash(
            tempPassword,
            10
          );

        await User.create({

          name,
          email,
          password:
            hashedPassword,
          role: "hr",

        });

        await sendEmail(

          email,

          "Welcome HR - EMS PRO",

          `Hello ${name},

Your HR account has been created.

Login Email:
${email}

Temporary Password:
${tempPassword}

Please login and change your password.

Regards,
EMS PRO Team`

        );

        added++;

      }

      if (
        fs.existsSync(
          req.file.path
        )
      ) {

        fs.unlinkSync(
          req.file.path
        );

      }

      res.json({

        message:
          "HR Import Successful",

        added,
        skipped,

      });

    } catch (err) {

      console.log(err);

      res.status(500).json(err);

    }

  }
);
module.exports = router;