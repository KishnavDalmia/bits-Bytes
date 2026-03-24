import express from 'express'
import {
  createOrder,
  getMyOrders,
  getPendingOrders,
  acceptOrder,
  getMyRunnerDeliveries,
  getMessages,
  sendMessage
} from '../controllers/orderController.js'

const orderRouter = express.Router()

orderRouter.post('/', createOrder)
orderRouter.get('/mine', getMyOrders)
orderRouter.get('/pending', getPendingOrders)
orderRouter.get('/my-deliveries', getMyRunnerDeliveries)
orderRouter.patch('/:id/accept', acceptOrder)
orderRouter.get('/:id/messages', getMessages)
orderRouter.post('/:id/messages', sendMessage)

export default orderRouter
