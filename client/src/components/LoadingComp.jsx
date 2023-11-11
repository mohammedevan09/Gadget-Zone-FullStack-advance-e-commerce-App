'use client'

import RingLoader from 'react-spinners/RingLoader'

const RingLoaderLoading = () => {
  return (
    <div className="text-white h-screen w-screen flex justify-center items-center fixed z-[1000] bg-black">
      <div className="blur-new left-0"></div>
      <div className="blur-new right-0"></div>
      <div className="blur-new left-[40%] bottom-0"></div>
      <div className="blur-new right-[40%] top-0"></div>
      <RingLoader color="#539eff" size={200} />
    </div>
  )
}

export default RingLoaderLoading
