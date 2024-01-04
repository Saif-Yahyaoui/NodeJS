import { validationResult } from 'express-validator';
import Blowgs from '../models/blowgs.js'; // Update the path as needed

export function getAllBlowgs(req, res) {
    Blowgs.find({})
        .then((blowgs) => {
            res.status(200).json(blowgs);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

export function addBlowg(req, res) {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }

    Blowgs.create(req.body)
        .then((newBlowg) => {
            res.status(201).json(newBlowg);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

export function getBlowgById(req, res) {
    Blowgs.findById(req.params.id)
        .then((blowg) => {
            if (!blowg) {
                return res.status(404).json({ message: 'Blowg not found' });
            }
            res.status(200).json(blowg);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

export function updateBlowg(req, res) {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }

    Blowgs.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((updatedBlowg) => {
            if (!updatedBlowg) {
                return res.status(404).json({ message: 'Blowg not found' });
            }
            res.status(200).json(updatedBlowg);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

export function deleteBlowg(req, res) {
    Blowgs.findByIdAndRemove(req.params.id)
        .then((deletedBlowg) => {
            if (!deletedBlowg) {
                return res.status(404).json({ message: 'Blowg not found' });
            }
            res.status(200).json({ message: 'Blowg deleted successfully' });
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

export function upvoteBlowg(req, res) {
    Blowgs.findByIdAndUpdate(req.params.id, { $inc: { upvotes: 1 } }, { new: true })
        .then((blowg) => {
            if (!blowg) {
                return res.status(404).json({ message: 'Blowg not found' });
            }
            res.status(200).json(blowg);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

export function downvoteBlowg(req, res) {
    Blowgs.findByIdAndUpdate(req.params.id, { $inc: { downvotes: 1 } }, { new: true })
        .then((blowg) => {
            if (!blowg) {
                return res.status(404).json({ message: 'Blowg not found' });
            }
            res.status(200).json(blowg);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}
