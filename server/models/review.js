const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon')

const ReviewSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    item: {type: Number, required: true},
    rating: {type: Number, required: true},
    date: {type: Date},
    likes: [],
    dislikes: [],
    comment: {type: String, required: true}
})

ReviewSchema.virtual('formatted_date').get(function(){return DateTime.fromJSDate(this.date).toFormat('d LLL yyyy, T')})

ReviewSchema.pre('save', function (next) {
    this.date = Date.now();
    next();
});

module.exports = mongoose.model('Review', ReviewSchema)