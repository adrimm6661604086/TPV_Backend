// Libraries
import express from 'express';

// Controllers
import UserController from '../controllers/UserController.js';
    
const router = express.Router();

router.post('/register-user', UserController.registerUser);

router.post('/login-user', UserController.loginUser);

router.post('/verify-auth', UserController.verifyToken, (req, res) => {
    res.status(200).json({ 
        status: 200,
        message: 'Usuario autenticado correctamente' 
    });
});

router.get('/:id', UserController.getUserInfo);


export default router;
