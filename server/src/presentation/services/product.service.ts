import { ProductModel } from "../../data/mongo/models/product.model";
import { CreateProductDto } from "../../domain/dtos/products/create-product.dto";
import { UpdateProductDto } from "../../domain/dtos/products/update-product.dto";
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

    async update(updateProductDto: UpdateProductDto) {
        const { id, authorId, ...rest } = updateProductDto;
        const productExists = await ProductModel.findById(id);

        if (!productExists) throw CustomError.notFound(`Product with id: ${id} not found`);

        try {
            await ProductModel.findByIdAndUpdate(id, rest, { new: true });
            const { id: productId, ...productBody } = updateProductDto;
            return productBody;
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }
}