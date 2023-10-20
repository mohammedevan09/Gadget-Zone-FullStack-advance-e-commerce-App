'use client'

import { createUser } from '@/api/userApi'
import { setToken, setUsers } from '@/store/reducers/userReducer'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

const Register = () => {
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
    watch,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  })

  const handleClick = async (formData) => {
    // console.log(formData)
    if (isValid) {
      try {
        const data = await createUser(formData)
        dispatch(setUsers(data))
        dispatch(setToken(data?.token))
        toast.success('Registration successful!')
        router.push('/')
      } catch (err) {
        if (err.response.status === 401) {
          toast.error('User Already Exists!')
        } else {
          toast.error('Registration failed')
        }
      }
    }
  }

  const password = watch('password')
  return (
    <div className="grid items-around text-white justify-center xl:pt-44 pt-24 pb-10 gap-10 sm:px-0 px-3">
      <form>
        <div className="w-full text-center mb-10">
          <div className="mx-auto text-center inline-block">
            <h1 className="md:text-5xl sm:text-4xl text-3xl">Sign Up</h1>
            <div className="w-[70%] h-1 rounded-md bg-white mt-3"></div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-3">
          <div className="grid justify-start items-center">
            <label
              htmlFor="firstName"
              className="block mb-1 text-md font-medium text-gray-900 dark:text-white"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="text-white text-md outline-none block w-full p-2.5 bg-[black] border-b border-white"
              placeholder="Valo"
              {...register('firstName', {
                minLength: {
                  value: 3,
                  message: 'First name too short!',
                },
                required: {
                  value: true,
                  message: 'Name is required',
                },
                pattern: {
                  value: /\S+/,
                  message: 'Enter a valid name',
                },
              })}
            />
            {errors.firstName?.message && (
              <p className="text-red-500 text-sm mt-1 font-bold">
                {errors.firstName?.message}
              </p>
            )}
          </div>
          <div className="grid justify-start items-center">
            <label
              htmlFor="lastName"
              className="block mb-1 text-md font-medium text-gray-900 dark:text-white"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="text-white text-md outline-none block w-full p-2.5 bg-[black] border-b border-white"
              placeholder="Manush"
              {...register('lastName', {
                minLength: {
                  value: 3,
                  message: 'Last name too short!',
                },
                required: {
                  value: true,
                  message: 'Name is required',
                },
                pattern: {
                  value: /\S+/,
                  message: 'Enter a valid name',
                },
              })}
            />{' '}
            {errors.lastName?.message && (
              <p className="text-red-500 text-sm mt-1 font-bold">
                {errors.lastName?.message}
              </p>
            )}
          </div>
        </div>
        <label
          htmlFor="email"
          className="mt-4 block mb-1 text-md font-medium text-gray-900 dark:text-white"
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
          <p className="text-red-500 text-sm mt-1 font-bold">
            {errors.email?.message}
          </p>
        )}
        {/* {errors?.status === 400 && (
          <p className="text-red-500 text-sm mt-1 font-bold">
            {errors?.data?.message}
          </p>
        )} */}
        <label
          htmlFor="mobile"
          className="block mb-1 text-md font-medium text-gray-900 dark:text-white"
        >
          Mobile Number
        </label>
        <input
          type="number"
          id="mobile"
          className="mb-3 text-white text-md outline-none block w-full p-2.5 bg-[black] border-b border-white"
          placeholder="+00 xxxxxxxx"
          {...register('mobile', {
            required: {
              value: true,
              message: 'Phone no. is required',
            },
            minLength: {
              value: 7,
              message: 'Phone no. length must be at least 7 characters',
            },
            maxLength: {
              value: 13,
              message: 'Phone no. length must be at least 13 characters',
            },
          })}
        />
        {errors.mobile?.message && (
          <p className="text-red-500 text-sm mt-1 font-bold">
            {errors.mobile?.message}
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
          placeholder="Make it complex!"
          {...register('password', {
            required: {
              value: true,
              message: 'Password is required',
            },
            minLength: {
              value: 6,
              message: 'Password length must be at least 6 characters',
            },
          })}
        />
        {errors.password?.message && (
          <p className="text-red-500 text-sm mt-1 font-bold">
            {errors.password?.message}
          </p>
        )}
        <label
          htmlFor="confirm-password"
          className="block mb-1 text-md font-medium text-gray-900 dark:text-white"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirm-password"
          className="mb-3 text-white text-md outline-none block w-full p-2.5 bg-[black] border-b border-white"
          placeholder="Match It!"
          {...register('confirmPassword', {
            required: {
              value: true,
              message: 'Confirm password is required',
            },
            validate: (value) => {
              if (value !== password) {
                return 'Passwords do not match'
              }
            },
          })}
        />
        {errors.confirmPassword?.message && (
          <p className="text-red-500 text-sm mt-1 font-bold">
            {errors.confirmPassword?.message}
          </p>
        )}

        <p
          id="helper-text-explanation"
          className="mt-2 text-md text-gray-500 dark:text-gray-400"
        >
          Already have an Account?{' '}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Sign in.
          </Link>
          .
        </p>
        <button
          type="submit"
          className="btn bg-white text-black mt-4 mb-[1rem] block w-full text-lg font-semibold hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed  cursor-pointer"
          disabled={!isValid}
          onClick={handleSubmit(handleClick)}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Register
