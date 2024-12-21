let controller = {};

controller.renderSetting = (req, res) => {
    if(req.cookies.username === undefined) {
        res.redirect('/login');
    }
    res.render('setting', {
        title: 'Setting',
        isSetting: true,
        username: req.cookies.username
    })
};

module.exports = controller;