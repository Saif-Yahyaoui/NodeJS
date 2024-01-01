import { validationResult } from 'express-validator';
import Order from '../models/order.js';


/*export function addOrder(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Order.create(req.body)
    .then((newOrder) => {
      res.status(201).json(newOrder);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

export function getAllOrders(req, res) {
  Order.find()
    .populate('items.product', 'title') // Populate the product details
    .populate('client', 'username email') // Populate the client details
    .exec()
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

export function getOrderById(req, res) {
  const orderId = req.params.id;

  Order.findById(orderId)
    .populate('items.product', 'title') // Populate the product details
    .populate('client', 'username email') // Populate the client details
    .exec()
    .then((order) => {
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(order);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

export function updateOrder(req, res) {
  const orderId = req.params.id;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Order.findByIdAndUpdate(orderId, req.body, { new: true })
    .then((updatedOrder) => {
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(updatedOrder);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

export function deleteOrder(req, res) {
  const orderId = req.params.id;

  Order.findByIdAndRemove(orderId)
    .then((deletedOrder) => {
      if (!deletedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}*/

// Récupérer toutes les commandes
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer les commandes pour un restaurant spécifique
export const getOrdersForRestaurant = async (req, res) => {
  const { restaurantId } = req.params;

  try {
    const orders = await Order.find({ 'items.product.restaurant': restaurantId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrdersForClient = async (req, res) => {
  const { clientId } = req.params;

  try {
    const orders = await Order.find({ client: clientId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle commande
export const createOrder = async (req, res) => {
  const orderData = req.body;

  try {
    const newOrder = await Order.create(orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Mettez à jour une commande
export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const orderData = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, orderData, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer une commande
export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


