let controller = {};

controller.renderDashboard = (req, res) => {
    res.render('dashboard', {
        title: 'Dashboard',
        isDashboard: true,
    })
};

module.exports = controller;