'use client'
import Link from 'next/link'
import CartCard from './CartCard'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTotal } from '@/store/reducers/userReducer'
import { getCart } from '@/api/userApi'
import { paymentProceed } from '@/api/paymentApi'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const CartToShow = ({ cart }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const { userInfo, total } = useSelector((state) => state?.user)

  useEffect(() => {
    const totals = cart?.reduce((acc, curr) => {
      acc += curr?.product?.price * curr.quantity
      return acc
    }, 0)
    dispatch(setTotal(totals))
  }, [dispatch, cart])

  const handleCheckout = async (e) => {
    try {
      const cartItem = await getCart(userInfo?._id)
      const data = await paymentProceed({ cartItem })
      router.push(data?.url)
    } catch (error) {
      toast.error('Checkout failed!')
      console.log(error)
    }
  }

  return (
    <div className="grid items-around text-white justify-center md:px-0 sm:px-5 px-2 xl:pt-44 pt-24 pb-10 gap-10">
      <div className="mx-auto text-center inline-block">
        <h1 className="md:text-5xl sm:text-4xl text-3xl">Your Cart</h1>
        <div className="w-[70%] h-1 rounded-md bg-white mt-3"></div>
      </div>
      <div className="grid grid-cols-4 justify-between items-center sm:text-2xl text-[15px] font-semibold">
        <div className="md:w-56 sm:w-40 w-24 text-center">Products</div>
        <div className="text-center">Prices</div>
        <div className="text-center">Quantity</div>
        <div className="text-center">Totals</div>
      </div>
      {cart?.map((item, i) => (
        <CartCard item={item} key={i} />
      ))}
      <hr />
      <div className="sm:flex grid items-end sm:justify-between justify-center">
        <div className="sm:order-1 order-2">
          <Link
            href={'/store'}
            className="btn md:bg-white gradient-text text-black mb-[1rem] sm:w-[15rem] w-full mx-auto text-lg font-semibold hover:bg-black hover:text-white"
          >
            Continue Shopping
          </Link>
        </div>
        <div className="grid items-center sm:justify-end justify-start gap-2 text-right sm:order-2 order-1">
          <div className="text-2xl text-right">
            SubTotal:{' '}
            <span className="font-semibold text-purple-500">
              $ {`${total ? total.toFixed(2) : 0}`}
            </span>
          </div>
          <p className="md:text-xl sm:text-lg text-md text-left">
            Taxes and shipping calculated at checkout
          </p>
          <div>
            <button
              className="btn bg-white text-black mb-[1rem] sm:w-[15rem] w-full mx-auto text-lg font-semibold hover:bg-black hover:text-white"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartToShow
