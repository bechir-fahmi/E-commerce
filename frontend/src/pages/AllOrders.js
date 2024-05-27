import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from 'react-icons/md';

const AllOrders = () => {
    const [allOrders, setAllOrders] = useState([]);

    const fetchAllOrders = async () => {
        try {
            const response = await fetch('/api/orders', {
                method: 'GET',
                credentials: 'include'
            });

            const dataResponse = await response.json();

            if (dataResponse.success) {
                setAllOrders(dataResponse.data);
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            toast.error('Error fetching orders. Please try again later.');
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const handleAcceptOrder = async (orderId) => {
        try {
            const response = await fetch(`/api/orders/${orderId}/accept`, {
                method: 'PUT',
                credentials: 'include'
            });

            const dataResponse = await response.json();

            if (dataResponse.success) {
                setAllOrders((prevOrders) => prevOrders.map(order => order._id === orderId ? dataResponse.data : order));
                toast.success('Order accepted successfully.');
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            console.error('Error accepting order:', error);
            toast.error('Error accepting order. Please try again later.');
        }
    };

    const handleRefuseOrder = async (orderId) => {
        try {
            const response = await fetch(`/api/orders/${orderId}/refuse`, {
                method: 'PUT',
                credentials: 'include'
            });

            const dataResponse = await response.json();

            if (dataResponse.success) {
                setAllOrders((prevOrders) => prevOrders.map(order => order._id === orderId ? dataResponse.data : order));
                toast.success('Order refused successfully.');
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            console.error('Error refusing order:', error);
            toast.error('Error refusing order. Please try again later.');
        }
    };

    return (
        <div className="bg-white pb-4">
            <table className="w-full userTable">
                <thead>
                    <tr className="bg-black text-white">
                        <th>Id</th>
                        <th>Client</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Total</th>
                        <th>Created Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allOrders.map((order, index) => (
                        <tr key={order._id}>
                            <td>{index + 1}</td>
                            <td>{order.userId?.name || 'Unknown Client'}</td>
                            <td>{order.address}</td>
                            <td>{order.phone}</td>
                            <td>{order.total}</td>
                            <td>{moment(order.createdAt).format('LL')}</td>
                            <td>{order.status}</td>
                            <td>
                                <button
                                    className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                                    onClick={() => handleAcceptOrder(order._id)}
                                >
                                    Accept
                                </button>
                                <button
                                    className="bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white"
                                    onClick={() => handleRefuseOrder(order._id)}
                                >
                                    Refuse
                                </button>
                                <button
                                    className="bg-blue-100 p-2 rounded-full cursor-pointer hover:bg-blue-500 hover:text-white"
                                    onClick={() => {
                                        // setUpdateOrderDetails(order);
                                    }}
                                >
                                    <MdModeEdit />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllOrders;
