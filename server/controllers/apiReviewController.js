const Review = require('../models/review')
const {body, validationResult} = require('express-validator');

exports.get_reviews = (req, res, next) => {
    Review.find({})
    .sort({date: -1})
    .populate('author', 'username')
    .exec((err, reviews) => {
        if(err) return res.json(err);
        const reviewsWithFormattedDate = reviews.map((review) => review.toJSON({virtuals: true}))
        return res.json(reviewsWithFormattedDate)
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

exports.update_review = [
    body('userId', 'You must be logged in to like reviews'),

    (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.json(errors.array())
        const review = new Review({
            _id: req.body.id,
            author: req.body.userId,
            item: req.body.productId,
            rating: req.body.rating,
            date: req.body.date,
            likes: req.body.likes, //El arreglo actualizado se pasa desde el cliente.
            dislikes: req.body.dislikes,
            comment: req.body.comment
        })
        Review.findByIdAndUpdate(req.body.id, review, {new: true}, (err, newReview) => {
            if(err) return res.json('Error')
            return res.json(newReview)
        })
    }
]