let controller = {};

controller.renderChatbot = (req, res) => {
    if(req.cookies.username === undefined) {
        res.redirect('/login');
    }
    res.send('<script>window.open("https://t.me/iot_hcmus_bot", "_blank");window.location.href="/"</script>');
    // res.render('chatbot', {
    //     title: 'ChatBot',
    //     isChatbot: true,
    // })
};

module.exports = controller;