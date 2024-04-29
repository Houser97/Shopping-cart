import { Router } from "express";
import { ReviewController } from "./controller";
import { ReviewService } from "../services/review.service";

export class ReviewRoutes {
    static get routes(): Router {

        const router = Router();
        const reviewService = new ReviewService();
        const controller = new ReviewController(reviewService);

        router.get('/:productId', controller.getReviews);
        router.post('/', controller.createReview);
        router.put('/', controller.updateReview);
        router.delete('/', controller.deleteReview);

        return router;
    }
}