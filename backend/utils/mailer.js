const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "laharibalaka9@gmail.com",
    pass: "pikc utek ueoh mcit",
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: "laharibalaka9@gmail.com",
      to,
      subject,
      text,
    });

    console.log("✅ Email Sent");
  } catch (err) {
    console.log("❌ Email Error:", err);
  }
};

module.exports = sendEmail;