import generateToken from '../config/jwtToken.js'
import User from '../models/userModel.js'
import Product from '../models/productModel.js'
import Coupon from '../models/couponModel.js'
import asyncHandler from 'express-async-handler'
import validateMongoDbId from '../utils/validateMongodbid.js'
import generateRefreshToken from '../config/refreshToken.js'
import jwt from 'jsonwebtoken'
import sendEmail from './emailController.js'
import crypto from 'crypto'

// register user
export const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email
  const findUser = await User.findOne({ email })

  if (!findUser) {
    const newUser = await User.create(req.body)
    const refreshToken = generateRefreshToken(newUser?._id)

    const registeredUser = await User.findByIdAndUpdate(
      newUser?.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    )

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    })
    return res
      .status(200)
      .json({ ...registeredUser._doc, token: generateToken(newUser?._id) })
  } else {
    res.status(401)
    throw new Error('User Already Exists')
  }
})

// Admin login
export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  // check if user exists or not
  const findAdmin = await User.findOne({ email })
  if (findAdmin.role !== 'admin') throw new Error('Not Authorized')
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = generateRefreshToken(findAdmin?._id)
    await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    )
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    })

    return res.status(200).json({
      _id: findAdmin?._id,
      firstName: findAdmin?.firstName,
      lastName: findAdmin?.lastName,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
      refreshToken,
    })
  } else {
    throw new Error('Invalid Credentials')
  }
})

// login user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  // check if user exists or not
  const findUser = await User.findOne({ email })
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = generateRefreshToken(findUser?._id)
    await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    )
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    })

    return res.status(200).json({
      _id: findUser?._id,
      firstName: findUser?.firstName,
      lastName: findUser?.lastName,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
      refreshToken,
    })
  } else {
    res.status(401)
    throw new Error('Invalid Credentials')
  }
})

// handle refresh token
export const handleRefreshToken = asyncHandler(async (req, res) => {
  // const cookie = req.cookies
  // if (!cookie.refreshToken) throw new Error('No Refresh token in Cookies!')
  // const refreshToken = cookie.refreshToken
  // console.log(refreshToken)

  const { refreshToken } = req.query

  const user = await User.findOne({ refreshToken })
  if (!user) throw new Error('No refresh token present in db or not matched')
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user?.id !== decoded?.id) {
      throw new Error('There is something wrong with refresh token')
    }
    const accessToken = generateToken(user?._id)
    res.json({ accessToken })
  })
})

// logout user
export const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies
  if (!cookie?.refreshToken) throw new Error('No Refresh Token in Cookies')
  const refreshToken = cookie.refreshToken
  const user = await User.findOne({ refreshToken })
  if (!user) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
    })
    return res.sendStatus(204) // forbidden
  }
  await User.findOneAndUpdate(
    { refreshToken: refreshToken },
    {
      refreshToken: '',
    }
  )
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
  })
  res.sendStatus(204) // forbidden
})

// update a user
export const updateUser = asyncHandler(async (req, res) => {
  // console.log(req.user)
  const { _id } = req.user
  validateMongoDbId(_id)
  try {
    const update = await User.findByIdAndUpdate(
      _id,
      {
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    )
    res.status(200).json(update)
  } catch (error) {
    throw new Error(error)
  }
})

// get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find()
    res.status(200).json(getUsers)
  } catch (error) {
    throw new Error(error)
  }
})

// get single users
export const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)
  try {
    const getUser = await User.findById(id)
    res.status(200).json(getUser)
  } catch (error) {
    throw new Error(error)
  }
})

// delete single users
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)
  try {
    const deleteUser = await User.findByIdAndDelete(id)
    res.status(200).json(deleteUser)
  } catch (error) {
    throw new Error(error)
  }
})

// block user
export const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)
  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    )
    res.json(block)
  } catch (error) {
    throw new Error(error)
  }
})

// unblock user
export const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)
  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    )
    res.json(unblock)
  } catch (error) {
    throw new Error(error)
  }
})

export const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const { password } = req.body
  validateMongoDbId(_id)
  const user = await User.findById(_id)
  if (password) {
    user.password = password
    const updatedPassword = await user.save()
    res.status(200).json(updatedPassword)
  } else {
    res.status(200).json(user)
  }
})

export const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (!user) throw new Error('User not found with this email')

  try {
    const token = await user.createPasswordResetToken()
    await user.save()
    const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:8080/api/user/reset-password/${token}'>Click Here</>`
    const data = {
      to: email,
      text: 'Hey User',
      subject: 'Forgot Password Link',
      html: resetURL,
    }
    sendEmail(data)
    res.json(token)
  } catch (error) {
    throw new Error(error)
  }
})

export const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body
  const { token } = req.params
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  })
  if (!user) throw new Error(' Token Expired, Please try again later')
  user.password = password
  user.passwordResetToken = undefined
  user.passwordResetExpires = undefined
  await user.save()
  res.json(user)
})

export const getWishList = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const findWishlist = await User.findById(id).populate('wishlist')
    res.status(200).json(findWishlist)
  } catch (error) {
    throw new Error(error)
  }
})

export const addToCart = asyncHandler(async (req, res) => {
  const { prodId } = req.body
  const { _id } = req.user
  validateMongoDbId(_id)

  try {
    const user = await User.findById(_id)

    if (!user) throw new Error('Cannot find User')

    const alreadyAddedIndex = user.cart.findIndex(
      (item) => item.product.toString() === prodId
    )

    if (alreadyAddedIndex !== -1) {
      user.cart[alreadyAddedIndex].quantity += 1
    } else {
      user.cart.push({ product: prodId, quantity: 1 })
    }

    await user.save()
    res.status(200).json(user.cart)
  } catch (error) {
    throw new Error(error)
  }
})

export const removeFromCart = asyncHandler(async (req, res) => {
  const { prodId } = req.body
  const { _id } = req.user
  validateMongoDbId(_id)

  try {
    const user = await User.findById(_id)

    if (!user) throw new Error('Cannot find User')

    const productIndex = user.cart.findIndex(
      (item) => item.product.toString() === prodId
    )

    if (productIndex !== -1) {
      user.cart[productIndex].quantity -= 1

      if (user.cart[productIndex].quantity === 0) {
        user.cart.splice(productIndex, 1)
      }

      await user.save()
      res.status(200).json(user.cart)
    } else {
      res.status(404).json({ message: 'Product not found in cart' })
    }
  } catch (error) {
    throw new Error(error)
  }
})

export const getUserCart = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)

  try {
    const cart = await User.findById(id).populate({
      path: 'cart.product',
      select: '_id title slug description price brand category color images',
    })
    res.status(200).json(cart)
  } catch (error) {
    throw new Error(error)
  }
})

export const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user
  validateMongoDbId(_id)

  try {
    let user = await User.findOne({ _id })

    if (!user) throw new Error('Cannot find User')

    user.cart = []
    await user.save()
    res.status(200).json(user)
  } catch (error) {
    throw new Error(error)
  }
})

export const applyCoupon = asyncHandler(async (req, res) => {
  const { coupon } = req.body
  const { _id } = req.user
  validateMongoDbId(_id)

  const validCoupon = await Coupon.findOne({ name: coupon })
  if (validCoupon === null) throw new Error('Invalid Coupon')

  const user = await User.findOne({ _id })
  let { cartTotal } = await Cart.findOne({
    orderby: user._id,
  }).populate('products.product')

  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2)

  await Cart.findOneAndUpdate(
    { orderby: user._id },
    { totalAfterDiscount },
    { new: true }
  )
  res.status(200).json(totalAfterDiscount)
})
