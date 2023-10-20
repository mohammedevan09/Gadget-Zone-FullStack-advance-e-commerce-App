'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

const Login = () => {
  const [forget, setForget] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="grid items-around text-black bg-white justify-center  p-10 rounded-md">
        {!forget ? (
          <>
            <SignUp />
            <span
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
            </span>
          </>
        ) : (
          <ForgetPassword />
        )}
      </div>
    </div>
  )
}

const SignUp = () => {
  return (
    <form className="md:w-[480px] w-[355px]">
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
        className="mb-3 text-black text-md outline-none block w-full p-2.5  border-b border-black font-semibold"
        placeholder="name@email.com"
      />
      <label
        htmlFor="password"
        className="block mb-1 text-md text-gray-900 font-bold"
      >
        Password
      </label>
      <input
        type="password"
        id="password"
        className="mb-3 text-black text-md outline-none block w-full p-2.5 border-b border-black font-semibold"
        placeholder="Enter correct password"
      />

      <button
        type="submit"
        className="btn bg-black text-white mt-6 mb-[1rem] block w-full mx-auto text-2xl font-semibold py-2 hover:bg-white hover:text-black transition-all duration-300 hover:border border-black rounded-full"
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

export default Login
