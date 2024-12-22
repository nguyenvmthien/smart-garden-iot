let controller = {};
const sensorDataModel = require('../models/sensorDataModel');

controller.renderHistory = async (req, res) => {
    if(req.cookies.username === undefined) {
        res.redirect('/login');
    }

    const sensorData = await sensorDataModel.getSensorDataByUsername(req.cookies.username);

    res.locals.sensorData = sensorData;
    res.render('history', {
        title: 'History',
        isHistory: true,
        username: req.cookies.username
    })
};

controller.getHistoryFromDateToDate = async (req, res) => {
    const { from, to } = req.query;
    console.log(from, to);
    const adjustedFrom = new Date(new Date(from).getTime() - 14 * 60 * 60 * 1000);
    const adjustedTo = new Date(new Date(to).getTime() + 10 * 60 * 60 * 1000);
    const sensorData = await sensorDataModel.getSensorDataFromDateToDate(req.cookies.username, adjustedFrom, adjustedTo);
    res.send(sensorData);
};

module.exports = controller;