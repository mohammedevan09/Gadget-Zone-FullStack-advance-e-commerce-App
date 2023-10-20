import express from 'express'
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js'
import {
  createCategory,
  deleteCategory,
  getCategory,
  getallCategory,
  updateCategory,
  uploadImages,
} from '../controller/categoryController.js'
import { productImgResize, uploadPhoto } from '../middleware/uploadImages.js'

const router = express.Router()

router.post('/', authMiddleware, isAdmin, createCategory)
router.put(
  '/upload/:id',
  authMiddleware,
  isAdmin,
  uploadPhoto.array('images', 1),
  productImgResize,
  uploadImages
)
router.put('/:id', authMiddleware, isAdmin, updateCategory)
router.delete('/:id', authMiddleware, isAdmin, deleteCategory)
router.get('/:id', getCategory)
router.get('/', getallCategory)

export default router
