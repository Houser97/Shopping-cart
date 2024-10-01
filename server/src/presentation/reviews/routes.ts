import { Router } from "express";
import { ReviewController } from "./controller";
import { ReviewService } from "../services/review.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ValidatorsMiddleware } from "../middlewares/validators.middleware";
import { ReactionService } from "../services/reaction.service";

export class ReviewRoutes {
    static get routes(): Router {

        const router = Router();
        const reactionService = new ReactionService();

        const reviewService = new ReviewService(reactionService);
        const controller = new ReviewController(reviewService);

        router.get('/product/:productId', AuthMiddleware.optionalAuth, controller.getReviews);
        router.get('/:productId', AuthMiddleware.validateAuth, controller.getReviewByProductIdAndUserId);
        router.post('/', [
            AuthMiddleware.validateAuth,
            AuthMiddleware.validateAuthorId,
        ], controller.createReview);
        router.put('/:id', [AuthMiddleware.validateAuth, AuthMiddleware.validateAuthorId], controller.updateReview);
        router.delete('/:id', [AuthMiddleware.validateAuth], controller.deleteReview);

        return router;
    }
}