import express from 'express';

const router = express.Router();

// Définissez les routes pour les liens de succès et d'échec
router.get('/success', (req, res) => {
  // Affichez un message de succès
  res.status(200).json({ success: true, message: 'Payment succeeded' });
});

router.get('/fail', (req, res) => {
  // Affichez un message d'échec
  res.status(400).json({ success: false, message: 'Payment failed' });
});


export default router;