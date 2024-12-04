// Libraries
import express from 'express';
import jwt from 'jsonwebtoken';

// Controllers
import UserController from '../controllers/UserController.js';

// Services 
import { verifyOTP } from '../services/otpService.js';

// Utils
import { JWT_SECRET } from '../config.js';


const router = express.Router();

router.post('/register-user', UserController.registerUser);

router.post('/login-user', UserController.loginUser);

router.post('/verify-auth', (req, res) => {
    const { otp, secret, userId, userEmail } = req.body;
    const isValid = verifyOTP(otp, secret);

    if (isValid) {
        const token = jwt.sign(
            { id: userId, email: userEmail }, 
            JWT_SECRET,              
            { expiresIn: '1h' }                 
        );
    
        return res.status(200).json({ 
            message: 'Usuario autenticado correctamente', 
            token: token
        });
    } else {
        res.status(400).json({ message: 'OTP inválido o expirado' });
    }
});

router.post('/get-user-info', UserController.getUserInfo);


export default router;
