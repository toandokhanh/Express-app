const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema(
    {
        name: { type: String },
        email: { type: String, unique: true },
        password: { type: String },
        role: {
            type: String,
            enum: ['1', '2'],
            default: '2',
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
        image: {
            type: String,
            default:
                'https://scontent.fvca1-4.fna.fbcdn.net/v/t39.30808-6/348479974_1275345679746113_4610555181030115972_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=2zLsDk42XsYAX9TP-5G&_nc_ht=scontent.fvca1-4.fna&oh=00_AfBeGbJ6UcC8GWi3xkxmF4YD6cnZU7sOiFAM9g5UKyLq9Q&oe=64731621',
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('User', User);
