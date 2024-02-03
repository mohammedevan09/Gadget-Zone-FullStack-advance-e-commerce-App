'use client'

import { DislikesBlog, likesBlog } from '@/api/blogApi'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import {
  BsHeart,
  BsHeartFill,
  BsHeartbreak,
  BsHeartbreakFill,
} from 'react-icons/bs'
import { FaRegEye } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const BlogCard = ({ item }) => {
  const router = useRouter()

  const date = new Date(item?.updatedAt)
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }

  const formattedDate = date.toLocaleDateString(undefined, options)

  function isNewBlog(createdAt) {
    const currentDate = new Date()
    const blogDate = new Date(createdAt)
    const timeDifference = currentDate - blogDate
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

    return daysDifference < 35
  }

  function getDaysAgo(createdAt) {
    const currentDate = new Date()
    const blogDate = new Date(createdAt)
    const timeDifference = currentDate - blogDate
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

    return daysDifference
  }

  const [iconSize, setIconSize] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIconSize(5)
      } else {
        setIconSize(0)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="card 2xl:w-96 sm:w-72 w-[10.5rem] bg-base-100 shadow-xl mx-auto rounded-none mt-[10px]">
      <figure className="w-full cursor-pointer">
        <Image
          src={item?.images[0]?.url}
          alt="category"
          width={1000} // Adjust the width and height as needed
          height={1000}
          quality={50}
          className="sm:h-72 h-44 w-full object-cover"
          onClick={() => router.push(`/blogs/${item?._id}`)}
        />
      </figure>
      <div className="card-body px-2 py-5">
        <div className="2xl:flex grid sm:gap-3 gap-2 justify-between items-center">
          <h2 className="text-md text-gray-400">{formattedDate}</h2>
          <div className="sm:flex grid gap-2">
            <div className="card-actions justify-start badge bg-indigo-600 border-none">
              {item?.category?.slice(0, 15)}
            </div>
            <div
              className={`badge badge-secondary sm:mb-0 mb-1 ${
                isNewBlog(item?.createdAt)
                  ? 'bg-fuchsia-600 border-none'
                  : 'bg-black'
              }`}
            >
              {isNewBlog(item?.createdAt)
                ? 'New'
                : `${getDaysAgo(item?.createdAt)} days ago`}
            </div>
          </div>
        </div>
        <h2 className="break-word card-title 2xl:text-[20px] text-[15px] sm:flex grid">
          {item?.title?.length >= 28 ? (
            <>{item?.title?.substring(0, 28)}...</>
          ) : (
            <>{item?.title}</>
          )}
        </h2>
        <p className="break-word 2xl:text-[16px] text-[13px] sm:inline-block hidden">
          {' '}
          {item?.description?.length >= 95 ? (
            <>{item?.description?.substring(0, 94)}...</>
          ) : (
            <>
              {item?.description + ' '}
              <span className="text-black">
                {'.'.repeat(93 - item?.description?.length)}
              </span>
            </>
          )}
        </p>
        <div className="card-actions justify-between flex gap-3 w-full">
          <button
            onClick={() => router.push(`/blogs/${item?._id}`)}
            className="prod-btn-style py-[5px] sm:px-[12px] px-[8px] font-bold disabled:opacity-60 disabled:border-[2px] rounded-sm w-full"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
