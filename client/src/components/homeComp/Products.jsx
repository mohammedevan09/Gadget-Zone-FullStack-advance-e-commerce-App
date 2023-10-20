'use client'

import { useState, useEffect } from 'react'
import ProductCard from '../ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { getCart, handleRefresh } from '@/api/userApi'
import { getWishlist } from '@/api/productApi'

import Titles from '../Titles'
import Link from 'next/link'
import { setCart, setToken } from '@/store/reducers/userReducer'

const Products = ({ title, products, oneProductPage }) => {
  const [productsToShow, setProductsToShow] = useState(8)
  const [carts, setCarts] = useState([])
  const [wishlist, setWishlist] = useState([])

  // const [actualProduct, setActualProduct] = useState([])

  // useEffect(() => {
  //   setActualProduct(actualProduct)
  // }, [products])

  const dispatch = useDispatch()

  const { userInfo, token } = useSelector((state) => state?.user)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1280) {
        setProductsToShow(6)
      } else {
        setProductsToShow(8)
      }
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const fetchCartItems = async () => {
      if (userInfo && token) {
        const cartItems = await getCart(userInfo?._id)
        setCarts(cartItems?.cart)
        dispatch(setCart(cartItems?.cart?.length))
        const wishListItems = await getWishlist(userInfo?._id)
        setWishlist(wishListItems?.wishlist)
      } else {
        dispatch(setCart(0))
      }
    }
    fetchCartItems()
  }, [userInfo, token, dispatch])

  return (
    <div className="sm:mt-10 mt-5">
      {!oneProductPage && (
        <Titles title={title || 'Latest Products'} line={'282px'} />
      )}
      <div className="flex justify-center items-center lg:mt-10 mt-5 w-full">
        <div
          className={`grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 md:justify-around justify-between items-center w-full text-white 2xl:gap-[7rem] md:gap-[2rem] gap-[2px] md:mx-10 mx-2`}
        >
          {products?.slice(0, productsToShow)?.map((item, i) => {
            const isWishListed = wishlist?.find(
              (list) => list?._id === item?._id
            )
            return (
              <ProductCard
                item={item}
                key={i}
                cartItem={carts}
                wishlist={isWishListed ? isWishListed : null}
              />
            )
          })}
        </div>
      </div>
      <Link
        href={'/store'}
        className="btn md:bg-white gradient-text text-black 2xl:mt-[3.5rem] mt-[1.5rem] mb-[1rem] flex 2xl:w-[15rem] w-[11rem] mx-auto text-lg font-semibold hover:bg-black hover:text-white"
      >
        See More
      </Link>
    </div>
  )
}

export default Products
