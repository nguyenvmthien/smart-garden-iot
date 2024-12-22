const dashboardController = require('../controllers/dashboardController');
const historyController = require('../controllers/historyController');
const settingController = require('../controllers/settingController');
const chatbotController = require('../controllers/chatbotController');
const userController = require('../controllers/userController');

function route(app) {
    app.get('/', (req, res) => {
        res.redirect('/dashboard');
    });

    app.get('/dashboard', dashboardController.renderDashboard);
    app.get('/history', historyController.renderHistory);
    app.get('/setting', settingController.renderSetting);
    app.get('/chatbot', chatbotController.renderChatbot);
    app.get('/login', userController.renderLogin);
    app.get('/signup', userController.renderSignup);
    app.post('/login', userController.login);
    app.post('/signup', userController.signup);
    app.get('/logout', userController.logout);
    app.post('/update-sensors', dashboardController.updateSensors);
    app.get('/get-history', historyController.getHistoryFromDateToDate);
}

module.exports = route;