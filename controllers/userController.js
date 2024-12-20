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
        res.redirect('/dashboard');
    }
};

controller.signup = (req, res) => {
    const { email, username, password } = req.body;
    const user = userModels.register(username, password, email);
    if (user) {
        res.redirect('/login');
    }
    else {
        res.redirect('/signup');
    }
};

module.exports = controller;