const { response } = require('express');
const Message = require('../models/message');

const getChat = async(req, res = response) => {

    const myId = req.uid;
    const messagesBy = req.params.by;
    const last30msg = await Message.find({
        $or: [{ by: myId, to: messagesBy }, { by: messagesBy, to: myId }]
    }).sort({ createdAt: 'desc' }).limit(30);

    res.json({
        ok: true,
        messages: last30msg
    })
}

module.exports = {
    getChat
}