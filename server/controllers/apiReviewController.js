const Review = require('../models/review')
const {body, validationResult} = require('express-validator');

exports.get_reviews = (req, res, next) => {
    Review.find({item: {$eq: req.params.itemId}})
    .sort({date: -1})
    .populate('author', 'username')
    .exec((err, reviews) => {
        if(err) return res.json(err);
        return res.json(reviews)
    })
}

exports.create_review = [
    body('comment', 'Comment must no be empty').trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.json(errors.array());
        const review = new Review({
            author: req.body.authorId,
            item: req.body.itemId,
            rating: req.body.rating,
            likes: [],
            dislikes: [],
            comment: req.body.comment
        }).save((err) => {
            if(err) return res.json(false);
            return res.json(true);
        });
    }
]