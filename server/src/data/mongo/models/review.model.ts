import mongoose, { Schema } from 'mongoose';
import { DateTime } from 'luxon';

const ReviewSchema = new mongoose.Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    item: {
        type: Number,
        required: [true, 'Item is required']
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required']
    },
    date: {
        type: Date,
    },
    likes: [],
    dislikes: [],
    comment: {
        type: String,
        required: [true, 'Comment is required']
    }
})

ReviewSchema.virtual('formatted_date')
    .get(function () {
        return DateTime.fromJSDate(this.date!).toFormat('d LLL yyyy, T')
    })

ReviewSchema.pre('save', function (next) {
    this.date = new Date(Date.now());
    next();
});

ReviewSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.date;
    }
})

export const ReviewModel = mongoose.model('Review', ReviewSchema)