import { validationResult } from 'express-validator';
import Restaurant from '../models/restaurant.js';
import Order from '../models/order.js';

export function getAllRestaurants(req, res) {
  Restaurant.find({})
    .then((restaurants) => {
      res.status(200).json(restaurants);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function addRestaurant(req, res) {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json({ errors: validationResult(req).array() });
  }

  Restaurant.create(req.body)
    .then((newRestaurant) => {
      res.status(201).json(newRestaurant);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function getRestaurantById(req, res) {
  Restaurant.findById(req.params.id)
    .then((restaurant) => {
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
      res.status(200).json(restaurant);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function updateRestaurant(req, res) {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json({ errors: validationResult(req).array() });
  }

  const { category, image, description, orders } = req.body;

  const updatedRestaurant = {
    category,
    image,
    description,
    orders,
    // Ajoutez d'autres champs spécifiques au restaurant ici
  };

  Restaurant.findByIdAndUpdate(req.params.id, updatedRestaurant, { new: true })
    .then((restaurant) => {
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
      res.status(200).json(restaurant);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function deleteRestaurant(req, res) {
  Restaurant.findByIdAndRemove(req.params.id)
    .then((restaurant) => {
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
      res.status(200).json({ message: 'Restaurant deleted successfully' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}


export function getOrdersByRestaurantId(req, res) {
  const restaurantId = req.params.id;

  Restaurant.findById(restaurantId)
    .populate({
      path: 'orders',
      populate: {
        path: 'items.product',
        model: 'Product', // Adjust the model name based on your Product model
        select: 'title', // Include only the 'title' field
      },
    })
    .exec((err, restaurant) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }

      const orders = restaurant.orders;
      res.status(200).json(orders);
    });
}
