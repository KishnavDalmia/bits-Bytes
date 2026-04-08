import Order from '../models/order.js';

const createOrder = async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        const { from, to, description, cost } = req.body;
        if (!from || !to || !description) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }
        const order = await Order.create({
            userId: req.session.userId,
            from,
            to,
            description,
            cost: cost || 50,
        });
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMyOrders = async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        const orders = await Order.find({ userId: req.session.userId })
            .populate('runnerId', 'name')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPendingOrders = async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        const orders = await Order.find({ status: 'pending' }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const acceptOrder = async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        const order = await Order.findOneAndUpdate(
            { _id: req.params.id, status: 'pending' },
            { status: 'active', runnerId: req.session.userId },
            { new: true }
        );
        if (!order) {
            return res.status(409).json({ message: 'This order has already been accepted by another runner.' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMyRunnerDeliveries = async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        const orders = await Order.find({ runnerId: req.session.userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMessages = async (req, res) => {
    try {
        if (!req.session.userId) {
            console.log('getMessages - No session userId');
            return res.status(401).json({ message: 'Not authenticated' });
        }
        
        const { id } = req.params;
        console.log('getMessages - orderId:', id, 'type:', typeof id, 'userId:', req.session.userId.toString());
        
        // Check if id is a valid MongoDB ObjectId
        if (!id || id.length !== 24) {
            console.log('getMessages - Invalid ObjectId format:', id);
            return res.status(400).json({ message: 'Invalid order ID format' });
        }
        
        const order = await Order.findById(id);
        console.log('getMessages - Order found:', order ? order._id : 'null');
        
        if (!order) {
            console.log('getMessages - Order not found for id:', id);
            return res.status(404).json({ message: 'Order not found' });
        }
        
        const sessionUserId = req.session.userId.toString();
        const isCustomer = order.userId?.toString() === sessionUserId;
        const isRunner = order.runnerId?.toString() === sessionUserId;
        
        console.log('getMessages - isCustomer:', isCustomer, 'isRunner:', isRunner);
        
        if (!isCustomer && !isRunner) {
            return res.status(403).json({ message: 'Not authorized to view this chat' });
        }
        
        res.json(order.messages || []);
    } catch (error) {
        console.error('getMessages error:', error);
        res.status(500).json({ message: error.message });
    }
};

const sendMessage = async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        
        const { text } = req.body;
        if (!text?.trim()) {
            return res.status(400).json({ message: 'Message text is required' });
        }
        
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        const sessionUserId = req.session.userId.toString();
        const isCustomer = order.userId?.toString() === sessionUserId;
        const isRunner = order.runnerId?.toString() === sessionUserId;
        
        if (!isCustomer && !isRunner) {
            return res.status(403).json({ message: 'Not authorized to send message' });
        }
        
        if (order.status !== 'active') {
            return res.status(400).json({ message: 'Can only send messages on active orders' });
        }
        
        const message = {
            senderId: req.session.userId,
            senderRole: isCustomer ? 'customer' : 'runner',
            text: text.trim()
        };
        
        order.messages.push(message);
        await order.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const completeOrder = async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        if (order.runnerId?.toString() !== req.session.userId.toString()) {
            return res.status(403).json({ message: 'Only the assigned runner can complete this order' });
        }
        
        if (order.status !== 'active') {
            return res.status(400).json({ message: 'Only active orders can be completed' });
        }
        
        order.status = 'completed';
        await order.save();
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createOrder, getMyOrders, getPendingOrders, acceptOrder, getMyRunnerDeliveries, getMessages, sendMessage, completeOrder };
