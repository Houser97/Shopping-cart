import mongoose, { Schema } from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    images: {
        type: [{ type: String }],
    },
    description: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date
    }
})

ProductSchema.pre('save', function (next) {
    this.createdAt = new Date(Date.now());
    next();
});

ProductSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.createdAt;
    }
})

export const ProductModel = mongoose.model('Product', ProductSchema)