import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const smtpService = process.env.SMTP_SERVICE || '';
const smtpHost = process.env.SMTP_HOST || '';
const smtpUser = process.env.SMTP_USER || '';
const smtpPass = process.env.SMTP_PASS || '';

export async function sendVerificationCode(email: string, verificationCode: string) {
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
      from: 'Nestsite Technologies <noreply@nestsite.co>',
      to: email,
      subject: 'Verification Code for Your Nestsite Account',
      html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <img src="https://res.cloudinary.com/dqny2b4gb/image/upload/v1717349933/logo_ohngj6.png" alt="Nestsite Logo" style="max-width: 200px; margin-bottom: 20px;">
            <h2>Verification Code</h2>
            <p>Please use the following verification code to complete the registration process for your Nesite account:</p>
            <p style="font-size: 20px; font-weight: bold;">${verificationCode}</p>
            <p style="font-size: 14px; color: #999;">If you did not request this verification code, please disregard this email.</p>
            <p style="font-size: 14px; color: #999;">Thank you for choosing Nestsite.</p>
            <p style="font-size: 14px; color: #999;">Best regards, <br/> Nestsite Technologies Inc.</p>
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
