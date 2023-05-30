const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const User = require('../models/User');
const session = require('express-session');

class UserController {
    // [GET] use/register
    register(req, res, next) {
        res.render('user/register');
    }
    // [GET] use/login
    login(req, res, next) {
        res.render('user/login');
    }
    // [POST] use/register
    createNewUser(req, res, next) {
        const { name, email, password, role } = req.body;

        // Tạo user mới với các thông tin được gửi lên từ request body
        const newUser = new User({ name, email, password, role });

        // Lưu user mới vào database
        newUser
            .save()
            .then(() => {
                res.render('user/login', { success: 'User created successfully.' });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).render('user/register', { message: 'Error creating user.' });
            });
    }

    // [POST] use/login
    checklogin(req, res, next) {
        const { email, password } = req.body;
        // res.json(req.body.email);
        // Kiểm tra xem email và mật khẩu đã được cung cấp hay chưa
        if (!email || !password) {
            return res
                .status(400)
                .render('user/login', { message: 'Email and password are required' });
        }

        User.findOne({ email })
            .then((user) => {
                // res.json(user);
                // Kiểm tra xem có tìm thấy người dùng với email đã cung cấp hay không
                if (!user) {
                    return res
                        .status(404)
                        .render('user/login', { message: `User with email ${email} not found` });
                }
                // Kiểm tra xem mật khẩu có khớp với mật khẩu trong CSDL hay không
                if (password !== user.password) {
                    return res
                        .status(401)
                        .render('user/login', { message: 'Wrong account or password' });
                }

                // Lưu biến session user
                req.session.user = user;

                // Render template home và truyền vào biến user
                res.render('home', {
                    user: mongooseToObject(user),
                    loginLink: false, // ẩn liên kết để đăng nhập
                    logoutLink: true, // hiển thị liên kết để đăng xuất
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).render('user/login', { message: 'Something went wrong' });
            });
    }
    // [GET] use/logout
    logout(req, res, next) {
        // Xóa biến session user để đăng xuất người dùng
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/');
            }
        });
    }
}

module.exports = new UserController();
