import ClientOnly from '../ClientOnly'
import SwiperSlides from './SwiperSlides'

const ShopNow = () => {
  return (
    <ClientOnly>
      <section className="relative w-full justify-center items-center h-full flex flex-col gap-10 bg-black">
        <SwiperSlides />
        {/* <div className="grid grid-cols-2 gap-5 justify-center items-center">
        {prodData?.splice(0, 4)?.map((item, i) => (
          <div key={i} className="relative flex items-center w-full">
            <Image
              src={item?.images[0]?.url}
              alt="product"
              // layout="fill"
              width={300}
              height={100}
            />
            <div className="absolute bottom-0 text-black bg-[#efefff96] backdrop-blur-lg w-full md:h-[80px] flex flex-col justify-center items-start">
            <div className="font-bold lg:text-2xl text-lg ml-2 gradient-text-3">
                {item?.title?.length > 20
                  ? item?.title?.slice(0, 20)
                  : item?.title}
                  </div>
                  <div className="lg:text-xl text-md font-semibold ml-2">
                  {item?.description?.slice(0, 26)}....
                  </div>
                  </div>
                  </div>
                  ))} 
                </div>*/}
      </section>
    </ClientOnly>
  )
}

export default ShopNow
