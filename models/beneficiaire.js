import mongoose from 'mongoose';
import User from './user.js';

const { Schema } = mongoose;

const beneficiaireSchema = new Schema(
  {
    mission: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Beneficiaire = User.discriminator('Beneficiaire', beneficiaireSchema);

export default Beneficiaire;
