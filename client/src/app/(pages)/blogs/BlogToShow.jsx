'use client'

import BlogCard from '@/components/BlogCard'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { MdOutlineCategory } from 'react-icons/md'
import { PiCursorTextFill } from 'react-icons/pi'

const BlogToShow = ({ blogs, categories }) => {
  const [category, setCategory] = useState(null)
  const [isFindByCategories, setIsFindByCategories] = useState(false)
  //   console.log(category)

  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setIsSmallScreen(true)
      } else {
        setIsSmallScreen(false)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (category !== null) {
    blogs = blogs.filter((item) => item?.category === category)
  }

  const handleIsFindByCategories = () => {
    setIsFindByCategories((prev) => !prev)
  }

  return (
    <div className="grid items-around text-white justify-center xl:pt-44 pt-24 pb-10 gap-10">
      <div className="mx-auto text-center inline-block">
        <h1 className="md:text-5xl sm:text-4xl text-3xl">Blogs And Articles</h1>
        <div className="w-[70%] h-1 rounded-md bg-white mt-3"></div>
      </div>
      <div className="xl:flex grid justify-around items-start">
        {isSmallScreen && (
          <div className="md:mx-12 mx-2 mb-2 font-bold sm:text-2xl text-xl">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleIsFindByCategories}
            >
              <MdOutlineCategory size={23} color="white" /> Find By Categories
            </div>
          </div>
        )}
        <div
          className={`sort-by-categories overflow-y-scroll ${
            isFindByCategories ? 'left-0' : '-left-[100%]'
          }`}
        >
          {isFindByCategories && (
            <div className="absolute top-4 right-4">
              <AiOutlineClose
                size={30}
                className="cursor-pointer"
                color="white"
                onClick={handleIsFindByCategories}
              />
            </div>
          )}

          <h2 className="text-2xl font-semibold mb-5">Find By Categories</h2>
          <div className="grid items-center justify-left gap-2 h-[550px] overflow-y-scroll">
            <div
              className="py-1 pl-1 grid justify-start items-center gap-3 cursor-pointer"
              onClick={() => setCategory(null)}
            >
              All
              <div className="w-full h-[1px] bg-white"></div>
            </div>
            {categories?.map((item, i) => {
              return (
                <div
                  key={i}
                  className="py-1 pl-1 grid justify-start items-center gap-3 cursor-pointer"
                  onClick={() => {
                    if (category === item?.title) {
                      setCategory(null)
                    } else {
                      setCategory(item?.title)
                    }
                  }}
                >
                  {item?.title?.length >= 12 ? (
                    <>{item?.title?.substring(0, 12)}...</>
                  ) : (
                    <>{item?.title}</>
                  )}
                  <div className="w-full h-[1px] bg-white"></div>
                </div>
              )
            })}
          </div>
        </div>
        <div>
          {blogs?.length !== 0 ? (
            <div className="grid md:grid-cols-3 grid-cols-2 text-white md:mx-10 mx-2 mt-4 gap-x-4">
              {blogs?.map((item, i) => {
                return <BlogCard item={item} key={i} />
              })}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 grid-cols-1">
              <div></div>
              <div>
                <Image
                  src={'/images/no-results.png'}
                  height={600}
                  width={600}
                  alt="no-results"
                  className="mx-auto"
                />
                <div></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogToShow
