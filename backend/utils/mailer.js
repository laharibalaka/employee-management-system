const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "af1f4d001@smtp-brevo.com",
    pass: process.env.BREVO_SMTP_KEY,
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    console.log("📧 Sending email to:", to);

    const info = await transporter.sendMail({
      from: "laharibalaka9@gmail.com",
      to,
      subject,
      text,
    });

    console.log("✅ Email Sent");
    console.log("Message ID:", info.messageId);

    return true;
  } catch (err) {
    console.log("❌ Email Error:", err);
    return false;
  }
};

module.exports = sendEmail;