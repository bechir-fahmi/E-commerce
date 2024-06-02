// ChatWindow.js
import React, { useState, useEffect } from 'react';
import { IoMdSend } from 'react-icons/io';

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [greetingSent, setGreetingSent] = useState(false);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      setNewMessage('');
    }
  };

  useEffect(() => {
    if (!greetingSent) {
      setMessages([{ text: 'Hello! How can I help you?', sender: 'bot' }]);
      setGreetingSent(true);
    }
  }, [greetingSent]);

  return (
    <div className="chat-window fixed bottom-0 right-0 transform -translate-x-20 w-80 h-96 bg-white shadow-lg border rounded-lg flex flex-col">
      <div className="flex justify-between items-center p-2 bg-blue-600 text-white rounded-t-lg">
        <span>Chat</span>
        <button onClick={onClose} className="text-lg">&times;</button>
      </div>
      <div className="flex-1 p-2 overflow-y-auto flex flex-col space-y-2 bg-gray-100">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-2 rounded-lg max-w-xs ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
              {message.text}
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