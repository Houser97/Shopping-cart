import { Router } from "express";
import { ReviewController } from "./controller";
import { ReviewService } from "../services/review.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class ReviewRoutes {
    static get routes(): Router {

        const router = Router();
        const reviewService = new ReviewService();
        const controller = new ReviewController(reviewService);

        router.get('/:productId', controller.getReviews);
        router.post('/', [AuthMiddleware.validatePassportAuth], controller.createReview);
        router.put('/', [AuthMiddleware.validatePassportAuth, AuthMiddleware.validateAuthorId], controller.updateReview);
        router.delete('/', [AuthMiddleware.validatePassportAuth, AuthMiddleware.validateAuthorId], controller.deleteReview);

        return router;
    }
}