const User = require('../models/user');
const {body, validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');

exports.check_email = [
    body('email', 'E-mail must be a valid address.').isEmail()
    .trim()
    .escape()
    .normalizeEmail(),

    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.json(errors.array());
        else {
            User.findOne({email: {$eq: req.body.email}}).exec((err, user) => {
                if(err) return res.json(err);
                if(!user) next()
                else {
                    return res.json('Email in use')
                }
                
            })
        }
    }
]

exports.create_user = [
    body('pwd', 'Password must not be empty.')
        .isLength({min:4}).withMessage('Password must contain at least 4 characters.')
        .trim()
        .escape(),
    body('username', 'Username must not be empty.')
        .isLength({min:4, max:12}).withMessage('Username must contain at between 4 and 12 characters.')
        .trim()
        .escape(),

    (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.json(errors.array());
        bcryptjs.hash(req.body.pwd, 6, (err, hashedPwd) => {
            if(err) return res.json(err);
            const user = new User({
                email: req.body.email,
                password: hashedPwd,
                username: req.body.username,
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
        })
    }
]