import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import validateMongoDbId from '../utils/validateMongodbid.js'
import slugify from 'slugify'
import User from '../models/userModel.js'
import {
  cloudinaryDeleteImg,
  cloudinaryUploadImg,
} from '../utils/cloudinary.js'
import fs from 'fs'

export const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title)
    }
    const newProduct = await Product.create(req.body)
    res.status(200).json(newProduct)
  } catch (error) {
    throw new Error(error)
  }
})

export const updateProduct = asyncHandler(async (req, res) => {
  const id = req.params
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title)
    }
    const update = await Product.findOneAndUpdate({ id }, req.body, {
      new: true,
    })
    res.status(200).json(update)
  } catch (error) {
    throw new Error(error)
  }
})

export const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params
  validateMongoDbId(id)
  try {
    const deleteProduct = await Product.findOneAndDelete(id)
    res.status(200).json(deleteProduct)
  } catch (error) {
    throw new Error(error)
  }
})

export const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)
  try {
    const findProduct = await Product.findById(id)
      .populate({
        path: 'ratings.postedBy',
        select: '_id firstName lastName email',
      })
      .populate({
        path: 'color',
        select: 'title',
      })
    res.status(200).json(findProduct)
  } catch (error) {
    throw new Error(error)
  }
})

export const getAllProduct = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query }
    const excludeFields = ['page', 'sort', 'limit', 'fields']
    excludeFields.forEach((e) => delete queryObj[e])
    // console.log(queryObj, req.query)

    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
    queryStr = JSON.parse(queryStr)

    if (queryStr.title) {
      queryStr.title = { $regex: queryStr.title, $options: 'i' }
    }

    let query = Product.find(queryStr)

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ')
      // console.log(sortBy)
      query = query.sort(sortBy)
    } else {
      query = query.sort('-createdAt')
    }

    // Fields
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ')
      // console.log(fields)
      query = query.select(fields)
    } else {
      query = query.select('-__v')
    }

    // Pagination

    const page = req.query.page
    const limit = req.query.limit
    const skip = (page - 1) * limit
    query = query.skip(skip).limit(limit)
    if (req.query.page) {
      const productCount = await Product.countDocuments()
      if (skip >= productCount) throw new Error('This Page does not exists')
    }

    const products = await query
    res.status(200).json(products)
  } catch (error) {
    throw new Error(error)
  }
})

export const addToWishList = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const { prodId } = req.body
  try {
    const user = await User.findById(_id)
    const alreadyAdded = user.wishlist.find((id) => id.toString() === prodId)
    if (alreadyAdded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        {
          new: true,
        }
      )
      res.json(user)
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        {
          new: true,
        }
      )
      res.json(user)
    }
  } catch (error) {
    throw new Error(error)
  }
})

export const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const { star, prodId, comment } = req.body

  try {
    // First, update or insert the rating
    let product

    const alreadyRated = await Product.findOne({
      _id: prodId,
      'ratings.postedBy': _id,
    })

    if (alreadyRated) {
      // Update the existing rating
      product = await Product.findOneAndUpdate(
        {
          _id: prodId,
          'ratings.postedBy': _id,
        },
        {
          $set: {
            'ratings.$.star': star,
            'ratings.$.comment': comment,
          },
        },
        {
          new: true,
        }
      )
    } else {
      // Insert a new rating
      product = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              postedBy: _id,
              comment: comment,
            },
          },
        },
        {
          new: true,
        }
      )
    }

    product = await Product.findById(prodId)

    const totalRating = product.ratings.length
    const ratingSum = product.ratings.reduce(
      (prev, curr) => prev + curr.star,
      0
    )
    const actualRating = Math.round(ratingSum / totalRating)

    // Update the product's totalRating field
    product = await Product.findByIdAndUpdate(
      prodId,
      {
        totalRating: actualRating,
      },
      { new: true }
    ).populate({
      path: 'ratings.postedBy',
      select: '_id firstName lastName email',
    })

    res.json(product)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

export const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params
  // const { forDelete } = req.query
  validateMongoDbId(id)

  try {
    const uploader = (path) => cloudinaryUploadImg(path, 'images')
    const urls = []
    const files = req.files
    for (const file of files) {
      const { path } = file
      const newPath = await uploader(path)
      urls.push(newPath)
      fs.unlinkSync(path)
    }

    // console.log(req.files)

    // if (forDelete) {
    //   await cloudinaryDeleteImg(forDelete, 'images')
    // }

    const findProduct = await Product.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file
        }),
      },
      {
        new: true,
      }
    )
    return res.status(200).json(findProduct)
  } catch (error) {
    throw new Error(error)
  }
})

export const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const deleted = cloudinaryDeleteImg(id, 'images')
    res.json({ message: 'Deleted' })
  } catch (error) {
    throw new Error(error)
  }
})
