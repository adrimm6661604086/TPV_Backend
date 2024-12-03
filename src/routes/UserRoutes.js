// Libraries
import express from 'express';

// Controllers
import UserController from '../controllers/UserController.js';


const router = express.Router();



router.post('/register-user', UserController.registerUser);

router.post('/login-user', UserController.loginUser);


export default router;
