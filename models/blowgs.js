import mongoose from 'mongoose';

const blowgsSchema = new mongoose.Schema({
    image: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    author: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Blowgs = mongoose.model('Blowgs', blowgsSchema);

export default Blowgs;
