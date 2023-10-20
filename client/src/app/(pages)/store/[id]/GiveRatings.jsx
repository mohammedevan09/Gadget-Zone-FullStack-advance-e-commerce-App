'use client'

import { giveRatings } from '@/api/productApi'
import { handleRefresh } from '@/api/userApi'
import { setToken } from '@/store/reducers/userReducer'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { BsStar, BsStarFill } from 'react-icons/bs'
import Rating from 'react-rating'
import { useDispatch, useSelector } from 'react-redux'

const GiveRatings = ({ color, size, prodId, setRatings, ratings }) => {
  const [value, setValue] = useState('')
  const [star, setStar] = useState('0')

  const dispatch = useDispatch()

  const handleRatingChange = (e) => {
    setStar(e)
  }

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

  const submitRatings = async (e) => {
    e.preventDefault()

    if (token === null) {
      toast.error('You need to Login first!')
      return router.push('/login')
    }

    const rating = await giveRatings(
      {
        prodId,
        star: Number(star),
        comment: value,
      },
      token,
      handleTokenRefresh
    )
    if (ratings?.find((item) => item?.postedBy?._id === userInfo?._id)) {
      toast.success('Your Previous Ratings is updated!')
    } else {
      toast.success('Thanks for the Ratings!')
    }
    setRatings(rating?.ratings)
  }

  return (
    <div className="grid gap-4 items-center mt-10">
      <textarea
        className="bg-black border text-white p-4 outline-none"
        name=""
        id=""
        cols="30"
        rows="4"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Write A Review!"
      ></textarea>
      <div className="flex justify-start items-end gap-2">
        <Rating
          initialRating={star}
          onChange={handleRatingChange}
          emptySymbol={<BsStar color={color || 'white'} size={size || 25} />}
          fullSymbol={<BsStarFill color={color || 'white'} size={size || 25} />}
        />
        <span className="text-lg pb-[1px] text-pink-300">{star} Star</span>
      </div>
      <button
        className="btn bg-white text-black border-0 hover:bg-black hover:text-white hover:border hover:border-white inline-block cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={submitRatings}
        disabled={star == '0' || value === ''}
      >
        Submit Review
      </button>
    </div>
  )
}

export default GiveRatings
