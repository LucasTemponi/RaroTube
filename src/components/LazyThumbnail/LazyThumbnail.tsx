export const LazyThumbnail = () => {
  return (
    <div
      className={`flex flex-col items-center transform  w-[93vw] lg:w-[15.65vw] 
            md:max-w-[22.35vw] sm:max-w-[30.3vw] mx-[0.66vw] my-4 rounded-md shadow-md`}
    >
      <div className='flex flex-col items-center w-full justify-center aspect-video blur-sm animate-pulse bg-gradient-to-b from-raro-maximum to-raro-oceano' />
      <div className='relative '>
        <span className=' absolute bottom-3 right-3 text-sm bg-black opacity-80 rounded-md px-1  text-white ' />
      </div>
      <div className=' truncate w-full rounded-b-md items-start justify-start'>
        <h2 className=' 2xl:text-xl xl:text-lg lg:text-base md:text-base sm:text-base py-4 px-2 text-black blur'>
          Carregando
        </h2>
      </div>
    </div>
  );
};
