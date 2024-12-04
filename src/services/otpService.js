import speakeasy from 'speakeasy';

export const generateOTP = () => {
  return speakeasy.totp({
    secret: speakeasy.generateSecret({ length: 20 }).base32,
    encoding: 'base32',
    step: 300, // 5 minutos
  });
};

export const verifyOTP = (otp, secret) => {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token: otp,
    window: 2, 
  });
};
