import express from 'express';
import { body, param } from 'express-validator';
import {
    getAllBlowgs,
    addBlowg,
    getBlowgById,
    updateBlowg,
    deleteBlowg,
    upvoteBlowg,
    downvoteBlowg
} from '../controllers/blowgsController.js';

const router = express.Router();


router.post('/blowgs/add',
    body('title').isLength({ min: 3 }),
    body('content').isLength({ min: 10 }),
    body('author').isLength({ min: 1 }),
    addBlowg
);


router.route('/blowgs')
    .get(getAllBlowgs)
    .post(
        body('title').isLength({ min: 3 }),
        body('content').isLength({ min: 10 }),
        body('author').isLength({ min: 1 }),
        addBlowg
    );

router.route('/blowgs/:id')
    .get(param('id').isMongoId(), getBlowgById)
    .put(
        param('id').isMongoId(),
        body('title').optional().isLength({ min: 3 }),
        body('content').optional().isLength({ min: 10 }),
        updateBlowg
    )
    .delete(param('id').isMongoId(), deleteBlowg);

// Route for upvoting a blowg post
router.patch('/blowgs/:id/upvote', param('id').isMongoId(), upvoteBlowg);

// Route for downvoting a blowg post
router.patch('/blowgs/:id/downvote', param('id').isMongoId(), downvoteBlowg);

export default router;
