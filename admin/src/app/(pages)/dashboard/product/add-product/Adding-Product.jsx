'use client'

import { createProduct, uploadProductImage } from '@/api/productApi'
import ReactSelect from '@/components/ReactSelect'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { BsFillImageFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'

const AddingProduct = ({ category, brands }) => {
  const [cat, setCat] = useState('')
  const [brand, setBrand] = useState('')
  const [images, setImages] = useState([])
  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState('')

  const addTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag])
      setTagInput('')
    }
  }

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const { token, userInfo } = useSelector((state) => state?.user)

  const onImageChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0]
      setImages([...images, img])
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
      price: '',
      quantity: '',
    },
    mode: 'onChange',
  })

  const sendData = async (data) => {
    if (isValid) {
      switch (true) {
        case cat === '':
          toast.error('Please select a category!')
          break

        // case brand === '':
        //   toast.error('Please select a brand!')
        //   break

        case images.length === 0:
          toast.error('Please select an image!')
          break

        case tags.length === 0:
          toast.error('Please add a tag!')
          break

        default:
          // console.log(cat, brand, images, tags, isValid)
          const newData = await createProduct(
            { ...data, category: cat?.value, brand: brand?.value, tags: tags },
            token
          )

          const formData = new FormData()

          images.forEach((image) => {
            formData.append(`images`, image)
          })
          // console.log(formData)

          await uploadProductImage(newData?._id, formData, token)
          break
      }
    }
  }
  return (
    <div>
      <form className="grid items-center md:mx-10 mx-2">
        <div className="w-full">
          <label htmlFor="title">
            <h2 className="mt-5 text-xl font-bold">Title</h2>
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
            })}
          />
          {errors.title?.message && (
            <p className="text-red-500 text-sm mt-1 mb-3 font-bold">
              {errors.title?.message}
            </p>
          )}

          <label htmlFor="description">
            <h2 className="mt-5 text-xl font-bold">Product Description</h2>
          </label>
          <textarea
            type="text"
            id="description"
            placeholder="This Product quality is..."
            className="py-2 px-5 text-xl mb-1 text-black text-md outline-none w-full p-2.5 bg-[#9ebcff] placeholder:text-gray-700 placeholder:font-normal placeholder:text-md placeholder:italic rounded-sm my-1 h-[300px]"
            {...register('description', {
              required: {
                value: true,
                message: 'Description is required',
              },
            })}
          />
          {errors.description?.message && (
            <p className="text-red-500 text-sm mt-1 mb-3 font-bold">
              {errors.description?.message}
            </p>
          )}

          <div className="my-10 flex justify-center">
            <ReactSelect
              data={category}
              setCat={setCat}
              cat={cat}
              placeholder={'Category'}
            />
          </div>

          <div className="my-10 flex justify-center">
            <ReactSelect
              data={brands}
              setCat={setBrand}
              cat={brand}
              placeholder={'Brand'}
            />
          </div>

          <label htmlFor="price">
            <h2 className="mt-5 text-xl font-bold">Product Price</h2>
          </label>
          <input
            type="number"
            id="price"
            placeholder="EX: 500"
            className="py-2 px-5 font-semibold text-xl mb-1 text-black text-md outline-none w-full p-2.5 bg-[#9ebcff] placeholder:text-gray-700 placeholder:font-normal placeholder:text-md placeholder:italic rounded-sm my-1"
            {...register('price', {
              required: {
                value: true,
                message: 'price is required',
              },
            })}
          />
          {errors?.price?.message && (
            <p className="text-red-500 text-sm mt-1 mb-3 font-bold">
              {errors?.price?.message}
            </p>
          )}

          <label htmlFor="quantity">
            <h2 className="mt-5 text-xl font-bold">Product Quantity</h2>
          </label>
          <input
            type="number"
            id="quantity"
            placeholder="EX: 40"
            className="py-2 px-5 font-semibold text-xl mb-1 text-black text-md outline-none w-full p-2.5 bg-[#9ebcff] placeholder:text-gray-700 placeholder:font-normal placeholder:text-md placeholder:italic rounded-sm my-1"
            {...register('quantity', {
              required: {
                value: true,
                message: 'quantity is required',
              },
            })}
          />
          {errors?.quantity?.message && (
            <p className="text-red-500 text-sm mt-1 mb-3 font-bold">
              {errors?.quantity?.message}
            </p>
          )}

          <label htmlFor="tags">
            <h2 className="mt-5 text-xl font-bold">Product Tags</h2>
          </label>
          <div className="flex bg-black">
            <input
              type="text"
              id="tags"
              placeholder="Add tags..."
              className="py-2 px-5 font-semibold text-xl mb-1 text-black text-md outline-none w-full p-2.5 bg-[#9ebcff] placeholder:text-gray-700 placeholder:font-normal placeholder:text-md placeholder:italic rounded-sm my-1"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addTag(e.target.value)
                  e.target.value = ''
                }
              }}
            />
            <button
              className="bg-black overflow-hidden w-[120px] font-bold"
              onClick={(e) => {
                e.preventDefault()
                addTag(tagInput)
              }}
            >
              Add Tag
            </button>
          </div>
          <div className="tags-container">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="tag bg-fuchsia-400 px-2 py-1 inline-block rounded-md text-black font-bold mr-3"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 remove-tag"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>

          {[...Array(4)].map((_, i) => {
            return (
              <label
                htmlFor={`image${i}`}
                key={i}
                className="py-2 px-4 cursor-pointer"
              >
                <div className="flex justify-center items-center">
                  {images[i] ? (
                    <div className="previewImage relative">
                      <AiOutlineCloseCircle
                        onClick={() => {
                          const updatedImages = [...images]
                          updatedImages.splice(i, 1)
                          setImages(updatedImages)
                        }}
                        className="absolute top-2 right-2 red-important"
                        size={28}
                      />
                      <img
                        src={URL.createObjectURL(images[i])}
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
            )
          })}

          {[...Array(5)].map((_, i) => (
            <div className="m-1 hidden" key={i}>
              <input
                type="file"
                name="myImage"
                id={`image${i}`}
                onChange={onImageChange}
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="btn bg-white text-black mt-6 mb-[1rem] w-full text-2xl font-semibold py-2 hover:bg-black hover:text-white transition-all duration-300 border border-white rounded-md"
          onClick={handleSubmit(sendData)}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddingProduct
