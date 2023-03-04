const express = require('express');
const router = express.Router();
const apiReviewController = require('../controllers/apiReviewController')
const apiUserController = require('../controllers/apiUserController')

router.get('/get_reviews', apiReviewController.get_reviews);

router.post('/create_review', apiReviewController.create_review);

router.post('/update_review', apiReviewController.update_review);

router.post('/create_user', apiUserController.check_email, apiUserController.create_user);

router.post('/login', apiUserController.login);

router.get('/check_user_status', apiUserController.check_user_status);

router.get('/login_failure', apiUserController.login_failure);

router.get('/logout', apiUserController.logout);

router.post('/update_user_cart', apiUserController.update_user_cart);

module.exports = router;

