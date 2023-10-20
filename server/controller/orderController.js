import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

export const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find().populate({
      path: 'products.product',
      select:
        '_id title slug description price brand category color images totalRating',
    })
    res.status(200).json(orders)
  } catch (error) {
    throw new Error(error)
  }
})

export const getOrderByUserId = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const orders = await Order.find({ userId: id }).populate({
      path: 'products.product',
      select:
        '_id title slug description price brand category color images totalRating',
    })
    res.status(200).json(orders)
  } catch (error) {
    throw new Error(error)
  }
})

export const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const orders = await Order.findById(id).populate({
      path: 'products.product',
      select:
        '_id title slug description price brand category color images totalRating',
    })
    res.status(200).json(orders)
  } catch (error) {
    throw new Error(error)
  }
})

export const updateOrder = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const update = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    res.status(200).json(update)
  } catch (error) {
    throw new Error(error)
  }
})

export const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const deleteOrder = await Order.findByIdAndDelete(id)
    res.status(200).json(deleteOrder)
  } catch (error) {
    throw new Error(error)
  }
})
