import { Router } from "express";
import { ReviewRoutes } from "./reviews/routes";
import { AuthRoutes } from "./auth/routes";
import { ReactionRoutes } from "./reactions/routes";
import { ProductRoutes } from "./products/routes";
import { productCartRoutes } from "./cart/routes";

export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/reviews', ReviewRoutes.routes);
        router.use('/api/reactions', ReactionRoutes.routes);
        router.use('/api/products', ProductRoutes.routes);
        router.use('/api/cart', productCartRoutes.routes);

        return router;
    }
}