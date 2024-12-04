import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Código de verificación OTP',
      text: `Tu código OTP es: ${otp}`,
    });
    console.log('Email enviado correctamente');
  } catch (error) {
    console.error('Error al enviar email:', error);
    throw error;
  }
};
