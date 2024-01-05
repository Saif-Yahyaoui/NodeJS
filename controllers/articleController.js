import { validationResult } from 'express-validator';
import Article from '../models/article.js';

export async function getAllArticles(req, res) {
    try {
        const articles = await Article.find({});
        res.status(200).json(articles);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

export async function addArticle(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newArticle = await Article.create(req.body);
        res.status(201).json(newArticle);
    } catch (err) {
        console.error('Error adding article:', err);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
}

export async function getArticleById(req, res) {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json(article);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

export async function updateArticle(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json(updatedArticle);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

export async function deleteArticle(req, res) {
    try {
        const article = await Article.findByIdAndRemove(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

export async function upvoteArticle(req, res) {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id, { $inc: { upvotes: 1 } }, { new: true });
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json(article);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

export async function downvoteArticle(req, res) {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id, { $inc: { downvotes: 1 } }, { new: true });
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json(article);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}
