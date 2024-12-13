let controller = {};

controller.renderChatbot = (req, res) => {
    res.render('chatbot', {
        title: 'ChatBot',
        isChatbot: true,
    })
};

module.exports = controller;