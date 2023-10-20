import express from 'express'
import {
  createBlog,
  deleteBlog,
  dislikeTheBlog,
  getAllBlogs,
  getBlog,
  likeTheBlog,
  updateBlog,
  uploadImages,
} from '../controller/blogController.js'
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js'
import { blogImgResize, uploadPhoto } from '../middleware/uploadImages.js'

const router = express.Router()

router.post('/', authMiddleware, isAdmin, createBlog)
router.put(
  '/upload/:id',
  authMiddleware,
  isAdmin,
  uploadPhoto.array('images', 2),
  blogImgResize,
  uploadImages
)

router.put('/likes', authMiddleware, likeTheBlog)
router.put('/dislikes', authMiddleware, dislikeTheBlog)

router.put('/:id', authMiddleware, isAdmin, updateBlog)

router.get('/:id', getBlog)
router.get('/', getAllBlogs)

router.delete('/:id', authMiddleware, isAdmin, deleteBlog)

export default router
