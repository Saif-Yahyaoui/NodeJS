import express from 'express';
import { body, param } from 'express-validator';
import { getAllProducts, addProduct, getProductById, updateProduct, deleteProduct, getAllProductsByRestaurantId } from '../controllers/productController.js';

const router = express.Router();

router.route('/products')
  .get(getAllProducts)
  .post(
    body('title').isString(),
    body('category').isString(),
    body('description').isString(),
    body('price').isNumeric(),
    body('image').isString(),
    body('quantity').isNumeric(),
    body('restaurant').isMongoId(),
    addProduct
  );

router.route('/products/:id')
  .get(param('id').isMongoId(), getProductById)
  .put(
    param('id').isMongoId(),
    body('title').isString(),
    body('category').isString(),
    body('description').isString(),
    body('price').isNumeric(),
    body('image').isString(),
    body('quantity').isNumeric(),
    body('restaurant').isMongoId(),
    updateProduct
  )
  .delete(param('id').isMongoId(), deleteProduct);

  router.route('/:restaurantId/products')
  .get(getAllProductsByRestaurantId);

export default router;
/*import multer from 'multer';

import express from "express";
import productController from "../controller/productController.js";

import { singleImage } from "../Midlleware/multer-config.js";
const router = express.Router();

// Subscribe
router.post('/product/add', singleImage,productController.addProduct);
router.get("/product/:id", productController.getProductById);
router.get("/products", productController.getAllProducts);
router.delete("/product/:id", productController.deleteProduct);*/
