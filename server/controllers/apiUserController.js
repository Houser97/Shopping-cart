const User = require('../models/user');
const {body, validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');
const passport = require('passport')

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
                    return res.json([{msg:'Email has already been used.'}])
                }
                
            })
        }
    }
]

exports.create_user = [
    body('pwd', 'Password must not be empty.')
        .isLength({min:4}).withMessage('Password must contain at least 4 characters.')
        .matches('[A-Z]').withMessage('Password must contain at least 1 upper letter.')
        .matches('[0-9]').withMessage('Password must contain at least 1 number.')
        .trim()
        .escape(),
    body('username', 'Username must not be empty.')
        .isLength({min:4, max:12}).withMessage('Username must contain between 4 and 12 characters.')
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
                        username: user.username,
                        id: user._id
                    })
                })
            })
        })
    }
]

exports.login = [
    body('email', 'Email must be a valid address.')
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail(),
    passport.authenticate('local', {
        keepSessionInfo: true,
        successReturnToOrRedirect: '/api/check_user_status',
        failureRedirect: '/api/login_failure'
    })
]

exports.check_user_status = (req, res, next) => {
    if(req.user){
        return res.json({
            username: req.user.username,
            id: req.user._id,
            cart: req.user.cart
        })
    }
    return res.json(null)
}

exports.login_failure = (req, res) => {
    return res.json([{msg: 'Email or password are incorrect.'}])
}

exports.logout = (req, res) => {
    req.logout((err) => {
        if(err) return res.json(err);
        return res.json(true);
    })
}

exports.update_user_cart = (req, res) => {
    if(req.user){
        const user = new User({
            email: req.user.email,
            password: req.user.password,
            username: req.user.username,
            cart: req.body.productsInCart,
            _id: req.user._id
        })
        User.findByIdAndUpdate(req.user._id, user, {new: true}, (err, newUser) => {
            if(err) return res.json(err)
            return res.json(newUser)
        } )
    } else {
        console.log('not logged')
    }
}
