import express from 'express';
import UserAccountController from '../controllers/UserAccountController.js';
import TransactionRoutes from './TransactionRoutes.js';

const router = express.Router();

// Crear una cuenta de usuario
router.post('/', (req, res) => {
  try {
    const account = UserAccountController.createUserAccount(req.body);
    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Obtener una cuenta de usuario por ID de usuario.
 * Necesita el ID del User bank account.
 */
router.get('/user/:userId', (req, res) => {
  try {
    const account = UserAccountController.getAccountByUserId(req.params.userId);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Editar la cuenta bancaria de usuario.
 * Necesita el ID de la cuenta.
 */
router.get('/edit/:id', (req, res) => {
    try {
        const account = UserAccountController.editAccount(req.params.id);
        res.json(account);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.use('/account/:account-id', TransactionRoutes);

export default router;
