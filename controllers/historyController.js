let controller = {};

controller.renderHistory = (req, res) => {
    res.render('history', {
        title: 'History',
        isHistory: true,
    })
};

module.exports = controller;