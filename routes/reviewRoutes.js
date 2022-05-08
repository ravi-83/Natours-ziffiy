const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

//router.param('id', tourController.checkId);

router.use(authController.protect);

router
  .route('/')
  .get(authController.protect, reviewController.getAllReview)
  .post(
    authController.restictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restictTo('admin', 'user'),
    reviewController.updateReview
  )
  .delete(
    // authController.protect,
    authController.restictTo('admin', 'user'),
    reviewController.deleteReview
  );

module.exports = router;
