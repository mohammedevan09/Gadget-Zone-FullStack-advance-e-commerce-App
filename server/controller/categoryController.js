import Category from '../models/categoryModel.js'
import Product from '../models/productModel.js'
import validateMongoDbId from '../utils/validateMongodbid.js'
import asyncHandler from 'express-async-handler'
import {
  cloudinaryDeleteImg,
  cloudinaryUploadImg,
} from '../utils/cloudinary.js'
import fs from 'fs'

export const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body)

    res.status(200).json(newCategory)
  } catch (error) {
    throw new Error(error)
  }
})

export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)
  try {
    const findCategory = await Category.findById(id)

    await Product.updateMany(
      { category: findCategory?.title },
      {
        $set: { category: req.body.title },
      }
    )

    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    res.status(200).json(updatedCategory)
  } catch (error) {
    throw new Error(error)
  }
})

export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { forDelete } = req.query
  validateMongoDbId(id)
  try {
    const findCategory = await Category.findById(id)

    await Product.updateMany(
      { category: findCategory?.title },
      {
        $set: { category: 'none' },
      }
    )

    if (forDelete) {
      await cloudinaryDeleteImg(forDelete, 'images')
    }

    const deletedCategory = await Category.findByIdAndDelete(id)
    res.status(200).json(deletedCategory)
  } catch (error) {
    throw new Error(error)
  }
})

export const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)
  try {
    const getCategory = await Category.findById(id)
    res.status(200).json(getCategory)
  } catch (error) {
    throw new Error(error)
  }
})

export const getallCategory = asyncHandler(async (req, res) => {
  try {
    const getallCategory = await Category.find()
    res.status(200).json(getallCategory)
  } catch (error) {
    throw new Error(error)
  }
})

export const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { forDelete } = req.query
  validateMongoDbId(id)
  try {
    const uploader = (path) => cloudinaryUploadImg(path, 'images')
    let urls = {}
    const files = req.files
    for (const file of files) {
      const { path } = file
      const newPath = await uploader(path)
      urls = newPath
      fs.unlinkSync(path)
    }
    // console.log(urls)

    if (forDelete) {
      await cloudinaryDeleteImg(forDelete, 'images')
    }

    const findCat = await Category.findByIdAndUpdate(
      id,
      {
        image: urls,
      },
      {
        new: true,
      }
    )
    res.status(200).json(findCat)
  } catch (error) {
    throw new Error(error)
  }
})
