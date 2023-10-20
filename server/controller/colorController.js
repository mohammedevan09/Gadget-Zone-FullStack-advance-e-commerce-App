import Color from '../models/colorModel.js'
import validateMongoDbId from '../utils/validateMongodbid.js'
import asyncHandler from 'express-async-handler'

export const createColor = asyncHandler(async (req, res) => {
  try {
    const newColor = await Color.create(req.body)
    res.status(200).json(newColor)
  } catch (error) {
    throw new Error(error)
  }
})

export const updateColor = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)
  try {
    const updatedColor = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    res.status(200).json(updatedColor)
  } catch (error) {
    throw new Error(error)
  }
})

export const deleteColor = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)
  try {
    const deletedColor = await Color.findByIdAndDelete(id)
    res.status(200).json(deletedColor)
  } catch (error) {
    throw new Error(error)
  }
})

export const getColor = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)
  try {
    const getColor = await Color.findById(id)
    res.status(200).json(getColor)
  } catch (error) {
    throw new Error(error)
  }
})

export const getallColor = asyncHandler(async (req, res) => {
  try {
    const getallColor = await Color.find()
    res.status(200).json(getallColor)
  } catch (error) {
    throw new Error(error)
  }
})
