require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to email server:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Banking System" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

async function sendRegistrationEmail(userEmail, name) {
  const subject = "🎉 Welcome to Banking System";

  const text = `Hello ${name},

Thank you for registering with Banking System.
We're excited to have you on board!

Best Regards,
The Banking System Team`;

  const html = `
  <div style="font-family: Arial, sans-serif; background-color: #f4f7fa; padding: 40px 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

      <div style="background: linear-gradient(135deg, #1e3c72, #2a5298); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0;">🏦 Banking System</h1>
      </div>

      <div style="padding: 40px 30px;">
        <h2 style="color: #333;">Welcome, ${name}! 👋</h2>

        <p style="color: #555; font-size: 16px; line-height: 1.8;">
          Thank you for registering with <strong>Banking System</strong>.
          We're excited to have you on board and look forward to helping you manage your finances securely and efficiently.
        </p>

        <div style="background-color: #f8fafc; padding: 20px; border-left: 4px solid #2a5298; margin: 25px 0;">
          <p style="margin: 0; color: #444;">
            ✅ Your account has been successfully created.
          </p>
        </div>

        <p style="color: #555; font-size: 16px;">
          If you have any questions, feel free to contact our support team.
        </p>

        <div style="text-align: center; margin-top: 35px;">
          <a href="#"
            style="
              background: #2a5298;
              color: white;
              text-decoration: none;
              padding: 14px 28px;
              border-radius: 8px;
              font-weight: bold;
              display: inline-block;
            ">
            Login to Your Account
          </a>
        </div>
      </div>

      <div style="background-color: #f4f7fa; padding: 20px; text-align: center; color: #777; font-size: 14px;">
        <p>Thank you for choosing Banking System ❤️</p>
        <p>&copy; ${new Date().getFullYear()} Banking System. All rights reserved.</p>
      </div>

    </div>
  </div>
  `;

  await sendEmail(userEmail, subject, text, html);
}

module.exports = { sendRegistrationEmail };
