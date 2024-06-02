// controller/chat/chatController.js
const { Chat, Message } = require('../../models/chatModel');

const joinChat = async (req, res) => {
    try {
        const { clientId } = req.body;
        let chat = await Chat.findOne({ clientId, active: true });
        if (!chat) {
            chat = new Chat({ clientId });
            await chat.save();
        }
        res.status(200).json({ success: true, data: chat });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error joining chat', error });
    }
};

const sendMessage = async (req, res) => {
    try {
        const { chatId, message, sender } = req.body;
        const chat = await Chat.findById(chatId);
        if (chat) {
            const newMessage = new Message({ chatId, sender, message });
            chat.messages.push(newMessage);
            await chat.save();
            res.status(200).json({ success: true, data: newMessage });
        } else {
            res.status(404).json({ success: false, message: 'Chat not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error sending message', error });
    }
};

const assignAdmin = async (req, res) => {
    try {
        const { chatId, adminId } = req.body;
        const chat = await Chat.findById(chatId);
        if (chat && !chat.adminId) {
            chat.adminId = adminId;
            await chat.save();
            res.status(200).json({ success: true, data: chat });
        } else {
            res.status(404).json({ success: false, message: 'Chat not found or already assigned' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error assigning admin', error });
    }
};

module.exports = {
    joinChat,
    sendMessage,
    assignAdmin
};
