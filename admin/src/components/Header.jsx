'use client'

import { setToken, setUsers } from '@/store/reducers/userReducer'
import { redirect, useRouter } from 'next/navigation'
import { useState } from 'react'
import { HiSearch } from 'react-icons/hi'
import { useDispatch } from 'react-redux'

const Header = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [show, setShow] = useState(false)
  const [value, setValue] = useState('')

  const handleClick = (e) => {
    e.preventDefault()
    dispatch(setUsers({}))
    dispatch(setToken(null))
    redirect('/login')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (value.toLocaleLowerCase() === 'dashboard') {
      router.push(`/dashboard`)
    } else {
      router.push(`/dashboard/${value.toLocaleLowerCase()}`)
    }
  }

  return (
    <div className="py-3 flex justify-end items-center w-full">
      <div className="flex lg:w-[350px] w-[200px] bg-[#000000ad] items-center text-white justify-center rounded-full px-3 text-xl">
        <input
          className="placeholder:italic placeholder:text-slate-400 block input-bg-none w-full py-2 pl-3 pr-3 focus:outline-none sm:text-sm border-none rounded-full text-lg lg:text-xl bg-black text-white"
          placeholder="Search.."
          type="text"
          name="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <HiSearch
          size={24}
          className="cursor-pointer"
          color="#6fddff"
          onClick={handleSearch}
        />
      </div>
      <div className="flex justify-center items-center relative">
        <img
          src={`https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png`}
          alt="Profile"
          className="w-14 h-14 rounded-full cursor-pointer"
          onClick={() => setShow((prev) => !prev)}
        />
        <div className="w-[104px] right-[20%] top-[90%] text-center absolute">
          {show && (
            <button
              className="btn bg-white text-black mb-[1rem] w-full mx-auto text-md font-semibold p-0 hover:bg-black hover:text-white transition-all duration-300 border border-white rounded-md"
              onClick={handleClick}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
