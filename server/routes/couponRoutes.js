import express from 'express'
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js'
import {
  getCoupon,
  createCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
} from '../controller/couponController.js'

const router = express.Router()

router.post('/', authMiddleware, isAdmin, createCoupon)
router.get('/', authMiddleware, isAdmin, getAllCoupons)
router.get('/:id', authMiddleware, isAdmin, getCoupon)
router.put('/:id', authMiddleware, isAdmin, updateCoupon)
router.delete('/:id', authMiddleware, isAdmin, deleteCoupon)

export default router
