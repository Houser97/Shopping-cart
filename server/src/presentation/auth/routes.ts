import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../services/auth.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes {
    static get routes(): Router {

        const router = Router();
        const authService = new AuthService();
        const controller = new AuthController(authService);

        // passport.authenticate must be invoked in the middleware chain
        router.post('/login', [
            AuthMiddleware.sanitizeEmail,
            AuthMiddleware.authenticate
        ], controller.login);

        router.get('/login', controller.login);

        return router;

    }
}