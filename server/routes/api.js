const express = require('express');
const router = express.Router();
const apiReviewController = require('../controllers/apiReviewController')

router.get('/:itemId/get_reviews', apiReviewController.get_reviews);

router.post('/create_review', apiReviewController.create_review);

module.exports = router;

