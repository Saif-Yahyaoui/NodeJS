/*import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    status: {
      type: String,
      enum: ['pending', 'accepted', 'declined'],
      default: 'pending',
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;*/

import mongoose from 'mongoose';

const { Schema } = mongoose;
const productSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String},
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
});
const orderItemSchema = new Schema({
  /*product: {
      title: { type: String, required: true },
      category: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
      quantity: { type: Number, required: true },
  },*/
  product: productSchema,
  quantity: { type: Number, required: true },
});


const orderSchema = new Schema(
  {
    status: {
      type: String,
      enum: ['pending', 'accepted', 'declined'],
      default: 'pending',
    },
    items: [orderItemSchema], // Utiliser le schéma des articles de commande défini ci-dessus
    totalAmount: { type: Number, required: true },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;

 