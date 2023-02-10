const Review = require('../models/review')
const {body, validationResult} = require('express-validator');

exports.get_reviews = (req, res, next) => {
    Review.find({item: {$eq: req.params.itemId}}).exec((err, reviews) => {
        if(err) return res.json(err);
        return res.json(reviews)
    })
}

exports.create_review = [
    body('comment', 'Comment must no be empty').trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpy()) return res.json(errors.array());
        const Review = new Review({
            author: req.user.username,
            item: req.body.itemId,
            rating: req.body.rating,
            comment: req.body.comment
        }).save((err) => {
            if(err) return res.json(err);
            return res.json(true);
        });
    }
]