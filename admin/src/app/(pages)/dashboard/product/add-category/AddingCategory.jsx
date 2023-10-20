'use client'

import { createCategory, uploadCategoryImage } from '@/api/categoryApi'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { BsFillImageFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'

const AddingCategory = () => {
  const [image, setImage] = useState(null)

  const { token } = useSelector((state) => state?.user)

  const onImageChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0]
      setImage(img)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
    mode: 'onChange',
  })

  // console.log(image)

  const sendData = async (data) => {
    if (image === null) {
      return toast.error('Please select an Image!')
    }

    if (isValid && image !== null) {
      const newData = await createCategory(data, token)

      const formData = new FormData()
      formData.append('images', image)

      await uploadCategoryImage(newData?._id, formData, token)
    }
  }
  return (
    <>
      <div className="my-10"></div>
      <form className="grid items-center md:mx-10 mx-2">
        <div className="w-full">
          <label htmlFor="title" className="mt-3">
            <h2 className="text-xl font-bold">Title</h2>
          </label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            className="py-2 px-5 font-semibold text-xl mb-1 text-black text-md outline-none w-full p-2.5 bg-[#9ebcff] placeholder:text-gray-700 placeholder:font-normal placeholder:text-md placeholder:italic rounded-sm my-1"
            {...register('title', {
              required: {
                value: true,
                message: 'Title is required',
              },
              maxLength: {
                value: 20,
                message: 'Title Cannot be more than 20 letters!',
              },
            })}
          />
          {errors.title?.message && (
            <p className="text-red-500 text-sm mt-1 mb-3 font-bold">
              {errors.title?.message}
            </p>
          )}

          <label htmlFor="description">
            <h2 className="text-xl font-bold mt-3">
              Product Category Description
            </h2>
          </label>
          <textarea
            type="text"
            id="description"
            placeholder="This blog is about..."
            className="py-2 px-5 text-xl mb-1 text-black text-md outline-none w-full p-2.5 bg-[#9ebcff] placeholder:text-gray-700 placeholder:font-normal placeholder:text-md placeholder:italic rounded-sm my-1 h-[300px]"
            {...register('description', {
              required: {
                value: true,
                message: 'Description is required',
              },
              maxLength: {
                value: 90,
                message: 'Description Cannot be more than 90 letters!',
              },
            })}
          />
          {errors.description?.message && (
            <p className="text-red-500 text-sm mt-1 mb-3 font-bold">
              {errors.description?.message}
            </p>
          )}

          <label htmlFor="image" className="py-2 px-4 cursor mt-3">
            {' '}
            <div className="flex justify-center items-center">
              {image ? (
                <div className="previewImage relative">
                  <AiOutlineCloseCircle
                    onClick={() => setImage(null)}
                    className="absolute top-2 right-2 red-important"
                    size={28}
                  />
                  <img
                    src={URL.createObjectURL(image)}
                    alt="images"
                    className="object-cover"
                  />
                </div>
              ) : (
                <>
                  <div className="w-full h-[200px] flex justify-center items-center bg-black border border-white">
                    <BsFillImageFill size={28} className="pr-2" /> Select an
                    image
                  </div>
                </>
              )}
            </div>
          </label>
          <div className="m-1 hidden">
            <input
              type="file"
              name="myImage"
              id="image"
              onChange={onImageChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn bg-white text-black mt-6 mb-[1rem] w-full mx-auto text-2xl font-semibold py-2 hover:bg-black hover:text-white transition-all duration-300 border border-white rounded-md"
          onClick={handleSubmit(sendData)}
        >
          Submit
        </button>
      </form>
      <div className="my-32"></div>
    </>
  )
}

export default AddingCategory
