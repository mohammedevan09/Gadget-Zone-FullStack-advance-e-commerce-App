'use client'

import { getWishlist } from '@/api/productApi'
import { getCart } from '@/api/userApi'
import ProductCard from '@/components/ProductCard'
import { setCart } from '@/store/reducers/userReducer'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SelectProducts from './SelectProducts'
import { HiMenuAlt1, HiSearch } from 'react-icons/hi'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { BsFillFilterCircleFill } from 'react-icons/bs'
import { PiCursorTextFill } from 'react-icons/pi'
import { AiOutlineClose, AiOutlineCloseCircle } from 'react-icons/ai'
import Image from 'next/image'

const ProductsShow = ({ product, categories, copiedCategories, brand }) => {
  const [carts, setCarts] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [search, setSearch] = useState('')
  const [selectCat, setSelectCat] = useState('')
  const [selectBrand, setSelectBrand] = useState('')
  const [selectSort, setSelectSort] = useState('')

  const dispatch = useDispatch()
  const router = useRouter()
  const pathname = usePathname()

  const [isSortByOpen, setIsSortByOpen] = useState(false)
  const [isFilterByOpen, setIsFilterByOpen] = useState(false)

  const { userInfo, token } = useSelector((state) => state?.user)

  useEffect(() => {
    const fetchCartItems = async () => {
      if (userInfo && token) {
        const cartItems = await getCart(userInfo?._id)
        setCarts(cartItems?.cart)
        dispatch(setCart(cartItems?.cart?.length))
        const wishListItems = await getWishlist(userInfo?._id)
        setWishlist(wishListItems?.wishlist)
      } else {
        dispatch(setCart(0))
      }
    }
    fetchCartItems()
  }, [userInfo, token, dispatch])

  const sortItem = [
    {
      title: 'price',
    },
    {
      title: 'quantity',
    },
    {
      title: 'sold',
    },
    {
      title: 'createdAt',
    },
  ]

  const handleSearch = () => {
    setSelectSort('')
    setIsSortByOpen(false)
    setIsSortByOpen(false)
    if (search !== '') {
      return router.push(`${pathname}?search=${search}`)
    } else {
      return router.push(`${pathname}`)
    }
  }

  useEffect(() => {
    const url = new URL(window.location.href)
    const params = new URLSearchParams(url.search)

    if (selectSort) {
      params.set('sort', selectSort)
      const newUrl = `${url.pathname}?${params}`
      router.push(newUrl, undefined, { shallow: true })
    } else {
      params.delete('sort')
      const newUrl = `${url.pathname}?${params}`
      router.push(newUrl, undefined, { shallow: true })
    }
  }, [selectSort, router])

  useEffect(() => {
    const url = new URL(window.location.href)
    const params = new URLSearchParams(url.search)

    if (selectBrand) {
      params.set('brand', selectBrand.value)
      const newUrl = `${url.pathname}?${params}`
      router.push(newUrl, undefined, { shallow: true })
    } else {
      params.delete('brand')
      const newUrl = `${url.pathname}?${params}`
      router.push(newUrl, undefined, { shallow: true })
    }
  }, [selectBrand, router])

  useEffect(() => {
    const url = new URL(window.location.href)
    const params = new URLSearchParams(url.search)

    if (selectCat) {
      params.set('category', selectCat.value)
      const newUrl = `${url.pathname}?${params}`
      router.push(newUrl, undefined, { shallow: true })
    } else {
      params.delete('category')
      const newUrl = `${url.pathname}?${params}`
      router.push(newUrl, undefined, { shallow: true })
    }
  }, [selectCat, router])

  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1090) {
        setIsSmallScreen(true)
      } else {
        setIsSmallScreen(false)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSortByClick = (e) => {
    e.preventDefault()
    setIsSortByOpen((prev) => !prev)
  }

  const handleFilterByClick = (e) => {
    e.preventDefault()
    setIsFilterByOpen((prev) => !prev)
  }

  return (
    <div className="grid items-around text-white justify-center xl:pt-36 pt-24 pb-10 gap-10">
      <div className="mx-auto text-center inline-block">
        <h1 className="md:text-5xl sm:text-4xl text-3xl">Out Store</h1>
        <div className="w-[70%] h-1 rounded-md bg-white mt-3"></div>
      </div>
      {isSmallScreen && (
        <div className="md:mx-12 mx-2 flex justify-between items-center font-bold sm:text-2xl text-xl -mb-[2rem]">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleSortByClick}
          >
            <PiCursorTextFill size={23} color="white" /> Sort By
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleFilterByClick}
          >
            Filter By <BsFillFilterCircleFill size={23} color="white" />
          </div>
        </div>
      )}
      <div className="flex justify-around items-start md:ml-3 ml-0 relative">
        <div
          className={`grid items-center justify-start sort-by ${
            isSortByOpen ? 'left-0' : '-left-[100%]'
          }`}
        >
          {isSortByOpen && (
            <div className="absolute top-4 right-4">
              <AiOutlineClose
                size={30}
                className="cursor-pointer"
                color="white"
                onClick={handleSortByClick}
              />
            </div>
          )}
          <div>
            <h2 className="text-2xl font-semibold mb-5">Sort By</h2>
            <div className="grid items-center justify-left gap-2 h-[300px] overflow-y-scroll">
              <button
                className={`py-1 pl-1 flex justify-start items-center gap-3 cursor-pointer ${
                  selectSort === '' ? 'bg-white text-black font-bold' : ''
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  setSelectSort('')
                }}
              >
                None
                <div
                  className={`w-full  ${
                    selectSort === ''
                      ? 'bg-black h-[2px] pr-[4px]'
                      : 'bg-white h-[1px]'
                  }`}
                ></div>
              </button>
              {sortItem?.map((item, i) => (
                <button
                  key={i}
                  className={`py-1 pl-1 flex justify-start items-center gap-3 cursor-pointer ${
                    selectSort === item?.title
                      ? 'bg-white text-black font-bold'
                      : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    setSelectSort(item?.title)
                  }}
                >
                  {item?.title?.toUpperCase()?.length >= 12 ? (
                    <>{item?.title?.toUpperCase()?.substring(0, 12)}...</>
                  ) : (
                    <>{item?.title?.toUpperCase()}</>
                  )}
                  <div
                    className={`w-full  ${
                      selectSort === item?.title
                        ? 'bg-black h-[2px] pr-[7px]'
                        : 'bg-white h-[1px]'
                    }`}
                  ></div>
                </button>
              ))}
            </div>
          </div>
          {/* <h2 className="text-2xl font-semibold my-5">Filter By</h2> */}
          {/* <h2 className="text-2xl font-semibold my-5">Availability</h2>
          <div>
            <div className="flex justify-start items-center gap-2 text-lg">
              <input
                type="checkbox"
                className="checkbox-css"
                name=""
                id="inStock"
              />
              <label htmlFor="inStock">In Stock</label>
            </div>
            <div className="flex justify-start items-center gap-2 text-lg">
              <input
                type="checkbox"
                className="checkbox-css"
                name=""
                id="outOfStock"
              />
              <label htmlFor="outOfStock">Out of Stock</label>
            </div>
          </div> */}
        </div>

        <div className="grid justify-start items-center gap-5">
          <div
            className={`flex justify-between items-center filters xl:gap-0 gap-8 mx-auto ${
              isFilterByOpen ? 'right-0' : '-right-[100%]'
            }`}
          >
            {isFilterByOpen && (
              <div className="absolute top-4 left-4">
                <AiOutlineClose
                  size={30}
                  className="cursor-pointer"
                  color="white"
                  onClick={handleFilterByClick}
                />
              </div>
            )}
            <div className="lg:flex grid justify-between items-center lg:gap-0 gap-[2rem]">
              <div className="lg:flex grid xl:mx-10 mx-2 justify-start items-center gap-3 md:order-1 order-2">
                <div className="flex justify-start items-center text-2xl">
                  <SelectProducts
                    categories={brand}
                    text={'Choose Brand '}
                    setValue={(value) => setSelectBrand(value)}
                    value={selectBrand}
                  />
                </div>
                <div className="flex justify-start items-center text-2xl">
                  <SelectProducts
                    categories={copiedCategories}
                    text={'Choose Category '}
                    setValue={(value) => setSelectCat(value)}
                    value={selectCat}
                  />
                </div>
              </div>
              <div className="flex bg-[white] items-center text-black justify-center rounded-full px-3 text-xl xl:order-2 order-1">
                <input
                  className="placeholder:italic placeholder:text-slate-700 block input-bg-none w-full md:py-2 py-[2px] pl-3 pr-3 focus:outline-none sm:text-sm border-none rounded-full text-xl"
                  placeholder="Search products.."
                  type="text"
                  name="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch()
                      setIsSortByOpen(false)
                      setIsSortByOpen(false)
                    }
                  }}
                />
                <HiSearch
                  size={28}
                  className="cursor-pointer"
                  color="black"
                  onClick={handleSearch}
                />
              </div>
            </div>
          </div>
          {product?.length !== 0 ? (
            <div className="grid md:grid-cols-3 grid-cols-2 text-white md:mx-10 mx-2 mt-4 gap-x-4">
              {product?.map((item, i) => {
                const isWishListed = wishlist?.find(
                  (list) => list?._id === item?._id
                )
                return (
                  <ProductCard
                    item={item}
                    key={i}
                    cartItem={carts}
                    wishlist={isWishListed ? isWishListed : null}
                  />
                )
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

export default ProductsShow
