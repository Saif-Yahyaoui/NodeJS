import express from 'express';
import { body, param } from 'express-validator';
import {
    getAllBlogs,
    addBlog,
    getBlogById,
    updateBlog,
    deleteBlog,
    upvoteBlog,
    downvoteBlog
} from '../controllers/blogController.js';

const router = express.Router();

router.route('/blogs')
    .get(getAllBlogs)
    .post(
        body('title').isLength({ min: 3 }),
        body('content').isLength({ min: 10 }),
        body('author').isMongoId(),
        body('tags').optional().isArray(),
        addBlog
    );

router.route('/blogs/:id')
    .get(param('id').isMongoId(), getBlogById)
    .put(
        param('id').isMongoId(),
        body('title').optional().isLength({ min: 3 }),
        body('content').optional().isLength({ min: 10 }),
        body('tags').optional().isArray(),
        updateBlog
    )
    .delete(param('id').isMongoId(), deleteBlog);

// Route for upvoting a blog post
router.patch('/blogs/:id/upvote', param('id').isMongoId(), upvoteBlog);

// Route for downvoting a blog post
router.patch('/blogs/:id/downvote', param('id').isMongoId(), downvoteBlog);

export default router;
