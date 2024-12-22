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

// Một hàm lấy dữ liệu nhiệt độ trung bình của tuần gần nhất (mỗi ngày 1 dữ liệu)
controller.getTemperatureData = async (req, res) => {
    try {
        const username = req.cookies.username;
        const data = await sensorModels.getTemperatureData(username);
        res.json(data);
    } catch (err) {
        res.status(500).json('Error getting temperature data: ' + err.message);
    }
}

module.exports = controller;