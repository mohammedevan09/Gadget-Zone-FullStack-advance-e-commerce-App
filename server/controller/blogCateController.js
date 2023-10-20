import BlogCate from '../models/blogCateModel.js'
import Blog from '../models/blogModel.js'
import validateMongoDbId from '../utils/validateMongodbid.js'
import asyncHandler from 'express-async-handler'

export const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await BlogCate.create(req.body)
    res.status(200).json(newCategory)
  } catch (error) {
    throw new Error(error)
  }
})

export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)
  try {
    const findCategory = await BlogCate.findById(id)

    await Blog.updateMany(
      { category: findCategory?.title },
      {
        $set: { category: req.body.title },
      }
    )

    const updatedCategory = await BlogCate.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    res.status(200).json(updatedCategory)
  } catch (error) {
    throw new Error(error)
  }
})

export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)
  try {
    const findCategory = await BlogCate.findById(id)

    await Blog.updateMany(
      { category: findCategory?.title },
      {
        $set: { category: 'none' },
      }
    )

    const deletedCategory = await BlogCate.findByIdAndDelete(id)
    res.status(200).json(deletedCategory)
  } catch (error) {
    throw new Error(error)
  }
})

export const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)
  try {
    const getaCategory = await BlogCate.findById(id)
    res.status(200).json(getaCategory)
  } catch (error) {
    throw new Error(error)
  }
})

export const getallCategory = asyncHandler(async (req, res) => {
  try {
    const getallCategory = await BlogCate.find()
    res.status(200).json(getallCategory)
  } catch (error) {
    throw new Error(error)
  }
})
