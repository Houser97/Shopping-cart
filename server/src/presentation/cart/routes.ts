import { Router } from "express";
import { CartController } from "./controller";
import { CartService } from "../services/cart.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ValidatorsMiddleware } from "../middlewares/validators.middleware";

export class productCartRoutes {
    static get routes(): Router {
        const router = Router();

        const service = new CartService();
        const controller = new CartController(service);


        router.get('/products', [AuthMiddleware.validateAuth], controller.getProducts);

        router.post('/products', [AuthMiddleware.validateAuth], controller.createProductCart);
        router.put('/products/:productId', [
            AuthMiddleware.validateAuth,
            ValidatorsMiddleware.validateMongoId('productId')
        ], controller.updateProductCart);
        router.delete('/products/:productId', [
            AuthMiddleware.validateAuth,
            ValidatorsMiddleware.validateMongoId('productId')
        ], controller.deleteProductCart);
        router.delete('/products', [
            AuthMiddleware.validateAuth
        ], controller.handlePayment);

        return router;
    }
}