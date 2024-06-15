const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');
const http = require('http');
const socketIo = require('socket.io');
const { Chat, Message } = require('./models/chatModel');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);
const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    server.listen(PORT, () => { 
        console.log("Connected to DB");
        console.log("Server is running on port " + PORT);
    });
});
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinChat', async ({ clientId }) => {
        let chat = await Chat.findOne({ clientId, active: true });
        if (!chat) {
            chat = new Chat({ clientId });
            await chat.save();
        }
        socket.join(chat._id.toString());
    });

    socket.on('sendMessage', async ({ chatId, message, sender }) => {
        const chat = await Chat.findById(chatId);
        if (chat) {
            const newMessage = new Message({ chatId, sender, message });
            chat.messages.push(newMessage);
            await chat.save();
            io.to(chatId).emit('receiveMessage', { sender, message });
        }
    });

    socket.on('assignAdmin', async ({ chatId, adminId }) => {
        const chat = await Chat.findById(chatId);
        if (chat && !chat.adminId) {
            chat.adminId = adminId;
            await chat.save();
            io.to(chatId).emit('adminAssigned', { adminId });
        }
    });
    socket.on('getAllChats', async ({ clientId }) => {
        const chats = await Chat.find({ clientId });
        socket.emit('allChats', chats);
    });

    socket.on('getUnrepliedChats', async () => {
        const chats = await Chat.find({ adminId: null });
        socket.emit('unrepliedChats', chats);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
