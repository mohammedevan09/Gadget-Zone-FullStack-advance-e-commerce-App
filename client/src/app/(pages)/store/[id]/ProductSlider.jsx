'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { useState } from 'react'
import Image from 'next/image'

const ProductSlider = ({ image }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 xl:max-w-[600px] md:max-w-[400px] xs:max-w-[380px] max-w-[360px]"
        loop={true}
      >
        {image?.map((item, i) => (
          <SwiperSlide key={i}>
            <Image
              src={item?.url}
              alt="category"
              width={500}
              height={500}
              quality={100}
              className="xl:w-[600px] md:w-[400px] w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {image?.length !== 1 && (
        <Swiper
          onSwiper={(swiper) => setThumbsSwiper(swiper)}
          spaceBetween={0}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper xl:w-[600px] md:w-[400px] w-full"
        >
          {image?.map((item, i) => {
            return (
              <SwiperSlide key={i}>
                <Image
                  src={item?.url}
                  alt="category"
                  width={500}
                  height={500}
                  quality={100}
                  className="xl:h-52 sm:h-28 h-20 w-full object-cover"
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
      )}
    </>
  )
}

export default ProductSlider
