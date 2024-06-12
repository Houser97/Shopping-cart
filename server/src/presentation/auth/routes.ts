import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../services/auth.service";
import { Validators } from "../../config/validators";

export class AuthRoutes {
    static get routes(): Router {

        const router = Router();
        const authService = new AuthService();
        const controller = new AuthController(authService);

        router.post('/login', [
            Validators.isValidEmail(),
        ], controller.login);

        router.post('/register', [
            Validators.isValidEmail(),
            Validators.isValidPassword(),
            Validators.validateFields
        ], controller.register);

        return router;

    }
}