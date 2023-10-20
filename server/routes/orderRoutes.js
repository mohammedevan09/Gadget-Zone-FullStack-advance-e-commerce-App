import express from 'express'
import {
  deleteOrder,
  getAllOrders,
  getOrderById,
  getOrderByUserId,
  updateOrder,
} from '../controller/orderController.js'

const router = express.Router()

router.get('/', getAllOrders)
router.get('/by-user-id/:id', getOrderByUserId)
router.get('/:id', getOrderById)
router.put('/:id', updateOrder)
router.delete('/:id', deleteOrder)

export default router
