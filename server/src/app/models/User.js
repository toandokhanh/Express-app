const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const User = new Schema(
    {
        name: { type: String },
        username: { type: String, unique: true },
        password: { type: String },
        role: {
            // Sử dụng enum để giới hạn giá trị của trường role chỉ nhận 1 hoặc 2
            type: String,
            enum: ['1', '2'],
            default: '2',
            unique: true,
        },
        courses: [
            {
                type: ObjectId,
                ref: 'Course',
            },
        ],
        purchased_courses: [
            {
                type: ObjectId,
                ref: 'Course',
            },
        ],
        image: { type: String },
    },
    { timestamps: true },
);

module.exports = mongoose.model('User', User);
