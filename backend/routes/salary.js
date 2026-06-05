const router = require("express").Router();
const Salary = require("../models/Salary");
const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");
const sendEmail = require("../utils/mailer");

// ================= ADD SALARY =================

router.post("/add", async (req, res) => {

try {


const {
  name,
  email,
  amount,
  month,
} = req.body;

const sal = new Salary({

  name,
  email,
  amount,
  month,

});

await sal.save();

if (email) {

  await sendEmail(

    email,

    "Salary Generated",

    `Hello ${name},


Your salary has been generated.

Month: ${month}

Amount: ₹${amount}

Thank you,
EMS PRO Team`


  );

}

res.json("Salary Added");


} catch (err) {


console.log(err);

res.status(500).json(err);


}

});

// ================= AUTO PAYROLL =================

router.post(
"/generate-payroll",
async (req, res) => {


try {

  const {
    employeeId,
    month,
  } = req.body;

  const employee =
    await Employee.findById(
      employeeId
    );

  if (!employee) {

    return res
      .status(404)
      .json(
        "Employee Not Found"
      );

  }

  const existingSalary =
    await Salary.findOne({

      email:
        employee.email,

      month,

    });

 if (
  existingSalary &&
  existingSalary.amount > 0
){

    return res
      .status(400)
      .json(
        "Payroll already generated for this month"
      );

  }

 const presentDays =
  await Attendance.countDocuments({

    name: employee.name,

    status: "Present",

  });

  const workingDays = 30;

  const amount =
    Math.round(

      (
        employee.baseSalary /
        workingDays
      ) *
        presentDays

    );

  const salary =
    new Salary({

      name:
        employee.name,

      email:
        employee.email,

      amount,

      baseSalary:
        employee.baseSalary,

      presentDays,

      workingDays,

      month,

    });

  await salary.save();

  await sendEmail(

    employee.email,

    "Payroll Generated",

    `Hello ${employee.name},


Month:
${month}

Present Days:
${presentDays}

Working Days:
${workingDays}

Generated Salary:
₹${amount}

Regards,
EMS PRO Team`


  );

  res.json({

    message:
      "Payroll Generated Successfully",

    amount,

    presentDays,

    workingDays,

  });

} catch (err) {

  console.log(err);

  res.status(500).json(err);

}


}
);

// ================= GET ALL SALARY =================

router.get("/all", async (req, res) => {

try {

const data =
  await Salary.find();

res.json(data);


} catch (err) {


res.status(500).json(err);


}

});

// ================= DELETE SALARY =================

router.delete("/delete/:id", async (req, res) => {

try {


await Salary.findByIdAndDelete(
  req.params.id
);

res.json(
  "Salary Deleted"
);


} catch (err) {


res.status(500).json(err);


}

});

module.exports = router;
