import { Router } from "express"
import { RatingController } from "./controller";
import { RatingService } from "../services/rating.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class RatingRoutes {
    static get routes(): Router {

        const router = Router();
        const ratingService = new RatingService();
        const controller = new RatingController(ratingService);

        router.post('/', [AuthMiddleware.validateAuth], controller.createRating);

        return router;
    }
}