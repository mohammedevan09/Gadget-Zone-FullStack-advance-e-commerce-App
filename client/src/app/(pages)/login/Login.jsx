'use client'

import { loginUser } from '@/api/userApi'
import { setToken, setUsers } from '@/store/reducers/userReducer'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const { userInfo, token } = useSelector((state) => state?.user)

  useEffect(() => {
    if (userInfo && token) {
      router.push('/')
    }
  }, [userInfo, token, router])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const handleClick = async (formData) => {
    // console.log(formData, isValid)
    if (isValid) {
      try {
        const data = await loginUser(formData)
        dispatch(setUsers(data))
        dispatch(setToken(data?.token))
        router.push('/')
        toast.success('Logged in successfully!')
      } catch (err) {
        toast.error('Logged in failed')
        console.log(err)
      }
    }
  }

  return (
    <div className="grid items-around text-white justify-center xl:pt-44 pt-24 pb-10 gap-10 sm:px-0 px-3">
      <form action="" className="md:w-[480px] w-[355px]">
        <div className="w-full text-center mb-10">
          <div className="mx-auto text-center inline-block">
            <h1 className="md:text-5xl sm:text-4xl text-3xl">Sign in</h1>
            <div className="w-[70%] h-1 rounded-md bg-white mt-3"></div>
          </div>
        </div>
        <label
          htmlFor="email"
          className="block mb-1 text-md font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="mb-3 text-white text-md outline-none block w-full p-2.5 bg-[black] border-b border-white"
          placeholder="name@email.com"
          {...register('email', {
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Enter a valid email',
            },
            required: {
              value: true,
              message: 'Email is required',
            },
          })}
        />
        {errors.email?.message && (
          <p className="text-red-500 text-sm mt-1 mb-3 font-bold">
            {errors.email?.message}
          </p>
        )}
        <label
          htmlFor="password"
          className="block mb-1 text-md font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="mb-3 text-white text-md outline-none block w-full p-2.5 bg-[black] border-b border-white"
          placeholder="Enter correct password"
          {...register('password', {
            minLength: {
              value: 6,
              message: 'Minimum Length must be 6.',
            },
            required: {
              value: true,
              message: 'Email is required',
            },
          })}
        />
        {errors.password?.message && (
          <p className="text-red-500 text-sm mt-1 mb-3 font-bold">
            {errors.password?.message}
          </p>
        )}

        <p
          id="helper-text-explanation"
          className="mt-2 text-md text-gray-500 dark:text-gray-400"
        >
          Do not have an Account?{' '}
          <Link
            href="/register"
            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Sign up.
          </Link>
        </p>
        <button
          type="submit"
          className="btn bg-white text-black mt-4 mb-[1rem] block w-full mx-auto text-lg font-semibold hover:bg-black hover:text-white"
          onClick={handleSubmit(handleClick)}
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
