import { CustomError } from "../../domain/errors/custom.error";
import { ProductCartModel } from "../../data/mongo/models/product-cart.model";
import { CreateProductCartDto } from "../../domain/dtos/cart/products/create-product-cart.dto";
import { ProductCartEntity } from "../../domain/entities/product-cart.entity";
import mongoose from "mongoose";
import { UpdateProductCartDto } from "../../domain/dtos/cart/products/update-product-cart.dto";

export class CartService {
    constructor() { }

    public async get(userId: mongoose.Types.ObjectId, productId: string) {
        try {
            const products = await ProductCartModel.find({ userId: userId })
                .populate({
                    path: 'productId',
                    select: 'title price images'
                });

            return products.map(ProductCartEntity.fromObject);
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    public async create(createProductCartDto: CreateProductCartDto) {
        const { productId, userId } = createProductCartDto;

        const productCartExists = await ProductCartModel.findOne({ userId, productId });

        if (productCartExists)
            throw CustomError.badRequest('User has already created product cart');

        try {
            const productCart = new ProductCartModel(createProductCartDto);
            await productCart.save();

            const populatedProduct = await productCart.populate({
                path: 'productId',
                select: 'price images title' // Selecciona solo los campos que necesitas
            });

            return ProductCartEntity.fromObject(populatedProduct);

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    public async updateProduct(id: string, updateProductCartDto: UpdateProductCartDto) {
        const productCartExists = await ProductCartModel.findById(id);

        if (!productCartExists)
            throw CustomError.notFound('Product Cart not found');

        try {
            const product = await ProductCartModel.findByIdAndUpdate(id, updateProductCartDto, { new: true })
                .populate({
                    path: 'productId',
                    select: 'title price images'
                });
            return ProductCartEntity.fromObject(product!.toObject());
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    public async deleteProduct(id: string) {
        const productCartExists = await ProductCartModel.findById(id);

        if (!productCartExists)
            throw CustomError.notFound('Product Cart not found');

        try {
            return await ProductCartModel.findByIdAndDelete(id);
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

}

