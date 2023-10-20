import Coupon from '../models/couponModel.js'
import validateMongoDbId from '../utils/validateMongodbid.js'
import asyncHandler from 'express-async-handler'

export const createCoupon = asyncHandler(async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body)
    res.status(200).json(newCoupon)
  } catch (error) {
    throw new Error(error)
  }
})

export const getAllCoupons = asyncHandler(async (req, res) => {
  try {
    const coupons = await Coupon.find()
    res.status(200).json(coupons)
  } catch (error) {
    throw new Error(error)
  }
})

export const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)
  try {
    const update = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    res.status(200).json(update)
  } catch (error) {
    throw new Error(error)
  }
})

export const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)
  try {
    const deleteCoupon = await Coupon.findByIdAndDelete(id)
    res.status(200).json(deleteCoupon)
  } catch (error) {
    throw new Error(error)
  }
})

export const getCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)
  try {
    const getCoupon = await Coupon.findById(id)
    res.status(200).json(getCoupon)
  } catch (error) {
    throw new Error(error)
  }
})
