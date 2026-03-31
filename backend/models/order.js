import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  senderRole: {
    type: String,
    enum: ['customer', 'runner'],
    required: true
  },
  text: {
    type: String,
    required: true
  }
}, { timestamps: true })

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    default: 'Add details about your order here'
  },
  cost: {
    type: Number,
    required: true,
    default: 50
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'completed'],
    default: 'pending'
  },
  runnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  messages: [messageSchema]
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema)
export default Order