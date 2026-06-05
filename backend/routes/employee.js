const router = require("express").Router();
const Employee = require("../models/Employee");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/mailer");
const XLSX = require("xlsx");
const multer = require("multer");
const fs = require("fs");

const upload = multer({
dest: "uploads/",
});

// ================= ADD EMPLOYEE =================

router.post("/add", async (req, res) => {
  console.log("BODY:", req.body);

try {


const {
  name,
  email,
  baseSalary,
} = req.body;

const existingEmployee =
  await Employee.findOne({ email });

if (existingEmployee) {

  return res
    .status(400)
    .json("Employee already exists");

}

const existingUser =
  await User.findOne({ email });

if (existingUser) {

  return res
    .status(400)
    .json("User already exists");

}

const tempPassword =
  name.split(" ")[0] +
  "@" +
  Math.floor(
    1000 + Math.random() * 9000
  );

const hashedPassword =
  await bcrypt.hash(
    tempPassword,
    10
  );

const emp = new Employee({

  name,
  email,
  baseSalary,

});
await emp.save();

const user = new User({
  name,
  email,
  password: hashedPassword,
  role: "employee",
});

await user.save();

await sendEmail(
  email,
  "Welcome to EMS PRO",
  `Hello ${name},


Your employee account has been created.

Login Email:
${email}

Temporary Password:
${tempPassword}

Please login and change your password.

Regards,
EMS PRO Team`
);


res.json(
  "Employee Added & Email Sent"
);


} catch (err) {


console.log(err);

res.status(500).json(err);


}

});

// ================= IMPORT EMPLOYEES FROM EXCEL =================

router.post(
"/import",
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
console.log("Excel Data:", data);
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

    const existingEmployee =
      await Employee.findOne({
        email,
      });

    if (
  existingUser ||
  existingEmployee
) {

  skipped++;

  console.log(
    "Already Exists:",
    email
  );

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

   await Employee.create({

  name,
  email,
  baseSalary: 30000,

});

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "employee",
    });

    await sendEmail(
      email,
      "Welcome to EMS PRO",
      `Hello ${name},


Your employee account has been created.

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

  if (fs.existsSync(req.file.path)) {

    fs.unlinkSync(
      req.file.path
    );

  }

  res.json({
    message:
      "Import Successful",
    added,
    skipped,
  });

} catch (err) {

  console.log(err);

  res.status(500).json(err);

}


}
);

// ================= GET ALL EMPLOYEES =================

router.get("/all", async (req, res) => {

try {


const employees =
  await Employee.find();

res.json(employees);


} catch (err) {


res.status(500).json(err);


}

});

// ================= DELETE EMPLOYEE =================

router.delete("/delete/:id", async (req, res) => {

try {


await Employee.findByIdAndDelete(
  req.params.id
);

res.json("Employee Deleted");


} catch (err) {


res.status(500).json(err);


}

});

// ================= UPDATE EMPLOYEE =================

router.put("/update/:id", async (req, res) => {

try {


const {
  name,
  email,
  baseSalary,
} = req.body;

await Employee.findByIdAndUpdate(
  req.params.id,
  { name, email }
);

res.json("Employee Updated");


} catch (err) {


res.status(500).json(err);


}

});

module.exports = router;
