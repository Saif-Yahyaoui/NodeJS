import express from 'express';
import { body, param } from 'express-validator';
import { getAllRestaurants, addRestaurant, getRestaurantById, updateRestaurant, deleteRestaurant, getOrdersByRestaurantId } from '../controllers/restaurantController.js';

const router = express.Router();

router.route('/restaurants')
  .get(getAllRestaurants)
  .post(
    
    body('category').isIn(['Healthy', 'Fast Food', 'Gluten Free']),
    body('image').isString(),
    body('description').isString(),
    body('orders').isArray(),
    addRestaurant
  );

router.route('/restaurants/:id')
  .get(param('id').isMongoId(), getRestaurantById)
  .put(
    param('id').isMongoId(),
    body('category').isIn(['Healthy', 'Fast Food', 'Gluten Free']),
    body('image').isString(),
    body('description').isString(),
    body('orders').isArray(),
    // Ajoutez d'autres validations pour les champs spécifiques au restaurant ici
    updateRestaurant
  )
  .delete(param('id').isMongoId(), deleteRestaurant);


  router.route('/restaurants/:id/orders').get(getOrdersByRestaurantId);

export default router;
