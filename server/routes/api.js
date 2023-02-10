const express = require('express');
const router = express.Router();
const apiReviewController = require('../controllers/apiReviewController')
const apiUserController = require('../controllers/apiUserController')

router.get('/:itemId/get_reviews', apiReviewController.get_reviews);

router.post('/create_review',apiReviewController.create_review);

router.post('/create_user', apiUserController.check_email ,apiUserController.create_user);

module.exports = router;

