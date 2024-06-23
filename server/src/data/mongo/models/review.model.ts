import mongoose, { Schema } from 'mongoose';
import { DateTime } from 'luxon';

const ReviewSchema = new mongoose.Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required']
    },
    comment: {
        type: String,
        required: [true, 'Comment is required']
    },
    createdAt: {
        type: Date,
    },
})

ReviewSchema.virtual('formatted_date')
    .get(function () {
        return DateTime.fromJSDate(this.createdAt!).toFormat('d LLL yyyy, T')
    })

ReviewSchema.pre('save', function (next) {
    this.createdAt = new Date(Date.now());
    next();
});

ReviewSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.createdAt;
    }
})

export const ReviewModel = mongoose.model('Review', ReviewSchema)