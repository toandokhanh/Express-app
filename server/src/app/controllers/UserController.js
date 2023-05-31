const { mongooseToObject } = require('../../util/mongoose');
const User = require('../models/User');
const session = require('express-session');
const bcrypt = require('bcrypt');

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
    // createNewUser(req, res, next) {
    //     const { name, email, password, role } = req.body;
    //     const newUser = new User({ name, email, password, role });
    //     // Lưu user mới vào database
    //     newUser
    //         .save()
    //         .then(() => {
    //             res.render('user/login', { success: 'User created successfully.' });
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             res.status(500).render('user/register', { message: 'Error creating user.' });
    //         });
    // }
    createNewUser(req, res, next) {
        const { name, email, password, role } = req.body;
        // Generate salt asynchronously with 10 rounds
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                console.error(err);
                return res.status(500).render('user/register', { message: 'Error creating user.' });
            }

            // Hash the password with generated salt
            bcrypt.hash(password, salt, (err, hashedPassword) => {
                if (err) {
                    console.error(err);
                    return res
                        .status(500)
                        .render('user/register', { message: 'Error creating user.' });
                }

                const newUser = new User({ name, email, password: hashedPassword, role });
                // res.json(newUser);
                newUser
                    .save()
                    .then(() => {
                        return res.render('user/login', { success: 'User created successfully.' });
                    })
                    .catch((err) => {
                        console.error(err);
                        return res
                            .status(500)
                            .render('user/register', { message: 'Error creating user.' });
                    });
            });
        });
    }

    // [POST] use/login
    checkLogin(req, res, next) {
        const { email, password } = req.body;

        // Tìm user có email tương ứng trong database
        User.findOne({ email })
            .then((user) => {
                if (!user) {
                    return res.render('user/login', { message: 'Email or password is incorrect.' });
                }

                // So sánh password đã hash trong database và password người dùng submit
                bcrypt
                    .compare(password, user.password)
                    .then((isCorrectPassword) => {
                        if (!isCorrectPassword) {
                            return res.render('user/login', {
                                message: 'Email or password is incorrect.',
                            });
                        }

                        // Lưu thông tin người dùng vào session sau khi đăng nhập thành công
                        req.session.user = {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            image: user.image,
                        };
                        return res.redirect('/');
                    })
                    .catch((err) => {
                        console.error(err);
                        res.status(500).render('error', {
                            message: 'An error occurred while processing your request.',
                        });
                    });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).render('error', {
                    message: 'An error occurred while processing your request.',
                });
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
