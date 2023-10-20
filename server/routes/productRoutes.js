import express from 'express'
import {
  addToWishList,
  createProduct,
  deleteImages,
  deleteProduct,
  getAllProduct,
  getProduct,
  rating,
  updateProduct,
  uploadImages,
} from '../controller/productController.js'
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js'
import { productImgResize, uploadPhoto } from '../middleware/uploadImages.js'

const router = express.Router()

router.post('/', authMiddleware, isAdmin, createProduct)
router.put(
  '/upload/:id',
  authMiddleware,
  isAdmin,
  uploadPhoto.array('images', 10),
  productImgResize,
  uploadImages
)
router.get('/:id', getProduct)
router.put('/wishlist', authMiddleware, addToWishList)
router.put('/rating', authMiddleware, rating)

router.put('/:id', authMiddleware, isAdmin, updateProduct)
router.delete('/:id', authMiddleware, isAdmin, deleteProduct)
router.delete('/delete-img/:id', authMiddleware, isAdmin, deleteImages)

router.get('/', getAllProduct)

export default router
