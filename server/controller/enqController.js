import Enquiry from '../models/enqModel.js'
import validateMongoDbId from '../utils/validateMongodbid.js'
import asyncHandler from 'express-async-handler'

export const createEnquiry = asyncHandler(async (req, res) => {
  try {
    const newEnquiry = await Enquiry.create(req.body)
    res.status(200).json(newEnquiry)
  } catch (error) {
    throw new Error(error)
  }
})

export const updateEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)
  try {
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    res.status(200).json(updatedEnquiry)
  } catch (error) {
    throw new Error(error)
  }
})

export const deleteEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)
  try {
    const deletedEnquiry = await Enquiry.findByIdAndDelete(id)
    res.status(200).json(deletedEnquiry)
  } catch (error) {
    throw new Error(error)
  }
})

export const getEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)
  try {
    const getEnquiry = await Enquiry.findById(id)
    res.status(200).json(getEnquiry)
  } catch (error) {
    throw new Error(error)
  }
})

export const getallEnquiry = asyncHandler(async (req, res) => {
  try {
    const getallEnquiry = await Enquiry.find()
    res.status(200).json(getallEnquiry)
  } catch (error) {
    throw new Error(error)
  }
})
