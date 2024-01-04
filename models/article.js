import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    image: { type: String, required: false },
    title: { type: String, required: true },
    content: { type: String, required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    author: { type: String, required: true }
}, { timestamps: true });

const Article = mongoose.model('Article', articleSchema);
export default Article;
