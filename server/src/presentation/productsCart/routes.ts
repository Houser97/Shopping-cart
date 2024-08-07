import { Router } from "express";
import { ProductCartController } from "./controller";
import { ProductCartService } from "../services/product-cart.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ValidatorsMiddleware } from "../middlewares/validators.middleware";

export class productCartRoutes {
    static get routes(): Router {
        const router = Router();

        const service = new ProductCartService();
        const controller = new ProductCartController(service);


        router.get('/', controller.getProducts);

        router.post('/', [AuthMiddleware.validateAuth], controller.createProductCart);
        router.put('/', [AuthMiddleware.validateAuth], controller.updateProduct);
        router.delete('/:productId', [
            AuthMiddleware.validateAuth,
            ValidatorsMiddleware.validateMongoId('productId')
        ], controller.deleteProduct);

        return router;
    }
}