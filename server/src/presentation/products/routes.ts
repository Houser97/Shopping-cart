import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ProductService } from "../services/product.service";
import { ProductController } from "./controller";
import { ValidatorsMiddleware } from "../middlewares/validators.middleware";
import { FileUploadMiddleware } from "../middlewares/file-upload.middleware";

export class ProductRoutes {
    static get routes(): Router {

        const router = Router();
        const productService = new ProductService();
        const controller = new ProductController(productService);

        router.get('/', controller.getProducts);
        router.get('/:productId', [ValidatorsMiddleware.validateMongoId('productId')], controller.getProductById);
        router.post('/', [AuthMiddleware.validateAuth, FileUploadMiddleware.containFiles], controller.createProduct);
        router.put('/', [AuthMiddleware.validateAuth], controller.updateProduct);
        router.delete('/:productId', [
            AuthMiddleware.validateAuth,
            ValidatorsMiddleware.validateMongoId('productId')
        ], controller.deleteProduct);

        return router;
    }
}