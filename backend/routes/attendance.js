const router = require("express").Router();
const Attendance = require("../models/Attendance");
const ExcelJS = require("exceljs");

// MARK

router.post("/mark", async (req, res) => {

  try {

    const { name, status, employeeId } = req.body;

    const att = new Attendance({
      name,
      status,
      employeeId,
      date: new Date().toLocaleDateString(),
    });

    await att.save();

    res.json("Saved");

  } catch (err) {

    res.status(500).json(err);

  }

});


// GET

router.get("/all", async (req, res) => {

  const data = await Attendance.find();

  res.json(data);

});
// ================= EXPORT ATTENDANCE EXCEL =================

router.get("/export", async (req, res) => {

  try {

    const attendance =
      await Attendance.find();

    const workbook =
      new ExcelJS.Workbook();

    const worksheet =
      workbook.addWorksheet(
        "Attendance"
      );

    worksheet.columns = [

      {
        header: "Employee ID",
        key: "employeeId",
        width: 20,
      },

      {
        header: "Name",
        key: "name",
        width: 25,
      },

      {
        header: "Status",
        key: "status",
        width: 15,
      },

      {
        header: "Date",
        key: "date",
        width: 20,
      },

    ];

    attendance.forEach((att) => {

      worksheet.addRow({

        employeeId:
          att.employeeId,

        name:
          att.name,

        status:
          att.status,

        date:
          att.date,

      });

    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=attendance.xlsx"
    );

    await workbook.xlsx.write(
      res
    );

    res.end();

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

});

module.exports = router;