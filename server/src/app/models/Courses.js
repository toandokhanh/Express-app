const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Course = new Schema(
    {
        name: { type: String, maxLength: 255 },
        description: { type: String, maxLength: 600 },
        image: { type: String },
        slug: { type: String, maxlength: 255 },
        videoId: { type: String },
        price: { type: String, maxlength: 255 },
        level: { type: String, maxlength: 255 },
        slug: { type: String, slug: 'name', unique: true },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Course', Course);
