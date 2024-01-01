import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'resqeats@gmail.com',
    pass: 'inww uvou nyrk qhmz',
  },
});

router.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'resqeats@gmail.com',
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'E-mail sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sending e-mail' });
  }
});

export default router;
