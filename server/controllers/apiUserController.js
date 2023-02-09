const User = require('../models/user');
const {body, validationResult} = require('express-validator');

exports.check_email = [
    body('email', 'E-mail must be a valid address.').isEmail()
    .trim()
    .escape()
    .normalizeEmail(),

    (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.json(errors.array());
        else {
            User.findOne({email: {$eq: req.body.email}}).exec((err, user) => {
                if(err) return res.json(err);
                return res.json(user.email)
            })
        }
    }
]

exports.create_user = [
    body('pwd', 'Password must not be empty.')
        .isLength({min:4}).withMessage('Password must contain at least 4 characters.')
        .trim()
        .escape(),

    (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.json(errors.array());
        const user = new User({
            email: req.body.email,
            password: req.body.pwd,
            cart: [],
        }).save((err, user) => {
            if(err) return res.json(err);
            req.login(user, (err) => {
                if(err) return res.json(err);
                return res.json({
                    email: user.email,
                    cart: user.cart,
                    id: user._id
                })
            })
        })
    }
]