let controller = {};

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

module.exports = controller;