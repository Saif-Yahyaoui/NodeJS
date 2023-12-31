import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const donationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'En attente',
    },
  },
  {
    timestamps: true,
  }
);

export default model('Donation', donationSchema);
