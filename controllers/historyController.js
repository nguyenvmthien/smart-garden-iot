let controller = {};

controller.renderHistory = (req, res) => {
    if(req.cookies.username === undefined) {
        res.redirect('/login');
    }
    res.render('history', {
        title: 'History',
        isHistory: true,
        username: req.cookies.username
    })
};

module.exports = controller;