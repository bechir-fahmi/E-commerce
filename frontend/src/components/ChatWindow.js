import { jwtDecode } from 'jwt-decode';

import React, { useState, useEffect } from 'react';
import { IoMdSend } from 'react-icons/io';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [greetingSent, setGreetingSent] = useState(false);
  const [chatId, setChatId] = useState(null);
  const token = localStorage.getItem('token');
  const idUser = jwtDecode(token)._id;

  useEffect(() => {
    if (idUser) {
      console.log('Starting socket connection');

      socket.on('connect', () => {
        console.log('Connected to socket server');
        socket.emit('joinChat', { clientId: idUser });
      });

      socket.on('receiveMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
      return () => {
        socket.disconnect();
      };
    }
  }, [idUser]);

  useEffect(() => {
    const joinChat = async (clientId) => {
      const res = await fetch('http://localhost:8080/api/chat/join', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ clientId }),
      });
      const data = await res.json();
      if (data.success) {
        setChatId(data.data._id);
        console.log('Joined chat:', data.data);
      } else {
        console.error('Error joining chat:', data.message);
      }
    };

    if (!greetingSent && idUser) {
      joinChat(idUser);
      setMessages([{ text: 'Hello! How can I help you?', sender: 'bot', id: 'bot-greeting' }]);
      setGreetingSent(true);
    }
  }, [greetingSent, idUser, token]);  // Added token as a dependency

  const handleSendMessage = async () => {
    if (newMessage.trim() && chatId) {
      const messageData = { chatId, message: newMessage, sender: idUser };
      socket.emit('sendMessage', messageData);
      setMessages([...messages, messageData]);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-window fixed bottom-0 right-0 transform -translate-x-20 w-80 h-96 bg-white shadow-lg border rounded-lg flex flex-col">
      <div className="flex justify-between items-center p-2 bg-blue-600 text-white rounded-t-lg">
        <span>Chat</span>
        <button onClick={onClose} className="text-lg">&times;</button>
      </div>
      <div className="flex-1 p-2 overflow-y-auto flex flex-col space-y-2 bg-gray-100">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === idUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-2 rounded-lg max-w-xs ${message.sender === idUser ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
              {message.message || message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex p-2 border-t bg-white">
        <input
          type="text"
          className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring focus:border-blue-300"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage} className="bg-blue-600 text-white p-2 rounded-r-lg flex items-center justify-center">
          <IoMdSend />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
