'use client'

import Ratings from '@/components/Ratings'
import ProductSlider from './ProductSlider'
import { TbShoppingCartPlus } from 'react-icons/tb'
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt } from 'react-icons/ai'
import { FaCodeCompare } from 'react-icons/fa6'
import GiveRatings from './GiveRatings'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { addToWishList, getWishlist } from '@/api/productApi'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import {
  addToCart,
  getCart,
  handleRefresh,
  removeFromCart,
} from '@/api/userApi'
import { descCart, incCart, setToken } from '@/store/reducers/userReducer'

const OneProduct = ({ info, oneProduct }) => {
  const [isWishlist, setIsWishlist] = useState(false)
  const [quantity, setQuantity] = useState(0)

  const [ratings, setRatings] = useState(oneProduct?.ratings)

  const { userInfo, token } = useSelector((state) => state?.user)

  const dispatch = useDispatch()
  const router = useRouter()

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
    const fetchCart = async () => {
      if (userInfo) {
        const cart = await getCart(userInfo?._id)
        const findCart = cart?.cart.find(
          (item) => item?.product?._id === oneProduct?._id
        )
        if (findCart) {
          setQuantity(findCart?.quantity)
        }
      }
    }
    fetchCart()
  }, [oneProduct?._id, userInfo])

  useEffect(() => {
    const fetchWishlists = async () => {
      if (userInfo) {
        const wishlists = await getWishlist(userInfo?._id)
        const findWishList = wishlists?.wishlist.find(
          (item) => item?._id === oneProduct?._id
        )
        if (findWishList) {
          setIsWishlist(true)
        }
      }
    }
    fetchWishlists()
  }, [oneProduct?._id, userInfo])

  function isNewProduct(createdAt) {
    const currentDate = new Date()
    const productDate = new Date(createdAt)
    const timeDifference = currentDate - productDate
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

    return daysDifference < 30
  }

  function getDaysAgo(createdAt) {
    const currentDate = new Date()
    const productDate = new Date(createdAt)
    const timeDifference = currentDate - productDate
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

    return daysDifference
  }

  const handleAddingToCart = (e) => {
    e.preventDefault()
    if (token === null) {
      toast.error('You need to Login first!')
      return router.push('/login')
    }

    setQuantity((prev) => prev + 1)
    dispatch(incCart())
    addToCart({ prodId: oneProduct?._id }, token, handleTokenRefresh).then(
      () => {
        toast.success('Added to the cart!')
      }
    )
  }

  const handleAddingToExistingCart = (e) => {
    e.preventDefault()
    setQuantity((prev) => prev + 1)
    addToCart({ prodId: oneProduct?._id }, token, handleTokenRefresh).then(
      (value) => {
        // toast.success('Added to the cart!')
      }
    )
  }

  const handleRemoveFromExistingCart = (e) => {
    e.preventDefault()
    if (quantity > 0) {
      setQuantity((prev) => prev - 1)
      removeFromCart(
        { prodId: oneProduct?._id },
        token,
        handleTokenRefresh
      ).then(() => {
        if (quantity === 1) {
          dispatch(descCart())
          toast.success('Removed from the cart!')
        }
      })
    }
  }

  const handleAddingToWishlist = (e) => {
    e.preventDefault()

    if (token === null) {
      toast.error('You need to Login first!')
      return router.push('/login')
    }

    if (!isWishlist) {
      setIsWishlist(true)
      addToWishList(
        { prodId: oneProduct?._id },
        token,
        handleTokenRefresh
      ).then(() => {
        toast.success('Added to the wishlist')
      })
    } else {
      setIsWishlist(false)
      addToWishList(
        { prodId: oneProduct?._id },
        token,
        handleTokenRefresh
      ).then(() => {
        toast.success('Removed from the wishlist')
      })
    }
  }

  const handleBuyNow = (e) => {
    e.stopPropagation()
    if (token === null) {
      toast.error('You need to Login first!')
      return router.push('/login')
    }

    if (quantity > 0) {
      router?.push(`/cart/?userId=${userInfo?._id}`)
    } else {
      addToCart({ prodId: oneProduct?._id }, token, handleTokenRefresh).then(
        () => {
          toast.success('Added to the cart!')
          dispatch(incCart())
          router?.push(`/cart/?userId=${userInfo?._id}`)
        }
      )
    }
  }

  const handleCopyURL = (e) => {
    e.preventDefault()
    const currentURL = window.location.href
    navigator.clipboard.writeText(currentURL)
    toast.success('URL copied to clipboard!')
  }

  return (
    <>
      <main className="grid items-around text-white justify-center xl:pt-44 pt-24 pb-10 gap-3 xl:mx-[20rem] mx-[1rem] md:px-0 px-[1rem]">
        <div className="md:flex grid justify-around items-start xl:gap-[70px] gap-[35px]">
          <div className="relative grid md:justify-end justify-center md:w-1/2 w-full">
            <ProductSlider image={oneProduct?.images} />
          </div>
          <div className="mx-auto md:w-1/2 w-full">
            <div className="xl:w-[600px] md:w-[400px] w-full">
              <h1 className="sm:text-2xl text-lg font-semibold">
                {oneProduct?.title}
              </h1>
              <div className="w-full my-3 h-[1px] bg-gray-600"></div>
              <div className="flex justify-start items-center gap-3">
                <h1 className="text-2xl sm:my-3 my-[5px]">
                  $ {oneProduct?.price}
                </h1>
                <div
                  className={`badge badge-secondary ${
                    isNewProduct(oneProduct?.createdAt)
                      ? 'bg-fuchsia-600 border-none'
                      : 'bg-black'
                  }`}
                >
                  {isNewProduct(oneProduct?.createdAt)
                    ? 'New'
                    : `${getDaysAgo(oneProduct?.createdAt)} days ago`}
                </div>
              </div>
              <div className="flex items-center justify-start gap-2">
                <Ratings item={oneProduct?.totalRating} color={'pink'} />{' '}
                <div className="text-white">{oneProduct?.totalRating}</div>
                <div>{`( ${oneProduct?.ratings?.length} Reviews )`}</div>
              </div>
              <div className="mt-2">Write a Review</div>
              <div className="w-full my-3 h-[1px] bg-gray-600"></div>
              <div className="flex justify-between items-center gap-3 my-2">
                {oneProduct?.tags?.map((tag, i) => (
                  <div className="badge bg-indigo-500 border-none" key={i}>
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </div>
                ))}
                <div className={`cursor-pointer`} onClick={handleCopyURL}>
                  <AiOutlineShareAlt size={34} />
                </div>
              </div>
              <div className="grid items-center justify-start gap-4">
                {info.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-start items-center gap-3 text-lg"
                  >
                    <div className="font-semibold">{item?.name} :</div>
                    <div className="text-gray-300">{item?.value}</div>
                  </div>
                ))}
              </div>
              {oneProduct?.color?.length !== 0 && (
                <div className="flex items-center gap-4 mt-2">
                  <div className="font-semibold bg-[black]mb-2">Colors :</div>
                  <div className="flex justify-start items-center gap-3">
                    {oneProduct?.color?.map((item, i) => (
                      <div key={i} className="">
                        <div
                          className={`rounded-full`}
                          style={{
                            background: item?.title,
                            width: '20px',
                            height: '20px',
                            margin: '0 auto',
                          }}
                        ></div>
                        <div>{item?.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid">
                <div className="sm:flex grid grid-cols-2 gap-2 items-center justify-start my-6 relative sm:order-1 order-2">
                  <button
                    className="btn bg-white text-black hover:bg-black  hover:text-white disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={quantity > 0}
                    onClick={handleAddingToCart}
                  >
                    <TbShoppingCartPlus className="cart-svg" size={28} />
                    {quantity > 0 ? 'Added' : 'Add to Cart'}
                  </button>
                  <button
                    className="btn bg-white text-black hover:bg-black hover:text-white sm:order-2 order-3 sm:text-[14px] text-[12px]"
                    onClick={handleAddingToWishlist}
                  >
                    {/* <AiFillHeart color="white" size={28} /> Add to WishList */}
                    {isWishlist ? (
                      <AiFillHeart color="#ff4040" size={34} />
                    ) : (
                      <AiOutlineHeart className="cart-svg" size={28} />
                    )}
                    {isWishlist ? 'WishListed' : 'Add to WishList'}
                  </button>
                  <button
                    className="btn bg-white text-black hover:bg-black  hover:text-white"
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </button>
                </div>
                {quantity !== 0 && (
                  <div className="text-center flex items-center justify-start gap-3 text-lg font-bold sm:mb-4 -mb-1 sm:mt-0 mt-3 ml-1 sm:order-2 order-1">
                    <button
                      className="c-btn"
                      onClick={handleAddingToExistingCart}
                    >
                      +
                    </button>
                    <div>{quantity}</div>
                    <button
                      className="c-btn"
                      onClick={handleRemoveFromExistingCart}
                    >
                      -
                    </button>
                  </div>
                )}
              </div>
              {/* <button className="text-xl font-semibold flex gap-3">
              <FaCodeCompare size={23} /> Compare Product
            </button> */}
              <div className="grid justify-start items-center my-4">
                <div className="font-semibold text-lg">
                  Shipping & Returns :
                </div>
                <div className="text-lg">
                  Free shipping and returns available on all orders! We ship all
                  US domestic orders within{' '}
                  <span className="font-semibold text-md">
                    5-10 business days!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full my-3 h-[1px] bg-gray-600"></div>
        <div>
          <div className="text-left inline-block mb-3">
            <h1 className="text-2xl">Description</h1>
            <div className="w-[70%] h-1 rounded-md bg-white mt-1"></div>
          </div>
          <div>
            {oneProduct?.description} Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quod nulla dolor consequatur perferendis odio,
            delectus non ab, enim repellendus quaerat quasi.
          </div>
        </div>
        <div className="w-full my-3 h-[1px] bg-gray-600"></div>
        <div className="my-3">
          <div className="text-left inline-block mb-6">
            <h1 className="text-2xl">Reviews and Ratings</h1>
            <div className="w-[70%] h-1 rounded-md bg-white mt-1"></div>
          </div>
          <div className="text-xl mb-1">Total Customers Review</div>
          <div className="flex items-start justify-start gap-2">
            <Ratings item={oneProduct?.totalRating} color={'pink'} />{' '}
            <div className="text-white mb-1">{oneProduct?.totalRating}</div>
            <div>{`( ${oneProduct?.ratings?.length} Reviews )`}</div>
          </div>
          <GiveRatings
            prodId={oneProduct?._id}
            setRatings={setRatings}
            ratings={ratings}
          />
          <div className="grid gap-5 mt-10">
            <h2 className="text-xl mb-1">All Customers Review</h2>
            {ratings?.map((item, i) => (
              <div className="grid gap-1" key={i}>
                <div className="flex justify-start items-start gap-2">
                  <div>
                    {' '}
                    <Ratings item={item?.star} size={18} color={'pink'} />
                  </div>
                  <div className="font-semibold -mt-[2px]">
                    {item?.postedBy?.firstName} {item?.postedBy?.lastName}
                  </div>
                </div>
                <div className="mt-1">
                  {item?.comment ? item?.comment : '-'}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center -mb-[40px]">
            <div className="text-left inline-block mt-10">
              <h1 className="md:text-5xl text-3xl">Other Latest Products</h1>
              <div className="w-[70%] h-1 rounded-md bg-white mt-1"></div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default OneProduct
