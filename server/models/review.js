const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    item: {type: Number, required: true},
    rating: {type: Number, required: true},
    date: {type: Date, default: Date.now()},
    likes: [],
    dislikes: [],
    comment: {type: String, required: true}
})

module.exports = mongoose.model('Review', ReviewSchema)