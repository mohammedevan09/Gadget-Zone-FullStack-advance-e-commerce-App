const Titles = ({ title, line }) => {
  return (
    <div className="text-white relative bg-black lg:ml-10 md:ml-5 ml-5">
      <div className="font-semibold lg:text-5xl sm:text-4xl text-3xl md:mb-3 mb-[6px]">
        {title}
      </div>
      <div className={`h-1 bg-white rounded-full md:w-[150px] w-[85px]`}></div>
    </div>
  )
}

export default Titles
