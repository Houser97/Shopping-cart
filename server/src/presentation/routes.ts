import { Router } from "express";
import { ReviewRoutes } from "./reviews/routes";

export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/reviews/', ReviewRoutes.routes);
        //router.use('/api/products',);
        //router.use('/api/auth',);
        //router.use('/api/upload',);
        //router.use('/api/images',);

        return router;
    }
}