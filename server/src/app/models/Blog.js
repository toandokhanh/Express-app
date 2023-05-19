const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Blog = new Schema({
    title: { type: String, maxLength: 255 },
    content: { type: String },
    author: { type: String, maxLength: 255 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Blog', Blog);
