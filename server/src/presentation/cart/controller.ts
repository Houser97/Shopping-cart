import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { UpdateProductDto } from "../../domain/dtos/products/update-product.dto";
import { CreateProductCartDto } from "../../domain/dtos/cart/products/create-product-cart.dto";
import { CartService } from "../services/cart.service";
import { RequestWithUser } from "../../domain/interfaces/request-with-user.interface";
import { UpdateProductCartDto } from "../../domain/dtos/cart/products/update-product-cart.dto";

export class CartController {
    constructor(
        private readonly cartService: CartService
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    }

    getProducts = (req: Request, res: Response) => {
        const user = req.user as any;
        const userId = user._id;
        const { productId } = req.params;
        this.cartService.get(userId, productId)
            .then(products => res.json(products))
            .catch(error => this.handleError(error, res));
    }


    createProductCart = (req: Request, res: Response) => {
        const [error, createProductCartDto] = CreateProductCartDto.create({ ...req.body });
        if (error) return res.status(400).json({ error });

        this.cartService.create(createProductCartDto!)
            .then(product => res.json(product))
            .catch(error => this.handleError(error, res));
    }

    updateProductCart = (req: Request, res: Response) => {
        const [error, updateProductCartDto] = UpdateProductCartDto.create({ ...req.body });
        const { productId } = req.params;
        if (error) return res.status(400).json({ error });

        this.cartService.updateProduct(productId, updateProductCartDto!)
            .then(product => res.json(product))
            .catch(error => this.handleError(error, res));
    }

    deleteProductCart = (req: Request, res: Response) => {
        const { productId } = req.params;

        this.cartService.deleteProduct(productId)
            .then(product => res.json(product))
            .catch(error => this.handleError(error, res));
    }

    handlePayment = (req: Request, res: Response) => {
        const user = req.user as any;
        const userId = user!.id;

        this.cartService.handlePayment(userId)
            .then(product => res.json(product))
            .catch(error => this.handleError(error, res));
    }

}