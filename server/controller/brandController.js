import Brand from '../models/brandModel.js'
import Product from '../models/productModel.js'
import validateMongoDbId from '../utils/validateMongodbid.js'
import asyncHandler from 'express-async-handler'

export const createBrand = asyncHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body)
    res.status(200).json(newBrand)
  } catch (error) {
    throw new Error(error)
  }
})

export const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)
  try {
    const findBrand = await Brand.findById(id)

    await Product.updateMany(
      { brand: findBrand?.title },
      {
        $set: { brand: req.body.title },
      }
    )

    const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    res.status(200).json(updatedBrand)
  } catch (error) {
    throw new Error(error)
  }
})

export const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)
  try {
    const findBrand = await Brand.findById(id)

    await Product.updateMany(
      { brand: findBrand?.title },
      {
        $set: { brand: 'none' },
      }
    )

    const deletedBrand = await Brand.findByIdAndDelete(id)
    res.status(200).json(deletedBrand)
  } catch (error) {
    throw new Error(error)
  }
})

export const getBrand = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)
  try {
    const getBrand = await Brand.findById(id)
    res.status(200).json(getBrand)
  } catch (error) {
    throw new Error(error)
  }
})

export const getallBrand = asyncHandler(async (req, res) => {
  try {
    const getallBrand = await Brand.find()
    res.status(200).json(getallBrand)
  } catch (error) {
    throw new Error(error)
  }
})
