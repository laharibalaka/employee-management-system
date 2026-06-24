const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 2525, // try 2525 instead of 587
  secure: false,
  auth: {
    user: "af1f4d001@smtp-brevo.com",
    pass: process.env.BREVO_SMTP_KEY,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

const sendEmail = async (to, subject, text) => {
  try {
    console.log("📧 Sending email to:", to);

    // Verify SMTP connection
    await transporter.verify();
    console.log("✅ SMTP Connected");

    const info = await transporter.sendMail({
      from: '"EMS PRO" <laharibalaka9@gmail.com>',
      to: to,
      subject: subject,
      text: text,
    });

    console.log("✅ Email Sent Successfully");
    console.log("📨 Message ID:", info.messageId);
    console.log("📬 Response:", info.response);

    return true;
  } catch (err) {
    console.error("❌ Email Error:");
    console.error(err);

    return false;
  }
};

module.exports = sendEmail;