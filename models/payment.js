import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  //order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  //user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
