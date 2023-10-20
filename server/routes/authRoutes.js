import express from 'express'
import {
  addToCart,
  applyCoupon,
  blockUser,
  createUser,
  deleteUser,
  emptyCart,
  forgotPasswordToken,
  getAllUsers,
  getUser,
  getUserCart,
  getWishList,
  handleRefreshToken,
  loginAdmin,
  loginUser,
  logout,
  removeFromCart,
  resetPassword,
  unblockUser,
  updatePassword,
  updateUser,
} from '../controller/userController.js'
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', createUser)
router.post('/forgot-password-token', forgotPasswordToken)
router.put('/reset-password/:token', resetPassword)
router.put('/password', authMiddleware, updatePassword)
router.post('/login', loginUser)
router.post('/admin-login', loginAdmin)
router.post('/cart', authMiddleware, addToCart)
router.post('/cart/apply-coupon', authMiddleware, applyCoupon)
router.get('/all-users', getAllUsers)
router.get('/refresh', handleRefreshToken)
router.get('/logout', logout)
router.get('/wishlist/:id', getWishList)
router.get('/cart/:id', getUserCart)

router.get('/:id', authMiddleware, isAdmin, getUser)
router.delete('/empty-cart', authMiddleware, emptyCart)
router.delete('/cart', authMiddleware, removeFromCart)
router.delete('/:id', deleteUser)

router.put('/edit-user', authMiddleware, updateUser)
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser)
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser)

export default router
