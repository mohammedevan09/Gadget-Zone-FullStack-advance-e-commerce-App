'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  AiOutlineHeart,
  AiOutlineEye,
  AiOutlineShareAlt,
  AiFillHeart,
} from 'react-icons/ai'
import { TbShoppingCartPlus } from 'react-icons/tb'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import Ratings from './Ratings.jsx'
import { addToCart, handleRefresh, removeFromCart } from '@/api/userApi.jsx'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { addToWishList } from '@/api/productApi.jsx'
import { incCart, descCart, setToken } from '@/store/reducers/userReducer.jsx'

const ProductCard = ({ item, cartItem = [], wishlist }) => {
  const [productInCart, setProductInCart] = useState(false)
  const [showLinks, setShowLinks] = useState(false)
  const [isWishlist, setIsWishlist] = useState(wishlist)

  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    setProductInCart(cartItem.find((cart) => cart?.product?._id === item?._id))
  }, [cartItem, item?._id])

  const [actualQuantity, setActualQuantity] = useState(productInCart?.quantity)

  useEffect(() => {
    setIsWishlist(wishlist)
  }, [wishlist])

  useEffect(() => {
    setActualQuantity(productInCart?.quantity)
  }, [productInCart?.quantity])

  const { userInfo, token } = useSelector((state) => state?.user)

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

  const onMouseEnter = () => setShowLinks(true)
  const onMouseLeave = () => setShowLinks(false)

  const handleAddingToCart = (e) => {
    e.preventDefault()
    if (token === null) {
      toast.error('You need to Login first!')
      return router.push('/login')
    }

    setProductInCart(true)
    addToCart({ prodId: item?._id }, token, handleTokenRefresh).then(() => {
      toast.success('Added to the cart!')
      dispatch(incCart())
    })
    setActualQuantity(1)
  }

  const handleAddingToExistingCart = (e) => {
    e.preventDefault()
    setActualQuantity((count) => count + 1)
    addToCart({ prodId: item?._id }, token, handleTokenRefresh).then(
      (value) => {
        // toast.success('Added to the cart!')
      }
    )
  }

  const handleRemoveFromExistingCart = (e) => {
    e.preventDefault()
    if (actualQuantity > 0) {
      setActualQuantity((count) => count - 1)
      removeFromCart({ prodId: item?._id }, token, handleTokenRefresh).then(
        () => {
          if (actualQuantity === 1) {
            setProductInCart(false)
            toast.success('Removed from the cart!')
            dispatch(descCart())
          }
        }
      )
    }
  }

  const handleAddingToWishlist = () => {
    if (token === null) {
      toast.error('You need to Login first!')
      return router.push('/login')
    }

    if (!isWishlist) {
      setIsWishlist(true)
      addToWishList({ prodId: item?._id }, token, handleTokenRefresh).then(
        () => {
          toast.success('Added to the wishlist')
        }
      )
    } else {
      setIsWishlist(null)
      addToWishList({ prodId: item?._id }, token, handleTokenRefresh).then(
        () => {
          toast.success('Removed from the wishlist')
        }
      )
    }
  }

  const handleCopyURL = (e) => {
    e.stopPropagation()
    const currentURL = window.location.href
    navigator.clipboard.writeText(currentURL + `/${item?._id}`)
    toast.success('URL copied to clipboard!')
  }

  const handleIconShoppingCart = (e) => {
    e.stopPropagation()
    if (token === null) {
      toast.error('You need to Login first!')
      return router.push('/login')
    }

    if (productInCart) {
      router?.push(`/cart/?userId=${userInfo?._id}`)
    } else {
      addToCart({ prodId: item?._id }, token, handleTokenRefresh).then(() => {
        toast.success(`You're almost there!`)
        dispatch(incCart())
        router?.push(`/cart/?userId=${userInfo?._id}`)
      })
    }
  }

  const [iconSize, setIconSize] = useState(0)
  const [titleLength, setTitleLength] = useState(22)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIconSize(10)
        setTitleLength(18)
      } else {
        setIconSize(0)
        setTitleLength(22)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <div className="card 2xl:w-96 sm:w-72 w-[10.5rem] bg-base-100 shadow-xl mx-auto">
        <div className="w-full rounded-none">
          <div
            className="flex flex-col items-center justify-center w-full relative cursor-pointer overflow-hidden"
            onMouseOver={onMouseEnter}
            onMouseOut={onMouseLeave}
            onClick={() => router.push(`/store/${item?._id}`)}
          >
            <Image
              src={item?.images[0]?.url}
              alt="category"
              width={1000} // Adjust the width and height as needed
              height={1000}
              quality={50}
              className="sm:h-72 h-44 w-full object-cover"
            />
            <div
              className="absolute top-3 right-3 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                handleAddingToWishlist()
              }}
            >
              {isWishlist ? (
                <AiFillHeart color="#ff4040" size={34 - iconSize} />
              ) : (
                <AiOutlineHeart size={34 - iconSize} />
              )}
            </div>
            <div
              className={`absolute grid self-end gap-4 transition-all duration-300 ${
                showLinks ? 'right-4' : '-right-10'
              }`}
            >
              <AiOutlineShareAlt size={28 - iconSize} onClick={handleCopyURL} />
              <AiOutlineEye
                size={28 - iconSize}
                onClick={(e) => {
                  e.stopPropagation()
                  router.push(`/store/${item?._id}`)
                }}
              />
              <HiOutlineShoppingCart
                size={28 - iconSize}
                onClick={handleIconShoppingCart}
              />
            </div>
          </div>
        </div>
        <div className="card-body border-b border-white px-[2px] py-3 mb-5 2xl:gap-[0.5rem] gap-[0.3rem]">
          <div className="card-title break-word 2xl:text-[20px] text-[15px] sm:flex grid">
            {item?.title?.length >= titleLength ? (
              <>{item?.title?.substring(0, titleLength)}...</>
            ) : (
              <>{item?.title}</>
            )}
            {/* {getDaysAgo(item?.createdAt) < 100 && ( */}
            <div
              className={`badge badge-secondary sm:mb-0 mb-1 text-[11px] ${
                isNewProduct(item?.createdAt)
                  ? 'bg-fuchsia-600 border-none'
                  : 'bg-black'
              }`}
            >
              {isNewProduct(item?.createdAt)
                ? 'New'
                : `${getDaysAgo(item?.createdAt)} days ago`}
            </div>
            {/* )} */}
          </div>
          <div className="break-word 2xl:text-[16px] text-[13px] sm:inline-block hidden">
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
          </div>
          <div className="card-actions justify-start">
            {item?.tags?.map((tag, i) => (
              <div className="badge bg-indigo-600 border-none" key={i}>
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </div>
            ))}
          </div>
          <div className="card-actions justify-between items-end grid relative">
            <div className="text-blue-400 text-lg">
              $ {item?.price.toFixed(2)}
            </div>

            <div className="flex items-center justify-start sm:gap-2 gap-[3px]">
              <Ratings item={item?.totalRating} size={25 - iconSize} />{' '}
              <div className="text-white">{item?.totalRating}</div>
              <div>{`(${item?.ratings?.length})`}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="sm:flex grid gap-2 items-center justify-center">
                <button
                  className="prod-btn-style py-[5px] sm:px-[12px] px-[8px] font-bold disabled:opacity-60 disabled:border-[2px]"
                  onClick={handleAddingToCart}
                  disabled={productInCart}
                >
                  <TbShoppingCartPlus
                    className="cart-svg"
                    color={'black'}
                    size={28 - iconSize}
                  />{' '}
                  {productInCart ? 'Added' : 'Add to Cart'}
                </button>
                <button
                  className="prod-btn-style sm:py-[8px] py-[5px] px-[8px] font-bold"
                  onClick={handleIconShoppingCart}
                >
                  Buy Now
                </button>
              </div>
              <div className={`absolute 2xl:right-3 right-1 bottom-1`}>
                {actualQuantity && actualQuantity !== 0 ? (
                  <div className="text-center grid items-center justify-center gap-3 text-lg font-bold mb-4">
                    <button
                      className="c-btn"
                      onClick={handleAddingToExistingCart}
                    >
                      +
                    </button>
                    <div>{actualQuantity}</div>
                    <button
                      className="c-btn"
                      onClick={handleRemoveFromExistingCart}
                    >
                      -
                    </button>
                  </div>
                ) : (
                  <></>
                )}
                <AiOutlineShareAlt
                  size={34 - iconSize}
                  onClick={handleCopyURL}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductCard
