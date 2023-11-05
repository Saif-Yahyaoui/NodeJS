import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const fournisseurSchema = new Schema(
    {
        type: {
            type: String,
            required: true
        },
        workHours: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

export default model('Fournisseur', fournisseurSchema);