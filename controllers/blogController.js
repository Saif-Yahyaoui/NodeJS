import { validationResult } from 'express-validator';
import Blog from '../models/blog.js'; // Make sure the path is correct

export function getAllBlogs(req, res) {
    Blog.find({})
        .populate('author', 'username') // Assuming you want to show the author's username
        .then((blogs) => {
            res.status(200).json(blogs);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

export function addBlog(req, res) {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }

    Blog.create(req.body)
        .then((newBlog) => {
            res.status(201).json(newBlog);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

export function getBlogById(req, res) {
    Blog.findById(req.params.id)
        .populate('author', 'username')
        .then((blog) => {
            if (!blog) {
                return res.status(404).json({ message: 'Blog not found' });
            }
            res.status(200).json(blog);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

export function updateBlog(req, res) {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }

    Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((blog) => {
            if (!blog) {
                return res.status(404).json({ message: 'Blog not found' });
            }
            res.status(200).json(blog);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

export function deleteBlog(req, res) {
    Blog.findByIdAndRemove(req.params.id)
        .then((blog) => {
            if (!blog) {
                return res.status(404).json({ message: 'Blog not found' });
            }
            res.status(200).json({ message: 'Blog deleted successfully' });
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

export function upvoteBlog(req, res) {
    Blog.findByIdAndUpdate(req.params.id, { $inc: { upvotes: 1 } }, { new: true })
        .then((blog) => {
            if (!blog) {
                return res.status(404).json({ message: 'Blog not found' });
            }
            res.status(200).json(blog);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

export function downvoteBlog(req, res) {
    Blog.findByIdAndUpdate(req.params.id, { $inc: { downvotes: 1 } }, { new: true })
        .then((blog) => {
            if (!blog) {
                return res.status(404).json({ message: 'Blog not found' });
            }
            res.status(200).json(blog);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}
