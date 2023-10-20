import Blog from '../models/blogModel.js'
import validateMongoDbId from '../utils/validateMongodbid.js'
import asyncHandler from 'express-async-handler'
import {
  cloudinaryDeleteImg,
  cloudinaryUploadImg,
} from '../utils/cloudinary.js'
import fs from 'fs'

export const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body)
    res.status(200).json(newBlog)
  } catch (error) {
    throw new Error(error)
  }
})

export const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)
  try {
    const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    res.status(200).json(updateBlog)
  } catch (error) {
    throw new Error(error)
  }
})

export const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)
  try {
    await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 0.5 },
      },
      { new: true }
    )
    const getBlog = await Blog.findById(id)
      .populate({
        path: 'likes',
        select: 'firstName lastName _id',
      })
      .populate({
        path: 'dislikes',
        select: 'firstName lastName _id',
      })
    res.status(200).json(getBlog)
  } catch (error) {
    throw new Error(error)
  }
})

export const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const page = req.query.page
    const limit = req.query.limit
    const skip = (page - 1) * limit
    const getBlogs = await Blog.find().skip(skip).limit(limit)
    res.status(200).json(getBlogs)
  } catch (error) {
    throw new Error(error)
  }
})

export const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id)
    res.status(200).json(deletedBlog)
  } catch (error) {
    throw new Error(error)
  }
})

export const likeTheBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body
  validateMongoDbId(blogId)
  // Find the blog which you want to be liked
  const blog = await Blog.findById(blogId)
  // find the login user
  const loginUserId = req?.user?._id

  const alreadyDisliked = blog?.dislikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  )

  const alreadyLiked = blog?.likes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  )

  if (alreadyDisliked) {
    await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    )
  }

  if (alreadyLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    )
    return res.json(blog)
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    )
    return res.json(blog)
  }
})

export const dislikeTheBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body
  validateMongoDbId(blogId)
  // Find the blog which you want to be liked
  const blog = await Blog.findById(blogId)
  // find the login user
  const loginUserId = req?.user?._id

  const alreadyLiked = blog?.likes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  )

  const alreadyDisliked = blog?.dislikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  )

  if (alreadyLiked) {
    await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    )
  }

  if (alreadyDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    )
    return res.json(blog)
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDisliked: true,
      },
      { new: true }
    )
    return res.json(blog)
  }
})

export const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { forDelete } = req.query
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

    if (forDelete) {
      await cloudinaryDeleteImg(forDelete, 'images')
    }

    const findBlog = await Blog.findByIdAndUpdate(
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
    return res.status(200).json(findBlog)
  } catch (error) {
    throw new Error(error)
  }
})
