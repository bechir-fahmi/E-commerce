const Order = require('../../models/orderModel');

const createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json({ success: true, data: newOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating order', error });
    }
};


const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId').populate('products.productId');
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching orders', error });
    }
};


const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('userId').populate('products.productId');
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching order', error });
    }
};


const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('userId').populate('products.productId');
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating order', error });
    }
};


const acceptOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, { status: 'Accepted' }, { new: true }).populate('userId').populate('products.productId');
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error accepting order', error });
    }
};


const refuseOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, { status: 'Refused' }, { new: true }).populate('userId').populate('products.productId');
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error refusing order', error });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.status(200).json({ success: true, message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting order', error });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    acceptOrder,
    refuseOrder,
    deleteOrder,
};
