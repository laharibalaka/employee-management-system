const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "laharibalaka9@gmail.com",
    pass: "pikc utek ueoh mcit",
  },
  connectionTimeout: 30000,
});

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: "laharibalaka9@gmail.com",
      to,
      subject,
      text,
    });

    console.log("✅ Email Sent Successfully");
    return true;
  } catch (err) {
    console.log("❌ Email Error:", err);
    return false;
  }
};

module.exports = sendEmail;