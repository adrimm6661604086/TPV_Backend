// Libraries
import express from 'express';

// Controllers
import UserController from '../controllers/UserController.js';


const router = express.Router();

router.post('/register-user', UserController.registerUser);

router.post('/login-user', UserController.loginUser);


router.get('/:id', (req, res) => {
  try {
    const user = UserController.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
