const express = require('express');
const router = express.Router();
// MODELS
const { Book } = require('../models/book');
const { auth } = require('../middleware/auth');

router.route('/book')
    .get((req, res) => {
        // /api/books/book?id=sdfsdf
        let id = req.query.id;
        
        Book.find({ _id: id })
            .populate('ownerId')
            .then(doc => {
                res.send(doc);
            })
            .catch(err => {
                res.status(400).send(err);
            });
            
    }).post(auth, (req, res) => {
        const book = new Book({
            ...req.body,
            ownerId: req.user._id
        });
        
        book.save()
            .then(doc => {
                res.status(200).json({
                    post: true,
                    bookId: doc._id
                });
            })
            .catch(err => {
                res.status(400).send(err);
            });
            
    }).patch(auth, (req, res) => {
        Book.findByIdAndUpdate(req.body._id, req.body, { new: true })
            .then(doc => {
                res.json({
                    success: true,
                    doc
                });
            })
            .catch(err => {
                res.status(400).send(err);
            });
            
    }).delete(auth, (req, res) => {
        let id = req.query.id;
        
        Book.findByIdAndDelete(id)
            .then(doc => {
                res.json(true);
            })
            .catch(err => {
                res.status(400).send(err);
            });
    });

// ROUTE "ALL BOOKS"
router.route('/all_books')
    .get((req, res) => {
        // /api/books/all_books?skip=1&limit=2&order=asc&owner=fdgdg
        let skip = req.query.skip ? parseInt(req.query.skip) : 0;
        let limit = req.query.limit ? parseInt(req.query.limit) : 50;
        let order = req.query.order ? req.query.order : 'asc';
        let byOwner = req.query.owner ? { ownerId: req.query.owner } : {};
        
        Book.find(byOwner).skip(skip).sort({ _id: order }).limit(limit)
            .then(doc => {
                res.send(doc);
            })
            .catch(err => {
                res.status(400).send(err);
            });
    });

module.exports = router;