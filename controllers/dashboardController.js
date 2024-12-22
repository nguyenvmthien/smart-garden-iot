let controller = {};
const sensorModels = require('../models/sensorDataModel');

controller.renderDashboard = (req, res) => {
    if(req.cookies.username === undefined) {
        res.redirect('/login');
    }
    res.render('dashboard', {
        title: 'Dashboard',
        isDashboard: true,
        username: req.cookies.username
    })
};

controller.updateSensors = async (req, res) => {
    try {
        const { temperature, humidity, brightness, waterLevel } = req.body;
        const username = req.cookies.username;

        await sensorModels.createSensorData(username, temperature, humidity, brightness, waterLevel);

        res.json('Sensors updated successfully');
    } catch (err) {
        res.status(500).json('Error updating sensors: ' + err.message);
    }
}

module.exports = controller;