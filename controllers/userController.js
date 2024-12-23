let controller = {};
const userModels = require('../models/userModel');

controller.renderLogin = (req, res) => {
    res.render('login', {
        title: 'Login',
        isLogin: true,
    })
};

controller.renderSignup = (req, res) => {
    res.render('signup', {
        title: 'Signup',
        isSignup: true,
    })
};

controller.login = async (req, res) => {
    let { username, password } = req.body;
    const result = await userModels.login(username, password);
    if (result.error) {
        res.render('login', {
            title: 'Login',
            isLogin: true,
            error: result.error,
        })
    }
    else {
        res.cookie('username', result.username, { maxAge: 24 * 60 * 60 * 1000 });
        res.cookie('email', result.email, { maxAge: 24 * 60 * 60 * 1000 });
        res.redirect('/dashboard');
    }
};

controller.signup = async (req, res) => {
    const { email, username, password } = req.body;
    const user = await userModels.register(username, password, email);
    if (user.error) {
        res.render('signup', {
            title: 'Signup',
            isSignup: true,
            error: user.error,
        })
    }
    else {
        res.redirect('/login');
    }
};

controller.logout = (req, res) => {
    res.clearCookie('username');
    res.redirect('/login');
};

module.exports = controller;