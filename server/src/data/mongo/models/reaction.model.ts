import mongoose, { Schema } from 'mongoose';
import { DateTime } from 'luxon';

export enum ReactionType {
    Like = 'like',
    Dislike = 'dislike',
    Love = 'love'
}

const ReactionSchema = new mongoose.Schema({
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    reviewId: {
        type: Schema.Types.ObjectId,
        ref: 'Review'
    },
    reaction: {
        type: String,
        enum: Object.values(ReactionType),
        required: true
    },
    createdAt: {
        type: Date,
    },
})

ReactionSchema.virtual('formatted_date')
    .get(function () {
        return DateTime.fromJSDate(this.createdAt!).toFormat('d LLL yyyy, T')
    })

ReactionSchema.pre('save', function (next) {
    this.createdAt = new Date(Date.now());
    next();
});

ReactionSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.createdAt;
    }
})

export const ReactionModel = mongoose.model('Reaction', ReactionSchema)