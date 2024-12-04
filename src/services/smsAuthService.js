import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendSMS = async (phoneNumber, otp) => {
  try {
    await client.messages.create({
      body: `Tu código OTP es: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });
    console.log('SMS enviado correctamente');
  } catch (error) {
    console.error('Error al enviar SMS:', error);
    throw error;
  }
};
