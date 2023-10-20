'use client'

import Link from 'next/link'
import { navItems } from '../staticItem/data'
import { useEffect, useState } from 'react'
import {
  BsChevronDown,
  BsArrowRightCircle,
  BsFillArrowLeftCircleFill,
} from 'react-icons/bs'
import { CgMenuRight } from 'react-icons/cg'

import { usePathname, redirect } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useMediaQuery } from '@mui/material'

const Menu = () => {
  const pathname = usePathname()
  // console.log(pathname)
  const { userInfo, token } = useSelector((state) => state?.user)

  const findLocation = navItems.find((item) => item?.link === pathname)

  useEffect(() => {
    if (!userInfo || !token) {
      redirect('/login')
    }
    if (userInfo && token && pathname === '/') {
      redirect('/dashboard')
    }
  }, [pathname, userInfo, token])

  const matches = useMediaQuery('(min-width:1024px)')

  const isLargeScreen = useMediaQuery('(min-width:1024px)')

  const [isClosed, setIsClosed] = useState(isLargeScreen)

  useEffect(() => {
    setIsClosed(!isLargeScreen)
  }, [isLargeScreen])

  const [active, setActive] = useState(findLocation?.text)

  const handleClick = () => setIsClosed((prev) => !prev)

  return (
    <div className="flex justify-center items-start gap-2">
      <div
        className={`lg:relative absolute z-50 overflow-hidden bg-[#0c0a26] ${
          isClosed ? 'close-menu' : 'open-menu'
        }`}
      >
        <h2 className="text-2xl font-bold flex justify-center pt-5 pb-3 text-[#6fddff] gap-3 mx-4">
          Star Gadgets
          {!isClosed && !matches && (
            <BsFillArrowLeftCircleFill
              size={28}
              color="#6fddff"
              onClick={handleClick}
              className="cursor-pointer"
            />
          )}
        </h2>
        <hr className="border-[#6fddff] mx-2 " />
        <div className="overflow-y-auto h-screen mt-3">
          <div className="grid items-center justify-start mt-3 ">
            {navItems?.map((item, i) => (
              <Options
                active={active}
                setActive={setActive}
                item={item}
                key={i}
              />
            ))}
          </div>
          <div className="my-20"></div>
        </div>
      </div>
      <div
        className="py-6 pl-3 cursor-pointer absolute z-10 left-[10px]"
        onClick={handleClick}
      >
        {isClosed ? (
          <BsArrowRightCircle size={28} color="#6fddff" />
        ) : (
          <CgMenuRight size={28} color="#6fddff" />
        )}
      </div>
    </div>
  )
}

export default Menu

export const Options = ({ item, active, setActive }) => {
  const [open, setOpen] = useState(true)

  const handleClick = () => {
    setOpen((prev) => !prev)
    if (!item?.options) {
      setActive(item?.link)
    }
  }

  const optionHandleClick = (option) => {
    setActive(option)
  }
  return (
    <div className="cursor-pointer">
      {item?.options ? (
        <div
          className={`flex items-center justify-between gap-4 px-5 py-2 hover:bg-[#000b43] ${
            active !== item?.link ? 'bg-none' : 'bg-[#00005a]'
          } transition-all duration-200`}
          onClick={handleClick}
        >
          <div className={`flex items-center justify-start gap-4`}>
            <div>{item?.icon}</div>
            <div className="font-semibold text-xl">{item?.text}</div>
          </div>
          <div
            className={`transform ${
              open ? 'rotate-180' : 'rotate-0'
            } transition-all duration-300`}
          >
            <BsChevronDown />
          </div>
        </div>
      ) : (
        <Link
          href={item?.link}
          className={`flex items-center justify-between gap-4 px-5 py-2 hover:bg-[#000b43] ${
            active !== item?.link ? 'bg-none' : 'bg-[#00005a]'
          } transition-all duration-200`}
          onClick={handleClick}
        >
          <div className={`flex items-center justify-start gap-4`}>
            <div>{item?.icon}</div>
            <div className="font-semibold text-xl">{item?.text}</div>
          </div>
        </Link>
      )}
      <div
        className={`mb-3 pl-3 mt-1 flex flex-col overflow-hidden ${
          open ? 'h-full' : 'h-0'
        } transition-all duration-300 ease-in-out border-l-2 border-[#6ca5ff]`}
      >
        {item?.options?.map((option, i) => {
          return (
            <Link
              href={option?.link}
              key={i}
              className={`flex items-center justify-between gap-4 px-5 py-2 hover:bg-[#000b43] cursor-pointer ${
                active !== option?.link ? 'bg-none' : 'bg-[#00005a]'
              } transition-all duration-200`}
              onClick={() => optionHandleClick(option?.link)}
            >
              <div className="flex items-center justify-start  gap-4">
                <div>{option?.icon}</div>
                <div className="font-semibold text-md">{option?.text}</div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
