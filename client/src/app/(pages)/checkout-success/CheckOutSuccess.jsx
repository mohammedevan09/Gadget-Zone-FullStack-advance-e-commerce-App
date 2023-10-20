'use client'

import Image from 'next/image'
import Link from 'next/link'
import { setCart } from '@/store/reducers/userReducer'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { emptyCart } from '@/api/userApi'
import toast from 'react-hot-toast'

const CheckOutSuccess = () => {
  const dispatch = useDispatch()

  const { token } = useSelector((state) => state?.user)

  useEffect(() => {
    emptyCart(token).then(() => toast.success('Your payment is successful!'))
    dispatch(setCart(0))
  }, [dispatch, token])

  return (
    <div className="grid items-around text-white justify-center pt-44 pb-10 gap-3">
      <div className="mx-auto">
        <h1 className="md:text-5xl sm:text-4xl text-3xl">
          Payment Is Successful!
        </h1>
        <div className="w-[70%] h-1 rounded-md bg-white mt-1"></div>
      </div>
      <Image
        src={'/images/checkout-success.png'}
        height={600}
        width={600}
        alt="checkout-success"
        className="mx-auto"
      />
      <Link
        href={'/'}
        className="btn bg-white text-black mb-[1rem] w-[15rem] mx-auto text-lg font-semibold hover:bg-black hover:text-white"
      >
        Back To Home
      </Link>
    </div>
  )
}

export default CheckOutSuccess
