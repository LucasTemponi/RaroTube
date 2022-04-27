export const LazyThumbnail = ()=>{
    return(
        <div className={`flex flex-col items-center transform ease-linear duration-300
            2xl:w-[14vw] xl:w-[18vw] lg:w-[26vw] md:w-[42vw] sm:w-[45vw] mt-4 ml-2 mr-2 rounded-md shadow-md`}>
                <div className="flex flex-col items-center w-full justify-center aspect-video blur-sm animate-pulse bg-gradient-to-b from-raro-maximum to-raro-oceano"/>
                <div className='relative '>
                    <span className=' absolute bottom-3 right-3 text-sm bg-black opacity-80 rounded-md px-1  text-white '/>
                </div>
                <div className=' truncate w-full rounded-b-md items-start justify-start'>
                    <h2 className=' 2xl:text-xl xl:text-lg lg:text-base md:text-base sm:text-base py-4 px-2 text-black blur'>
                        Carregando
                    </h2>
                    <p className="blur">31/12/2051</p>
                </div>
        </div>
    )
}