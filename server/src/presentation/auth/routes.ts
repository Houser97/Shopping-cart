import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../services/auth.service";
import { ValidatorsMiddleware } from "../middlewares/validators.middleware";

export class AuthRoutes {
    static get routes(): Router {

        const router = Router();
        const authService = new AuthService();
        const controller = new AuthController(authService);

        router.post('/login', [
            ValidatorsMiddleware.isValidEmail(),
        ], controller.login);

        router.post('/register', [
            ValidatorsMiddleware.isValidEmail(),
            ValidatorsMiddleware.isValidPassword(),
            ValidatorsMiddleware.validateFields
        ], controller.register);

        return router;

    }
}