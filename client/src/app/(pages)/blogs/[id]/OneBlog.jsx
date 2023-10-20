'use client'

import Link from 'next/link'
import {
  BsArrowLeftCircle,
  BsHeartbreakFill,
  BsHeartbreak,
  BsHeart,
  BsHeartFill,
} from 'react-icons/bs'
import { FaRegEye } from 'react-icons/fa'
import Image from 'next/image'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DislikesBlog, likesBlog } from '@/api/blogApi'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { handleRefresh } from '@/api/userApi'
import { setToken } from '@/store/reducers/userReducer'

const OneBlog = ({ blog, formattedDate }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [isLiked, setIsLiked] = useState(false)
  const [isDisLiked, setIsDisLiked] = useState(false)

  const [likeLength, setLikeLength] = useState(blog?.likes?.length)
  const [dislikeLength, setDisLikeLength] = useState(blog?.dislikes?.length)

  const { userInfo, token } = useSelector((state) => state?.user)

  const handleTokenRefresh = async () => {
    try {
      const refreshedData = await handleRefresh({
        refreshToken: userInfo?.refreshToken,
      })
      if (refreshedData !== null) {
        dispatch(setToken(refreshedData?.accessToken))
      } else {
        console.error('Refresh request failed')
      }
    } catch (error) {
      console.error('Error refreshing token:', error)
    }
  }

  useEffect(() => {
    let isAlreadyLiked = blog?.likes?.find(
      (item) => item?._id === userInfo?._id
    )

    let isAlreadyDisLiked = blog?.dislikes?.find(
      (item) => item?._id === userInfo?._id
    )

    if (isAlreadyLiked) {
      setIsLiked(true)
    }

    if (isAlreadyDisLiked) {
      setIsDisLiked(true)
    }
  }, [blog?.likes, blog?.dislikes, userInfo?._id])

  const handleLike = async (e) => {
    e.preventDefault()

    if (token === null) {
      toast.error('You need to Login first!')
      return router.push('/login')
    }

    if (isDisLiked) {
      setIsDisLiked(false)
      setDisLikeLength((prev) => prev - 1)
    }

    if (isLiked) {
      setIsLiked(false)
      setLikeLength((prev) => prev - 1)
      await likesBlog({ blogId: blog?._id }, token, handleTokenRefresh)
    } else {
      setLikeLength((prev) => prev + 1)
      setIsLiked(true)
      await likesBlog({ blogId: blog?._id }, token, handleTokenRefresh)
    }
  }

  const handleDisLike = async (e) => {
    e.preventDefault()

    if (token === null) {
      toast.error('You need to Login first!')
      return router.push('/login')
    }

    if (isLiked) {
      setIsLiked(false)
      setLikeLength((prev) => prev - 1)
    }

    if (isDisLiked) {
      setIsDisLiked(false)
      setDisLikeLength((prev) => prev - 1)
      await DislikesBlog({ blogId: blog?._id }, token, handleTokenRefresh)
    } else {
      setDisLikeLength((prev) => prev + 1)
      setIsDisLiked(true)
      await DislikesBlog({ blogId: blog?._id }, token, handleTokenRefresh)
    }
  }

  return (
    <div className="grid items-center text-white justify-center xl:pt-44 pt-24 pb-10 gap-4 xl:mx-[17rem] sm:mx-[4rem] mx-[2rem]">
      <Link
        href={'/blogs'}
        className="flex justify-start items-center gap-2 sm:text-xl text-lg mb-3"
      >
        <BsArrowLeftCircle size={24} /> Go Back To Blogs
      </Link>
      <div className="xl:text-5xl sm:text-3xl text-2xl font-semibold">
        {blog?.title}
      </div>
      <div className="w-full text-center">
        <Image
          src={blog?.images[0]?.url}
          alt="Blog"
          width={1400}
          height={1400}
          quality={100}
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-6">
          <button
            className="flex justify-center items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            onClick={handleLike}
          >
            {isLiked ? (
              <BsHeartFill size={24} color="#ff4949" />
            ) : (
              <BsHeart size={24} />
            )}
            {likeLength}
          </button>
          <button
            className="flex justify-center items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            onClick={handleDisLike}
          >
            {isDisLiked ? (
              <BsHeartbreakFill size={24} color="#ff4949" />
            ) : (
              <BsHeartbreak size={24} />
            )}
            {dislikeLength}
          </button>
          <div className="flex justify-center items-center gap-2">
            <FaRegEye size={24} />
            {blog?.numViews}
          </div>
        </div>
        <h2 className="text-md text-gray-400">{formattedDate}</h2>
      </div>
      <div className="flex items-center justify-start gap-3">
        <div className="card-actions justify-start badge bg-indigo-600 border-none">
          {blog?.category}
        </div>
        <div className="card-actions justify-start badge bg-fuchsia-600 border-none">
          {blog?.author}
        </div>
      </div>
      <div className="md:text-xl text-md mt-2 text-justify text-gray-300">
        {blog?.description}
      </div>
    </div>
  )
}

export default OneBlog
