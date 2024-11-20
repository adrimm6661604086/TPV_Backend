import express from 'express';
import TransactionController from '../controllers/TransactionController.js';

const router = express.Router();

/**
 * Obtener todas las transacciones.
 */
router.get('/', (req, res) => {
    try {
      const { accountId } = req.params; 
      const { filter } = req.query; 
  
      const transactions = TransactionController.getTransactionsByAccountIdWithFilter(accountId, filter);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

/**
 * Registrar una devolución (return) para una transacción específica.
 * Necesita el ID de la transacción.
 */
router.post('/return/:id', (req, res) => {
    try {
        const transactionId = req.params.id;
        const returnTransaction = TransactionController.returnTransaction(transactionId);
        res.json(returnTransaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Obtener las estadísticas de una cuenta de usuario.
 * Necesita el ID de la cuenta.
 * Parámetros opcionales: filter.
 */
router.get('/stats', (req, res) => {
    try {
        const { filter } = req.query;
        const stats = UserAccountController.getAccountStats(req.params.id, filter);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Obtener el overview de las transacciones anualmente y su crecimiento.
 * Necesita el ID de la cuenta.
 */
router.get('/stats/annual-breakdown', (req, res) => {
    try {
        const { accountId } = req.params;
        const stats = TransactionController.getAnnualBreakdown(accountId);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Imprimir un resumen de las transacciones.
 * Parámetros obligatorios: accountId.
 * Parámetros opcionales: dateRange (start, end).
 * @returns {File} resumee
 */
router.get('/resumee', (req, res) => {
    try {
        const { accountId } = req.params;
        const { startDate, endDate } = req.query;
        const resumee = TransactionController.getTransactionResumee({
        userAccountId,
        startDate,
        endDate,
        });
        res.json(resumee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
