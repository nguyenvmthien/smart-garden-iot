let controller = {};

controller.renderChatbot = (req, res) => {
    res.redirect('https://t.me/iot_hcmus_bot')
    // res.render('chatbot', {
    //     title: 'ChatBot',
    //     isChatbot: true,
    // })
};

module.exports = controller;