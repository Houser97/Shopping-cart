import { Router } from "express";
import { ReactionController } from "./controller";
import { ReactionService } from "../services/reaction.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class ReactionRoutes {
    static get routes(): Router {
        const router = Router();
        const reactionService = new ReactionService();
        const controller = new ReactionController(reactionService);

        router.post('/', [AuthMiddleware.validateAuth], controller.createReaction);

        return router;
    }
}