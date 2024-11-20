import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: '¡Bienvenido a la API de TPVVirtual!' });
});

router.get('/pay', (req, res) => {
    res.json({ message: 'PAGAMEEE!' });
});


export default router;