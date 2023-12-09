import { validationResult } from 'express-validator';
import Product from '../models/product.js';
import Restaurant from '../models/restaurant.js';

export function getAllProducts(req, res) {
  Product.find({})
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function addProduct(req, res) {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json({ errors: validationResult(req).array() });
  }

  Product.create(req.body)
    .then((newProduct) => {
      res.status(201).json(newProduct);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function getProductById(req, res) {
  Product.findById(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function updateProduct(req, res) {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json({ errors: validationResult(req).array() });
  }

  const updatedProduct = {
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
    quantity: req.body.quantity,
    restaurant: req.body.restaurant,
  };

  Product.findByIdAndUpdate(req.params.id, updatedProduct, { new: true })
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function deleteProduct(req, res) {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}


export function getAllProductsByRestaurantId(req, res) {
  const restaurantId = req.params.restaurantId;

  Restaurant.findById(restaurantId)
    .then((restaurant) => {
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }

      Product.find({ restaurant: restaurantId })
        .then((products) => {
          res.status(200).json(products);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
/*
import { validationResult } from 'express-validator';
import Product from '../models/product.js';

export async function getAllProducts(req, res) {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

  export async function addProduct: async (req, res) => {
    console.log(req.body.image)
    try {
      const {
        title,
        category,
        description,
        price,
        image,
        quantity,
        restaurant
      } = req.body;
      console.log(endDate)
      const subscribe = new Subscribe({
        title: title,
        category: category,
        description: description,
        price: Number(price),
        imageName: `${req.protocol}://${req.get("host")}${process.env.IMGURL}/${req.file.filename}`
        quantity: Number(quantity),
        restaurant: restaurant
      });

      await product.save();

      return res.status(201).json({
        statusCode: 201,
        message: "Producted added",
        product: product,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error",
      });
    }
  },

export async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateProduct(req, res) {
  try {
    if (!validationResult(req).isEmpty()) {
      return res.status(400).json({ errors: validationResult(req).array() });
    }

    const { title, category, description, price, quantity, restaurant } = req.body;
    const image = req.file ? req.file.filename : '';

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        title,
        category,
        description,
        price,
        image,
        quantity,
        restaurant,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}*/
