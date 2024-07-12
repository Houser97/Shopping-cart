import { UploadedFile } from "express-fileupload";
import { CloudinaryAdapter } from "../../config/cloudinary/cloudinary.adapter";
import { ProductModel } from "../../data/mongo/models/product.model";
import { CreateProductDto } from "../../domain/dtos/products/create-product.dto";
import { UpdateProductDto } from "../../domain/dtos/products/update-product.dto";
import { ProductEntity } from "../../domain/entities/product.entity";
import { CustomError } from "../../domain/errors/custom.error";
import mongoose from "mongoose";

export class ProductService {
    constructor() { }

    async create(createProductDto: CreateProductDto) {
        try {

            const { images, ...rest } = createProductDto;
            const imageUploadPromises = images.map((image: UploadedFile) => CloudinaryAdapter.uploadImages(image));
            const imageUrls = await Promise.all(imageUploadPromises);
            const product = new ProductModel({ ...rest, images: imageUrls });

            await product.save();
            const productEntity = ProductEntity.fromObject(product);

            return productEntity;
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async getProducts() {
        try {
            const products = await ProductModel.aggregate([
                {
                    $lookup: {
                        from: "reviews",
                        localField: "_id",
                        foreignField: "productId",
                        as: "reviews"
                    },
                },
                {
                    $addFields: {
                        rating: { $avg: "$reviews.rating" },
                        totalReviews: { $size: "$reviews" }
                    }
                },
            ]);

            return products.map(product => ProductEntity.fromObject(product));
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async getProductById(id: string) {
        try {
            const product = await ProductModel.aggregate([
                {
                    $match: { _id: new mongoose.Types.ObjectId(id) }
                },
                {
                    $lookup: {
                        from: 'reviews',
                        localField: '_id',
                        foreignField: 'productId',
                        as: 'reviews'
                    }
                },
                {
                    $addFields: {
                        rating: { $avg: 'reviews.rating' },
                        totalReviews: { $size: "$reviews" }
                    }
                }
            ]);

            if (product.length === 0)
                throw CustomError.notFound(`Product with id ${id} not found`);

            return ProductEntity.fromObject(product[0]);
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

    async delete(id: string) {
        try {
            const product = await ProductModel.findByIdAndDelete(id);
            if (!product)
                throw CustomError.notFound(`Product with id: ${id} not found`);
            return product;
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }
}