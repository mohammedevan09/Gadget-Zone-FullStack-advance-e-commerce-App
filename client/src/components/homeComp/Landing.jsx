import LandingResponsiveImage from './LandingResponsiveImage'

const Landing = () => {
  return (
    <div className="relative flex justify-center items-center h-full md:mt-0 mt-[4rem]">
      <LandingResponsiveImage />
      <div className="absolute xl:w-1/3 md:w-1/2 sm:w-[82%] w-[70%] md:left-28 left-14 text-white grid xl:gap-5 gap-2 md:text-left text-center ">
        <div className="white font-semibold gradient-text-primary xl:text-xl md:text-md sm:text-[14px] text-[11px]">
          Get the Latest Gadgets at Unbeatable Prices!
        </div>
        <div
          className="xl:text-6xl lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold gradient-text
          "
        >
          Hottest Gadgets During Our Summer Sale
        </div>

        <div className="xl:text-xl md:text-md text-sm text-gray-400 gradient-text-secondary md:inline-block hidden">
          Welcome to Star Gadget, Your ultimate destination for the latest and
          greatest gadgets and technology innovations.
        </div>
        <button
          className="btn text-black hover:text-white text-md xl:text-xl font-bold block w-40 btn-bg mx-auto md:mx-0 border-white
          "
        >
          Shop Now
        </button>
      </div>
      <div></div>
    </div>
  )
}

export default Landing
