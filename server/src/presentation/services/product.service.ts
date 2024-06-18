import { ProductModel } from "../../data/mongo/models/product.model";
import { CreateProductDto } from "../../domain/dtos/products/create-product.dto";
import { ProductEntity } from "../../domain/entities/product.entity";
import { CustomError } from "../../domain/errors/custom.error";

export class ProductService {
    constructor() { }

    async create(createProductDto: CreateProductDto) {
        try {
            const product = new ProductModel(createProductDto);

            await product.save();
            const productEntity = ProductEntity.fromObject(product);

            return productEntity;
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }
}