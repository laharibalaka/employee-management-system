const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
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
    return true;
  } catch (err) {
    console.log("❌ Email Error:", err);
    return false;
  }
};

module.exports = sendEmail;