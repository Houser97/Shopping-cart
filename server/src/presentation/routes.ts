import { Router } from "express";

export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/reviews',);
        router.use('/api/products',);
        router.use('/api/auth',);
        //router.use('/api/upload',);
        //router.use('/api/images',);

        return router;
    }
}