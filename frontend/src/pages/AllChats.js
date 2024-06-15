import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from 'react-icons/md';
import io from 'socket.io-client';
import ChatWindow from '../components/ChatWindow'; 

const socket = io('http://localhost:8080',{withCredentials:true}); 

const AllChats = () => {
    const [allChats, setAllChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);

    useEffect(() => {
        socket.emit('getAllChats');

        socket.on('allChats', (chats) => {
            setAllChats(chats);
        });

        return () => {
            socket.off('allChats');
        };
    }, []);

    const handleAcceptChat = async (chatId) => {
        try {
            const response = await fetch(`/api/chats/${chatId}/accept`, {
                method: 'PUT',
                credentials: 'include'
            });

            const dataResponse = await response.json();

            if (dataResponse.success) {
                setAllChats((prevChats) => prevChats.map(chat => chat._id === chatId ? dataResponse.data : chat));
                toast.success('Chat accepted successfully.');
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            console.error('Error accepting chat:', error);
            toast.error('Error accepting chat. Please try again later.');
        }
    };

    const handleRefuseChat = async (chatId) => {
        try {
            const response = await fetch(`/api/chats/${chatId}/refuse`, {
                method: 'PUT',
                credentials: 'include'
            });

            const dataResponse = await response.json();

            if (dataResponse.success) {
                setAllChats((prevChats) => prevChats.map(chat => chat._id === chatId ? dataResponse.data : chat));
                toast.success('Chat refused successfully.');
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            console.error('Error refusing chat:', error);
            toast.error('Error refusing chat. Please try again later.');
        }
    };

    const handleChatClick = (chat) => {
        setSelectedChat(chat);
      
    };

    return (
        <div className="bg-white pb-4 p-4">
            <h1>All Chats</h1>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-800 text-white">
                        <th className="w-1/12 py-2 px-4">Id</th>
                        <th className="w-2/12 py-2 px-4">Image</th>
                        <th className="w-2/12 py-2 px-4">Client</th>
                        <th className="w-4/12 py-2 px-4">Message</th>
                        <th className="w-2/12 py-2 px-4">Created Date</th>
                        <th className="w-1/12 py-2 px-4">Status</th>
                        <th className="w-2/12 py-2 px-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allChats.map((chat, index) => (
                        <tr key={chat._id} className="border-b border-gray-200">
                            <td className="py-2 px-4 text-center">{index + 1}</td>
                            <td className="py-2 px-4 text-center">
                                <img src={chat.clientImage || 'default-image-url'} alt="Client" className="w-12 h-12 rounded-full mx-auto" />
                            </td>
                            <td className="py-2 px-4 text-center">{chat.clientName || 'Unknown Client'}</td>
                            <td className="py-2 px-4">{chat.message}</td>
                            <td className="py-2 px-4 text-center">{moment(chat.createdAt).format('LL')}</td>
                            <td className="py-2 px-4 text-center">{chat.status}</td>
                            <td className="py-2 px-4 text-center">
                                <button
                                    className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white m-1"
                                    onClick={() => handleAcceptChat(chat._id)}
                                >
                                    Accept
                                </button>
                                <button
                                    className="bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white m-1"
                                    onClick={() => handleRefuseChat(chat._id)}
                                >
                                    Refuse
                                </button>
                                <button
                                    className="bg-blue-100 p-2 rounded-full cursor-pointer hover:bg-blue-500 hover:text-white m-1"
                                    onClick={() => handleChatClick(chat)}
                                >
                                    <MdModeEdit />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedChat && <ChatWindow chat={selectedChat} onClose={() => setSelectedChat(null)} />}
        </div>
    );
};

export default AllChats;