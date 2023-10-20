'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  BsFillPersonFill,
  BsFillBookmarkHeartFill,
  BsPersonFillAdd,
} from 'react-icons/bs'
import { FaCodeCompare } from 'react-icons/fa6'
import { AiOutlineCloseCircle, AiOutlineShoppingCart } from 'react-icons/ai'
import { HiMenuAlt1, HiSearch } from 'react-icons/hi'
import { IoIosArrowDropdownCircle } from 'react-icons/io'
import { BiCategory, BiLogOutCircle, BiSolidHomeAlt2 } from 'react-icons/bi'
import { CgMenuGridR } from 'react-icons/cg'
import { MdContacts, MdShoppingBasket, MdStickyNote2 } from 'react-icons/md'
import { dmSerifDisplay } from '@/app/layout'
import { useDispatch, useSelector } from 'react-redux'
import { setToken, setUsers } from '@/store/reducers/userReducer'
import { usePathname, useRouter } from 'next/navigation'
import ClientOnly from './ClientOnly'
import { FaCartArrowDown } from 'react-icons/fa'
import Image from 'next/image'
import toast from 'react-hot-toast'

const Header = ({ className }) => {
  const [show, setShow] = useState('top')
  const [lastScrollY, setLastScrollY] = useState(0)
  const [search, setSearch] = useState('')

  const dispatch = useDispatch()
  const router = useRouter()
  const pathname = usePathname()

  const { userInfo, token, cart } = useSelector((state) => state?.user)

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > 200) {
        if (window.scrollY > lastScrollY) {
          setShow('hide')
        } else {
          setShow('show')
        }
      } else {
        setShow('top')
      }
      setLastScrollY(window.scrollY)
    }

    window.addEventListener('scroll', controlNavbar)
    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  }, [lastScrollY])

  const [showNav, setShowNav] = useState(false)

  const handleNavigation = () => {
    setShowNav((prev) => !prev)
  }

  const handleDropClick = (dropLink, dropText) => {
    if (dropText === 'Log Out') {
      if (confirm('Do you really want to Log Out?')) {
        dispatch(setUsers({}))
        dispatch(setToken(null))
        toast.success('Successfully Logged Out!')
        router.push('/login')
      }
    } else {
      if (dropLink === '/wishlist') {
        if (!userInfo || !token) {
          toast.error('You need to Log in first!')
          router.push('/login')
        } else {
          router.push(dropLink + '?userId=' + userInfo?._id)
        }
      } else if (dropLink === '/order') {
        if (!userInfo || !token) {
          toast.error('You need to Log in first!')
          router.push('/login')
        } else {
          router.push(dropLink + '?userId=' + userInfo?._id)
        }
      } else {
        router.push(dropLink)
      }
    }
    setShowNav(false)
    // console.log(pathname, dropLink)
  }

  const [iconSize, setIconSize] = useState(0)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1025) {
        setIsSmallScreen(true)
      } else {
        setIsSmallScreen(false)
      }
      if (window.innerWidth < 640) {
        setIconSize(8)
      } else {
        setIconSize(0)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const more = [
    {
      text: 'CONTACT',
      link: '/contact',
      icon: <MdContacts size={23 - iconSize} />,
    },
    // {
    //   text: 'Compare',
    //   link: '/compare-product',
    //   icon: <FaCodeCompare size={23 - iconSize} />,
    // },
    {
      text: 'WisList',
      link: '/wishlist',
      icon: <BsFillBookmarkHeartFill size={23 - iconSize} />,
    },
    {
      text: 'Order',
      link: '/order',
      icon: <FaCartArrowDown size={23 - iconSize} />,
    },
    ...(Object.keys(userInfo).length !== 0 && token !== null
      ? [
          {
            text: 'Log Out',
            link: '/register',
            icon: <BiLogOutCircle size={23 - iconSize} />,
          },
        ]
      : [
          {
            text: 'Sign in',
            link: '/login',
            icon: <BsFillPersonFill size={23 - iconSize} />,
          },
          {
            text: 'Sign up',
            link: '/register',
            icon: <BsPersonFillAdd size={23 - iconSize} />,
          },
        ]),
  ]

  const links = [
    {
      text: 'HOME',
      link: '/',
      icon: <BiSolidHomeAlt2 size={22 - iconSize} />,
      line: <div className="bg-white w-[2px] h-[23px]"></div>,
    },
    {
      text: 'STORE',
      link: '/store',
      icon: <MdShoppingBasket size={22 - iconSize} />,
      line: <div className="bg-white w-[2px] h-[23px]"></div>,
    },
    {
      text: 'BLOGS',
      link: '/blogs',
      icon: <MdStickyNote2 size={22 - iconSize} />,
      line: <div className="bg-white w-[2px] h-[23px]"></div>,
    },
    {
      text: 'Cart',
      link: '/cart',
      icon: (
        <div className="relative md:ml:0 -ml-[5px] md:mr-0 mr-1">
          <span className="w-5 h-5 bg-white rounded-full absolute -top-2 -right-2 text-black flex justify-center items-center text-xs p-1">
            {cart || 0}
          </span>
          <AiOutlineShoppingCart size={23} />
        </div>
      ),
      line: <div className="bg-white w-[2px] h-[23px]"></div>,
    },
    {
      dropdown: (
        <div className="relative my-auto ml-4">
          <details className="dropdown">
            <summary className="btn flex items-center justify-center xl:gap-4 gap-1 xl:w-[220px] lg:w-[180px] w-[147px]">
              <CgMenuGridR size={26 - iconSize} />
              <span className="lg:text-xl text-[14px]">MORE</span>{' '}
              <IoIosArrowDropdownCircle size={24 - iconSize} />
            </summary>
            <div className="shadow menu dropdown-content z-[1] text-white bg-[#000000ad] xl:font-3xl font-xl mt-3  rounded-none w-full backdrop-blur-md">
              {more?.map((item, i) => (
                <div
                  onClick={(e) => {
                    e.preventDefault()
                    handleDropClick(item?.link, item?.text)
                  }}
                  key={i}
                  className={`font-[400] xl:py-4 py-2 hover:text-black hover:bg-white text-sm xl:px-5 px-2 cursor-pointer ${
                    item.link !== '/register' && 'imp-border'
                  }  ${
                    item?.link === pathname &&
                    'bg-white text-black font-semibold'
                  }`}
                >
                  {' '}
                  <div
                    className={`dropdown-font text-sm flex items-center xl:gap-6 gap-2 imp-font`}
                  >
                    <span>{item?.icon}</span>
                    {item?.text}
                  </div>
                </div>
              ))}
            </div>
          </details>
        </div>
      ),
    },
  ]

  const modifiedLinks = isSmallScreen ? [...links, ...more] : links

  const handleMainClick = (links, texts) => {
    if (links === '/cart') {
      if (!userInfo || !token) {
        toast.error('You need to Log in first!')
        router.push('/login')
      } else {
        console.log(links + '?userId=' + userInfo?._id)
        router.push(links + '?userId=' + userInfo?._id)
      }
    } else {
      router.push(links)
    }
    if (isSmallScreen) {
      if (texts === 'Log Out') {
        if (confirm('Do you really want to Log Out?')) {
          dispatch(setUsers({}))
          dispatch(setToken(null))
          toast.success('Successfully Logged Out!')
          router.push('/login')
        }
      } else {
        if (links === '/wishlist') {
          if (!userInfo || !token) {
            toast.error('You need to Log in first!')
            router.push('/login')
          } else {
            router.push(links + '?userId=' + userInfo?._id)
          }
        } else if (links === '/order') {
          if (!userInfo || !token) {
            toast.error('You need to Log in first!')
            router.push('/login')
          } else {
            router.push(links + '?userId=' + userInfo?._id)
          }
        } else {
          if (links === '/cart') {
            if (!userInfo || !token) {
              toast.error('You need to Log in first!')
              router.push('/login')
            } else {
              console.log(links + '?userId=' + userInfo?._id)
              router.push(links + '?userId=' + userInfo?._id)
            }
          } else {
            router.push(links)
          }
        }
      }
    }
    setShowNav(false)
  }

  const handleSearch = () => {
    if (search !== '') {
      router.push(`/store?search=${search}`)
    }
  }

  return (
    <ClientOnly>
      <nav className={`fixed z-10 w-screen ${className} ${show}`}>
        <div className="bg-none relative w">
          <div className="flex sm:justify-between justify-start items-center xl:py-2 py-0 text-white xl:h-20 sm:h-16 h-12 xl:mx-[40px] mx-[17px]">
            <h1>
              <Link href={'/'} className="sm:w-[16rem] w-[9rem] block">
                <Image
                  alt="logo"
                  src={'/images/originalLogo.png'}
                  width={200}
                  height={200}
                  className="max-w-[none] xl:w-[18rem] lg:w-[15rem] md:w-[12rem] sm:w-[10rem] w-[8rem] xl:mt-1"
                />
              </Link>
            </h1>
            <div className="flex justify-center items-center text-xl sm:static absolute right-[12px]">
              <div className="flex xl:w-[250px] sm:w-[212px] w-[155px] bg-[#000000ad] border-2 border-[#c8dbff82] items-center text-white justify-center rounded-full px-3 md:text-xl text-[14px]">
                <input
                  className="placeholder:italic placeholder:text-slate-400 block input-bg-none w-full py-0 pl-3 pr-3 focus:outline-none sm:text-sm border-none rounded-full"
                  placeholder="Search products.."
                  type="text"
                  name="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch()
                    }
                  }}
                />
                <HiSearch
                  size={28 - iconSize}
                  className="cursor-pointer"
                  color="white"
                  onClick={handleSearch}
                />
              </div>
              <div className="lg:hidden inline-block ml-2 relative z-10 right-0">
                {!showNav ? (
                  <HiMenuAlt1
                    size={30}
                    className="cursor-pointer"
                    color="white"
                    onClick={handleNavigation}
                  />
                ) : (
                  <AiOutlineCloseCircle
                    size={30}
                    className="cursor-pointer"
                    color="white"
                    onClick={handleNavigation}
                  />
                )}
              </div>
              <div
                className={`lg:flex justify-center items-center xl:text-xl md:text-[16px] text-xl font-semibold main-menu ${
                  showNav ? 'left-0' : 'left-[110%]'
                }`}
              >
                {modifiedLinks?.map((item, i) =>
                  item?.dropdown ? (
                    <div key={i} className="lg:inline-block hidden">
                      {item?.dropdown}
                    </div>
                  ) : (
                    <div
                      key={i}
                      className={`flex justify-center items-center xl:gap-5 gap-2 cursor-pointer md:mx-auto ml-0 mr-auto hover:text-[#3f88ff] transition-all duration-100 ${
                        item?.link === pathname && 'text-[#84b4ff]'
                      }`}
                      onClick={(e) => {
                        e.preventDefault()
                        handleMainClick(item?.link, item?.text)
                      }}
                    >
                      {!isSmallScreen && item?.link === '/cart' ? (
                        <span className="ml-2">{item?.icon}</span>
                      ) : (
                        <span className="ml-2"></span>
                      )}
                      {isSmallScreen && (
                        <span className="ml-2">{item?.icon}</span>
                      )}
                      <div>{item?.text}</div>{' '}
                      <span className="lg:inline-block hidden">
                        {item?.line}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </ClientOnly>
  )
}

export default Header
