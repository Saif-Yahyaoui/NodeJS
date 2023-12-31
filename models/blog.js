import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        tags: [{
            type: String,
        }],
        upvotes: {
            type: Number,
            default: 0,
        },
        downvotes: {
            type: Number,
            default: 0,
        },
        image: {
            type: String, // You can store the image URL or path here
            required: false, // Make it optional or required based on your requirement
        }
    },
    {
        timestamps: true,
    }
);

const Blog = model('Blog', blogSchema);

export default Blog;
