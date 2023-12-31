import express from 'express';
import { body, param } from 'express-validator';
import { getAllDonations, createDonation, getDonationById, updateDonation, deleteDonation } from '../controllers/donationController.js';

const router = express.Router();

router
  .route('/donations')
  .get(getAllDonations)
  .post(
    body('title').isString(),
    body('description').isString(),
    body('quantity').isNumeric(),
    body('date').isString(),
    body('status').isString(),
    createDonation
  );

router
  .route('/:id')
  .get(getDonationById)
  .put(
    param('id').isMongoId(),
    body('title').isString(),
    body('description').isString(),
    body('quantity').isNumeric(),
    body('date').isString(),
    body('status').isString(),
    updateDonation
  )
  .delete(
    param('id').isMongoId(),
    deleteDonation
  );

export default router;
