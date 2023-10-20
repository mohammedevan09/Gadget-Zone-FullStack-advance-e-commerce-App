'use client'

import { adminLogin } from '@/api/userApi'
import { setToken, setUsers } from '@/store/reducers/userReducer'
import { redirect, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

const Page = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const { userInfo, token } = useSelector((state) => state?.user)

  useEffect(() => {
    if (userInfo && token) {
      redirect('/dashboard')
    }
  }, [userInfo, token])

  const [forget, setForget] = useState(false)

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

  return (
    <div className="h-screen sm:w-screen w-[87vw] flex items-center justify-center mx-auto">
      <div className="grid items-around text-black bg-white justify-center xl:p-10 md:p-5 p-3 rounded-md">
        {!forget ? (
          <>
            <SignUp
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
              isValid={isValid}
              dispatch={dispatch}
              router={router}
            />
            {/* <span
              id="helper-text-explanation"
              className="mt-2 text-md text-gray-700 dark:text-gray-700 flex gap-1 text-center mx-auto"
            >
              Forgot your password?{' '}
              <div
                className="font-medium text-blue-600 hover:underline dark:text-blue-500 cursor-pointer"
                onClick={() => setForget((prev) => !prev)}
              >
                Reset.
              </div>
            </span> */}

            <div className="grid justify-center items-center ml-2 border-2 border-black p-2 rounded-xl">
              <span className="text-lg font-bold">
                Try this email and password for demo-
              </span>
              <div className="font-semibold">Email - admin@gmail.com</div>
              <div className="font-semibold">password - 123456</div>
            </div>
          </>
        ) : (
          <ForgetPassword />
        )}
      </div>
    </div>
  )
}

const SignUp = ({
  register,
  handleSubmit,
  errors,
  isValid,
  dispatch,
  router,
}) => {
  const handleClick = (formData) => {
    if (isValid) {
      adminLogin(formData)
        .then((data) => {
          dispatch(setUsers(data))
          dispatch(setToken(data?.token))
          toast.success('Logged in successfully!')
          router.push('/')
        })
        .catch((err) => {
          toast.error('Logged in failed')
          console.log(err)
        })
    }
  }

  return (
    <form className="md:w-[480px] sm:w-[355px] w-[276px] mx-auto">
      <div className="w-full text-center mb-10">
        <div className="mx-auto text-center inline-block">
          <h1 className="text-5xl font-semibold">Login</h1>
          <div className="w-[60%] h-1 rounded-md bg-black mt-3"></div>
        </div>
      </div>
      <label
        htmlFor="email"
        className="block mb-1 text-md text-gray-900 font-bold"
      >
        Email
      </label>
      <input
        type="email"
        id="email"
        className="mb-1 text-black text-md outline-none block w-full py-1 border-b border-black font-semibold"
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
        className="block mb-1 text-md text-gray-900 font-bold"
      >
        Password
      </label>
      <input
        type="password"
        id="password"
        className="mb-1 text-black text-md outline-none block w-full py-1 border-b border-black font-semibold"
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
      <button
        type="submit"
        className="btn bg-black text-white mt-6 mb-[1rem] block w-full mx-auto text-2xl font-semibold py-2 hover:bg-white hover:text-black transition-all duration-300 hover:border border-black rounded-full"
        onClick={handleSubmit(handleClick)}
      >
        Login
      </button>
    </form>
  )
}

const ForgetPassword = () => {
  return (
    <form className="md:w-[480px] w-[355px]">
      <div className="w-full text-center mb-10">
        <div className="mx-auto text-center inline-block">
          <h1 className="text-5xl font-semibold">Forget Password</h1>
          <div className="w-[60%] h-1 rounded-md bg-black mt-3"></div>
        </div>
      </div>
      <label
        htmlFor="forget-pass"
        className="block mb-1 text-md text-gray-900 font-bold"
      >
        Please enter your register email to reset password!
      </label>
      <input
        type="email"
        id="forget-pass"
        className="mb-3 text-black text-md outline-none block w-full p-2.5  border-b border-black font-semibold"
      />

      <button
        type="submit"
        className="btn bg-black text-white mt-6 mb-[1rem] block w-full mx-auto text-2xl font-semibold py-2 hover:bg-white hover:text-black transition-all duration-300 border border-black rounded-full"
      >
        Submit
      </button>
      {/* <ResetPassword /> */}
    </form>
  )
}

const ResetPassword = () => {
  return (
    <>
      <div className="w-full text-center mb-10">
        <div className="mx-auto text-center inline-block">
          <h1 className="text-5xl font-semibold">Reset Password</h1>
          <div className="w-[60%] h-1 rounded-md bg-black mt-3"></div>
        </div>
      </div>
      <label
        htmlFor="new-pass"
        className="block mb-1 text-md text-gray-900 font-bold"
      >
        New Password
      </label>
      <input
        type="email"
        id="new-pass"
        className="mb-3 text-black text-md outline-none block w-full p-2.5  border-b border-black font-semibold"
      />
      <label
        htmlFor="confirm-pass"
        className="block mb-1 text-md text-gray-900 font-bold"
      >
        Confirm Password
      </label>
      <input
        type="email"
        id="confirm-pass"
        className="mb-3 text-black text-md outline-none block w-full p-2.5  border-b border-black font-semibold"
      />

      <button
        type="submit"
        className="btn bg-black text-white mt-6 mb-[1rem] block w-full mx-auto text-2xl font-semibold py-2 hover:bg-white hover:text-black transition-all duration-300 border border-black rounded-full"
      >
        Reset
      </button>
    </>
  )
}

export default Page
