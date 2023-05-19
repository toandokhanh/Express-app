const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const News = new Schema({
    title: { type: String, maxLength: 255 },
    content: { type: String, maxLength: 600 },
    image: { type: String },
    author: { type: String, maxLength: 255 },
    creactAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('News', News);
