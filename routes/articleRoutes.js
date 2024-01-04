import express from 'express';
import { body, param } from 'express-validator';
import {
    getAllArticles,
    addArticle,
    getArticleById,
    updateArticle,
    deleteArticle,
    upvoteArticle,
    downvoteArticle
} from '../controllers/articleController.js';

const router = express.Router();

router.get('/', getAllArticles);
router.post('/add', [body('title').isLength({ min: 3 }), body('content').isLength({ min: 10 }), body('author').isLength({ min: 1 })], addArticle);
router.get('/:id', getArticleById);
router.put('/:id', [param('id').isMongoId(), body('title').optional().isLength({ min: 3 }), body('content').optional().isLength({ min: 10 })], updateArticle);
router.delete('/:id', param('id').isMongoId(), deleteArticle);
router.patch('/:id/upvote', param('id').isMongoId(), upvoteArticle);
router.patch('/:id/downvote', param('id').isMongoId(), downvoteArticle);

export default router;
