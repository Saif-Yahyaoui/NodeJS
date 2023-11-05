import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const beneficiaireSchema = new Schema(
    {
        type: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

export default model('Beneficiare', beneficiaireSchema);