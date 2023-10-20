import express from 'express'
import {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiry,
  getallEnquiry,
} from '../controller/enqController.js'
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', authMiddleware, isAdmin, createEnquiry)
router.put('/:id', authMiddleware, isAdmin, updateEnquiry)
router.delete('/:id', authMiddleware, isAdmin, deleteEnquiry)
router.get('/:id', getEnquiry)
router.get('/', getallEnquiry)

export default router
