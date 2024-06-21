import mongoose, { Schema } from 'mongoose';
import { DateTime } from 'luxon';

const RatingSchema = new mongoose.Schema({
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewId: {
        type: Schema.Types.ObjectId,
        ref: 'Review'
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required']
    },
    createdAt: {
        type: Date,
    },
})

RatingSchema.virtual('formatted_date')
    .get(function () {
        return DateTime.fromJSDate(this.createdAt!).toFormat('d LLL yyyy, T')
    })

RatingSchema.pre('save', function (next) {
    this.createdAt = new Date(Date.now());
    next();
});

RatingSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.createdAt;
    }
})

export const RatingModel = mongoose.model('Rating', RatingSchema)