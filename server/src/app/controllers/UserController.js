const { mutipleMongooseToObject } = require('../../util/mongoose');
const User = require('../models/User');

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
        const { name, email, password, confirmPassword, role } = req.body;

        // Kiểm tra nếu password không đủ mạnh hoặc không khớp với confirmPassword thì trả về mã lỗi
        if (password.length < 8 || password !== confirmPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Tạo user mới với các thông tin được gửi lên từ request body
        const newUser = new User({ name, username: email, password, role });

        // Lưu user mới vào database
        newUser
            .save()
            .then(() => {
                res.json({ message: 'User created successfully.' });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ message: 'Error creating user.' });
            });
    }

    // [POST] use/login
    checklogin(req, res, next) {
        const { email, password } = req.body;

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

                // Tạo biến session để lưu trữ thông tin người dùng và chuyển hướng về trang gốc
                // req.session.user = user;
                res.redirect('/', { user: user });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).render('user/login', { message: 'Something went wrong' });
            });
    }
}

module.exports = new UserController();
