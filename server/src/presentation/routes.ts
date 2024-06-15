import { Router } from "express";
import { ReviewRoutes } from "./reviews/routes";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/reviews', ReviewRoutes.routes);
        //router.use('/api/products',);
        //router.use('/api/upload',);
        //router.use('/api/images',);

        return router;
    }
}