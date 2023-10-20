'use client'

import { createColor } from '@/api/othersApi'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const AddingColor = () => {
  const [value, setValue] = useState('')

  const { token } = useSelector((state) => state?.user)

  const sendData = async (e) => {
    e.preventDefault()
    await createColor({ title: value }, token)
    setValue('')
  }

  return (
    <form className="grid items-center justify-center h-[50vh]">
      <div>
        <label htmlFor="name">
          <h2 className="text-xl font-bold">Add A New Color</h2>
        </label>
        <input
          type="text"
          id="name"
          placeholder="Ex: Pink"
          className="py-2 px-5 font-semibold text-xl mb-3 text-black text-md outline-none block md:w-[450px] w-[290px] p-2.5 bg-[#9ebcff] placeholder:text-gray-700 placeholder:font-normal placeholder:text-md placeholder:italic rounded-sm my-5"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <p
          id="helper-text-explanation"
          className="mt-2 text-md text-gray-500 dark:text-gray-400"
        >
          This will be added to the Color List.
        </p>
        <button
          type="submit"
          className="btn bg-white text-black mt-6 mb-[1rem] block w-full mx-auto text-2xl font-semibold py-2 hover:bg-black hover:text-white transition-all duration-300 border border-white rounded-full"
          onClick={sendData}
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default AddingColor
