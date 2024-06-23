import { Router } from "express";
import { ReviewRoutes } from "./reviews/routes";
import { AuthRoutes } from "./auth/routes";
import { RatingRoutes } from "./ratings/routes";
import { ReactionRoutes } from "./reactions/routes";
import { ProductRoutes } from "./products/routes";

export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/reviews', ReviewRoutes.routes);
        router.use('/api/ratings', RatingRoutes.routes);
        router.use('/api/reactions', ReactionRoutes.routes);
        router.use('/api/products', ProductRoutes.routes);

        return router;
    }
}