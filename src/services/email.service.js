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

async function sendTransactionEmail(userEmail, name, account, toAccount) {
  const subject = "💸 Transaction Successful - Banking System";

  const text = `
Hello,

A transaction has been completed successfully.

Sender Name: ${name}
From Account: ${account}
To Account: ${toAccount}

Thank you for using Banking System.

Best Regards,
The Banking System Team
`;

  const html = `
  <div style="font-family: Arial, sans-serif; background-color: #f4f7fa; padding: 40px 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

      <div style="background: linear-gradient(135deg, #1e3c72, #2a5298); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0;">🏦 Banking System</h1>
      </div>

      <div style="padding: 40px 30px;">

        <h2 style="color: #333;">💸 Transaction Successful</h2>

        <p style="color: #555; font-size: 16px; line-height: 1.8;">
          Your transaction has been processed successfully. Below are the transaction details:
        </p>

        <div style="background-color: #f8fafc; border-left: 4px solid #28a745; padding: 20px; margin: 25px 0;">

          <p style="margin: 10px 0; color: #444;">
            <strong>👤 Sender Name:</strong> ${name}
          </p>

          <p style="margin: 10px 0; color: #444;">
            <strong>🏦 From Account:</strong> ${account}
          </p>

          <p style="margin: 10px 0; color: #444;">
            <strong>➡️ To Account:</strong> ${toAccount}
          </p>

          <p style="margin: 10px 0; color: #28a745; font-weight: bold;">
            ✅ Status: Successful
          </p>

        </div>

        <p style="color: #555; font-size: 16px;">
          If you did not authorize this transaction, please contact our support team immediately.
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
            View Account
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

async function sendTransactionFailureEmail(
  userEmail,
  name,
  account,
  toAccount,
) {
  const subject = "❌ Transaction Failed - Banking System";

  const text = `
Hello ${name},

Unfortunately, your transaction could not be completed.

From Account: ${account}
To Account: ${toAccount}

Please verify the transaction details and try again.
If you continue experiencing issues, contact our support team.

Best Regards,
The Banking System Team
`;

  const html = `
  <div style="font-family: Arial, sans-serif; background-color: #f4f7fa; padding: 40px 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

      <div style="background: linear-gradient(135deg, #b71c1c, #e53935); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0;">🏦 Banking System</h1>
      </div>

      <div style="padding: 40px 30px;">

        <h2 style="color: #333;">❌ Transaction Failed</h2>

        <p style="color: #555; font-size: 16px; line-height: 1.8;">
          Hello <strong>${name}</strong>,
        </p>

        <p style="color: #555; font-size: 16px; line-height: 1.8;">
          We were unable to process your recent transaction. Please review the details below and try again.
        </p>

        <div style="background-color: #fff5f5; border-left: 4px solid #e53935; padding: 20px; margin: 25px 0;">

          <p style="margin: 10px 0; color: #444;">
            <strong>🏦 From Account:</strong> ${account}
          </p>

          <p style="margin: 10px 0; color: #444;">
            <strong>➡️ To Account:</strong> ${toAccount}
          </p>

          <p style="margin: 10px 0; color: #e53935; font-weight: bold;">
            ❌ Status: Failed
          </p>

        </div>

        <p style="color: #555; font-size: 16px;">
          Possible reasons include:
        </p>

        <ul style="color: #555; line-height: 1.8;">
          <li>Insufficient balance</li>
          <li>Invalid recipient account details</li>
          <li>Temporary server or network issue</li>
        </ul>

        <p style="color: #555; font-size: 16px;">
          If you did not initiate this transaction or require assistance, please contact our support team.
        </p>

        <div style="text-align: center; margin-top: 35px;">
          <a href="#"
             style="
               background: #e53935;
               color: white;
               text-decoration: none;
               padding: 14px 28px;
               border-radius: 8px;
               font-weight: bold;
               display: inline-block;
             ">
            Try Again
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

module.exports = {
  sendRegistrationEmail,
  sendTransactionEmail,
  sendTransactionFailureEmail,
};
