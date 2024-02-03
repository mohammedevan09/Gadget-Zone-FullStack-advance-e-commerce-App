'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCreative, Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-creative'

const SwiperSlides = () => {
  const salesImage = [
    '/images/sales.jpg',
    '/images/sales1.jpg',
    '/images/sales2.jpg',
    '/images/sales3.jpg',
    '/images/sales4.jpg',
    '/images/sales.jpg',
    '/images/sales1.jpg',
    '/images/sales2.jpg',
    '/images/sales3.jpg',
    '/images/sales4.jpg',
  ]

  const [slidesPerView, setSlidesPerView] = useState(5)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        if (window.innerWidth < 700) {
          setSlidesPerView(3)
        } else {
          setSlidesPerView(4)
        }
      } else {
        setSlidesPerView(5)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="relative h-full flex justify-center items-center">
      <Swiper
        grabCursor={true}
        effect={'coverflow'}
        slidesPerView={slidesPerView}
        loop={true}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCreative, Pagination, Autoplay]}
        className="mySwiper"
      >
        {salesImage?.map((item, i) => (
          <SwiperSlide key={i}>
            <div style={{ width: '100%', height: '80%', position: 'relative' }}>
              <Image
                src={item}
                alt="sale"
                width="0"
                height="0"
                sizes="60vw"
                className="lg:h-full h-full w-full object-contain"
                quality={30}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default SwiperSlides
