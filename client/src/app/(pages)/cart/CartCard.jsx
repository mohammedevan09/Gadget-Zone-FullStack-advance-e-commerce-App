'use client'

import { addToCart, handleRefresh, removeFromCart } from '@/api/userApi'
import {
  descCart,
  descTotal,
  incTotal,
  setToken,
} from '@/store/reducers/userReducer'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

const CartCard = ({ item, isOrder = false }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { token } = useSelector((state) => state?.user)

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

  const [count, setCount] = useState(item?.quantity)

  const quantityInc = () => {
    setCount((prev) => prev + 1)
    addToCart({ prodId: item?.product?._id }, token, handleTokenRefresh).then(
      () => {
        // toast.success('Added to the cart!')
      }
    )
    dispatch(incTotal(item?.product?.price))
  }
  const quantityDecr = () => {
    setCount((prev) => prev - 1)
    dispatch(descTotal(item?.product?.price))
    removeFromCart(
      { prodId: item?.product?._id },
      token,
      handleTokenRefresh
    ).then(() => {
      // if (count === 1) {
      //   //  toast.success('Removed from the cart!')
      //   dispatch(descCart())
      // }
    })
  }

  const total = item?.product?.price * count
  return (
    <div className="grid items-center justify-center gap-4">
      <div className="grid grid-cols-4 justify-between items-center gap-3 sm:text-2xl text-[15px]">
        <div className="md:w-56 sm:w-40 w-24">
          <Link href={`/store/${item?.product?._id}`} target="_blank">
            <Image
              src={item?.product?.images[0]?.url}
              alt="category"
              width={1000} // Adjust the width and height as needed
              height={1000}
              quality={100}
              className="md:h-56 sm:h-40 h-24 w-full object-cover"
              onClick={() => router.push(`/store/${item?.product?._id}`)}
            />
          </Link>
          <h2 className="md:text-xl text-[13px] mb-1 text-gray-200 break-word mt-1">
            {/* {item?.product?.title?.length >= 22 ? (
              <>{item?.product?.title?.substring(0, 22)}...</>
            ) : (
              <>{item?.product?.title}</>
            )} */}
            <Link
              href={`/store/${item?.product?._id}`}
              target="_blank"
              className="px-1 py-1 gradient-text text-bla flex mx-auto text-sm font-semibold hover:bg-black hover:text-white my-1"
            >
              See Details!
            </Link>
          </h2>
          <div className="card-actions sm:flex hidden justify-start">
            <div className="badge bg-fuchsia-500 border-none sm:text-sm text-[11px]">
              {item?.product?.brand?.length >= 8 ? (
                <>{item?.product?.brand?.substring(0, 8)}...</>
              ) : (
                <>{item?.product?.brand}</>
              )}
            </div>
            <div className="badge bg-indigo-500 border-none sm:text-sm text-[11px]">
              {item?.product?.category?.length >= 8 ? (
                <>{item?.product?.category?.substring(0, 8)}...</>
              ) : (
                <>{item?.product?.category}</>
              )}
            </div>
          </div>
        </div>
        <div className="text-center">$ {item?.product?.price}</div>
        <div className="text-center flex items-center justify-center gap-4 sm:text-[15px] text-[20px]">
          {' '}
          {!isOrder && (
            <button
              onClick={quantityInc}
              className="c-btn h-[38px] w-[38px] sm:bg-white bg-black sm:text-black text-white sm:border border-none font-bold"
            >
              +
            </button>
          )}{' '}
          {count}{' '}
          {!isOrder && (
            <button
              onClick={quantityDecr}
              className="c-btn disabled:opacity-50 disabled:cursor-not-allowed sm:bg-white bg-black sm:text-black text-white sm:border border-none font-bold"
              disabled={count === 0}
            >
              -
            </button>
          )}
        </div>
        <div className="text-center">$ {total}</div>
      </div>
    </div>
  )
}

export default CartCard
