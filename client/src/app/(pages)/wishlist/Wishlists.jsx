'use client'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getCart } from '@/api/userApi'
import ProductCard from '@/components/ProductCard'

const Wishlists = ({ product }) => {
  const [cart, setCart] = useState([])

  const { userInfo, token } = useSelector((state) => state?.user)

  useEffect(() => {
    const fetchCartItems = async () => {
      if (userInfo && token) {
        const cartItems = await getCart(userInfo?._id)
        setCart(cartItems?.cart)
      }
    }
    fetchCartItems()
  }, [userInfo, token])

  return (
    <>
      {product?.wishlist?.map((item, i) => {
        return (
          <ProductCard item={item} key={i} cartItem={cart} wishlist={true} />
        )
      })}
    </>
  )
}

export default Wishlists
