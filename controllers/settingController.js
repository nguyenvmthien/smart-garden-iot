let controller = {};

controller.renderSetting = (req, res) => {
    res.render('setting', {
        title: 'Setting',
        isSetting: true,
    })
};

module.exports = controller;