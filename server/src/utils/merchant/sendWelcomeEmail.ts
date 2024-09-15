import nodemailer from 'nodemailer';

export async function sendWelcomeEmail(email: string) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.SMTP_USER as string,
        pass: process.env.SMTP_PASS as string,
      },
    });

    // Compose email message
    const mailOptions: nodemailer.SendMailOptions = {
      from: 'Nestsite Technologies <support@nestsite.io>',
      to: email,
      subject: "Welcome to Nestsite! – Let's Bring Your Ideas to Life 🚀",
      html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <img src="https://res.cloudinary.com/dqny2b4gb/image/upload/v1717349933/logo_ohngj6.png" alt="Nestsite Logo" style="width: 150px; margin-bottom: 20px;">
        <h2 style="color: #333;">🎉 Welcome to Nestsite!</h2>
        <p style="font-size: 18px; color: #666;">Dear valued member,</p>
        <p style="font-size: 18px; color: #666;">Welcome aboard to Nestsite! We're thrilled to have you join our vibrant community of creators, entrepreneurs, and small businesses who are shaping the future of digital presence and commerce.</p>
        <p style="font-size: 18px; color: #666;">At Nestsite, we're on a mission to empower individuals like you to turn your ideas into reality, reach your audience globally, and thrive in the digital economy.</p>
        <p style="font-size: 18px; color: #666;">Here's a glimpse of what you can do with Nestsite:</p>
        <ul style="font-size: 18px; color: #666; text-align: left;">
          <li><b>Create Stunning Portfolio Websites</b>: Showcase your work with beautifully designed websites that reflect your unique style and vision.</li>
          <li><b>Receive Payments Globally</b>: Seamlessly accept payments from customers worldwide, enabling you to monetize your skills and talents effortlessly.</li>
          <li><b>Manage Event Tickets</b>: Host events, workshops, and seminars directly on our platform, and manage ticket sales with ease, whether it's a local gathering or a virtual summit.</li>
          <li><b>Sell Digital Products</b>: Monetize your expertise by offering digital products such as e-books, courses, templates, and more to your audience, all in one place.</li>
        </ul>
        <p style="font-size: 18px; color: #666;">As a valued member of our community, you'll have access to a range of tools, resources, and support to help you succeed every step of the way. Whether you're a seasoned professional or just starting your journey, we're here to support your growth and celebrate your successes.</p>
        <p style="font-size: 18px; color: #666;">To get started, simply log in to your account and explore the possibilities that await you. If you have any questions or need assistance, don't hesitate to reach out to our friendly support team at support@nestsite.co.</p>
        <p style="font-size: 18px; color: #666;">Once again, welcome to Nestsite! We can't wait to see what you'll create and achieve with us.</p>
        <p style="font-size: 18px; color: #666;">Best regards,<br/>Samuel Nzubechi, Founder <br/>Nestsite Technologies</p>
      </div>
    </div>
    `,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent:', info.response);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw new Error('Failed to send welcome email');
  }
}
