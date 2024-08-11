import { CustomError } from "../../domain/errors/custom.error";
import { ProductCartModel } from "../../data/mongo/models/product-cart.model";
import { CreateProductCartDto } from "../../domain/dtos/cart/products/create-product-cart.dto";
import { ProductCartEntity } from "../../domain/entities/product-cart.entity";
import mongoose from "mongoose";

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
        const { productId, quantity, userId } = createProductCartDto;

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

            console.log(populatedProduct)

            const productCartEntity = ProductCartEntity.fromObject(populatedProduct);
            return productCartEntity;
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }
}

