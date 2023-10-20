'use client'

import Titles from '../Titles'
import Link from 'next/link'
import { useEffect } from 'react'
import { useState } from 'react'
import BlogCard from '../BlogCard'

const Blogs = ({ blogs }) => {
  const [blogToShow, setProductsToShow] = useState(8)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1280) {
        setProductsToShow(6)
      } else {
        setProductsToShow(8)
      }
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <div className="sm:mt-[20px mt-[10px]]">
      <Titles title={'New Blogs'} />
      <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 md:justify-around justify-between items-center w-full text-white 2xl:gap-[rem] md:gap-[0rem] gap-[2px] md:mr-10 mr-2 xl:mx-7">
        {blogs?.slice(0, blogToShow)?.map((item, i) => (
          <BlogCard item={item} key={i} />
        ))}
      </div>
      <Link
        href={'/blogs'}
        className="btn md:bg-white gradient-text text-black 2xl:mt-[3.5rem] mt-[1.5rem] mb-[1rem] flex 2xl:w-[15rem] w-[11rem] mx-auto text-lg font-semibold hover:bg-black hover:text-white"
      >
        See More
      </Link>
    </div>
  )
}

export default Blogs
