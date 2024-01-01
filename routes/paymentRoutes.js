import express from 'express';
import { body } from 'express-validator';
import { initiatePayment, verifyPayment } from '../controllers/paymentController.js';

const router = express.Router();
router.post(
    '/payment',
    [
      body('amount').isNumeric(),
    ],
    initiatePayment
  );
  router.post('/verify/:id', verifyPayment);
  

export default router;


