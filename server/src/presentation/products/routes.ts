import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ProductService } from "../services/product.service";
import { ProductController } from "./controller";

export class ProductRoutes {
    static get routes(): Router {

        const router = Router();
        const productService = new ProductService();
        const controller = new ProductController(productService);

        router.post('/', [AuthMiddleware.validateAuth], controller.createProduct);
        router.put('/', [AuthMiddleware.validateAuth], controller.updateProduct);

        return router;
    }
}