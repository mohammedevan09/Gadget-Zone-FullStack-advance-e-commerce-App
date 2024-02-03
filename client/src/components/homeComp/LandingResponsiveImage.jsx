'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import bigScreen from '../../../public/images/landing-three.jpg'
import smallScreen from '../../../public/images/mobile-landing.jpg'

const LandingResponsiveImage = () => {
  const [imageUrl, setImageUrl] = useState(smallScreen)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) {
        setImageUrl(smallScreen)
      } else {
        setImageUrl(bigScreen)
      }
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Image
      src={imageUrl}
      width="0"
      height="0"
      sizes="100vw"
      alt="landing"
      quality={85}
      className="w-full sm:h-auto h-[58vh] md:object-none object-cover"
    />
  )
}

export default LandingResponsiveImage
