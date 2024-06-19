import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { CustomError } from "../../domain/errors/custom.error";
import { CreateProductDto } from "../../domain/dtos/products/create-product.dto";
import { UpdateProductDto } from "../../domain/dtos/products/update-product.dto";

export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    }

    createProduct = (req: Request, res: Response) => {
        const [error, createProductDto] = CreateProductDto.create({ ...req.body });
        if (error) return res.status(400).json({ error });

        this.productService.create(createProductDto!)
            .then(product => res.json(product))
            .catch(error => this.handleError(error, res));
    }

    updateProduct = (req: Request, res: Response) => {
        const [error, updateProductDto] = UpdateProductDto.create({ ...req.body });
        if (error) return res.status(400).json({ error });

        this.productService.update(updateProductDto!)
            .then(product => res.json(product))
            .catch(error => this.handleError(error, res));
    }

}