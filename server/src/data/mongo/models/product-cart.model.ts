import mongoose, { Schema } from "mongoose";

const productCartSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, 'User Id is required'],
        ref: 'User'
    },
    productId: {
        type: Schema.Types.ObjectId,
        required: [true, 'Product Id is required'],
        ref: 'Product'
    },
    quantity: {
        type: String
    },
    createdAt: {
        type: Date
    }
})

productCartSchema.pre('save', function (next) {
    this.createdAt = new Date(Date.now());
    next();
});

export const ProductCartModel = mongoose.model('ProductCart', productCartSchema);