let controller = {};
const sensorModels = require('../models/sensorDataModel');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '04nhatminh@gmail.com',
        pass: 'zsmo ybjw eioy puay'
    }
});

controller.sendEmail = (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: 'Smart Garden',
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error sending email');
        } else {
            res.send('Email sent: ' + info.response);
        }
    });
}

controller.renderDashboard = (req, res) => {
    if(req.cookies.username === undefined) {
        res.redirect('/login');
    }
    res.render('dashboard', {
        title: 'Dashboard',
        isDashboard: true,
        username: req.cookies.username,
        email: req.cookies.email
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