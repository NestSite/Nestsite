import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const smtpService = process.env.SMTP_SERVICE || '';
const smtpHost = process.env.SMTP_HOST || '';
const smtpUser = process.env.SMTP_USER || '';
const smtpPass = process.env.SMTP_PASS || '';

export async function sendVerificationEmail(email: string, verificationCode: string) {
  const transporter = nodemailer.createTransport({
    service: smtpService,
    host: smtpHost,
    port: 465,
    secure: true,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const mailOptions = {
    from: 'Your Company Name <noreply@yourcompany.com>',
    to: email,
    subject: 'Email Verification for Your Account',
    html: `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4;">
     <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <img src="https://res.cloudinary.com/dqny2b4gb/image/upload/v1717349933/logo_ohngj6.png" alt="Nestsite Logo" style="max-width: 200px; margin-bottom: 20px;">
        <h2>Email Verification</h2>
        <p>Please click the link below to verify your email address and activate your account:</p>
        <p><a href="http://localhost:5000/merchant/auth/verify/${verificationCode}" style="font-size: 16px;">Verify Email Address</a></p>
        <p>If you did not sign up for an account with us, please ignore this email.</p>
        <p>Thank you for choosing our service.</p>
        <p>Best regards,</p>
        <p>Nestsite Technologies Inc.</p>
      </div>
      </div>
    `,
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
  }
}
