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
    const { temperature, humidity, brightness, waterLevel } = req.body;
    const username = req.cookies.username;
    await sensorModels.createSensorData(username, 'temperature', temperature)   
        .catch(err => {
            res.send('Error updating sensors: ' + err.message);
        });
    await sensorModels.createSensorData(username, 'humidity', humidity)
        .catch(err => {
            res.send('Error updating sensors: ' + err.message);
        });
    await sensorModels.createSensorData(username, 'brightness', brightness)
        .catch(err => {
            res.send('Error updating sensors: ' + err.message);
        });
    await sensorModels.createSensorData(username, 'water_level', waterLevel)
        .catch(err => {
            res.send('Error updating sensors: ' + err.message);
        });
}

module.exports = controller;