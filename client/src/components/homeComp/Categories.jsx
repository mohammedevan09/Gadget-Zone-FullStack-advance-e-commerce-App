import Image from 'next/image'
import Titles from '../Titles'
import { getAllCategory } from '@/api/categoryApi'
import Link from 'next/link'

const Categories = async () => {
  const category = await getAllCategory()

  return (
    <div className="grid items-center justify-start  bg-black my-5 sm:gap-8 gap-4">
      <Titles title={'Category'} />
      <div className="overflow-x-scroll flex g-3 sm:mx-10 mx-2">
        {category?.splice(0, 9)?.map((item, i) => (
          <Link
            target="_blank"
            href={'/store?category=' + item?.title}
            key={i}
            className="mb-5 mt-2 text-white text-center"
          >
            <div className="flex flex-col items-center justify-center lg:w-[250px] sm:w-[185px] w-[127px] sm:mx-5 mx-3">
              <Image
                src={item?.image?.url}
                alt="category"
                width={1000} // Adjust the width and height as needed
                height={1000}
                quality={100}
                className="rounded-full lg:h-52 lg:w-52 sm:w-40 sm:h-40 w-24 h-24 object-cover"
              />
            </div>
            <h1 className="font-bold text-center lg:text-2xl sm:text-md text-[13px] text-[#bec6ff]">
              {item?.title?.length >= 20 ? (
                <>{item?.title?.substring(0, 20)}...</>
              ) : (
                <>{item?.title}</>
              )}
            </h1>
            <h3 className="font-semibold text-center lg:text-md sm:text-[13px] sm:inline-block hidden text-[11px]  text-[#bec6ffb0]">
              {item?.description?.substring(0, 40)}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Categories
