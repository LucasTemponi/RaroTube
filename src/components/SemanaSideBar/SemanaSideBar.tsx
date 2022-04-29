import { useState } from 'react';
import { Link } from 'react-router-dom';
import { videoProps } from '../../components/VideoPlayer/VideoProps';


type SemanaSideBarProps = {
    semana: string,
    videos: videoProps[],
};

export const SemanaSideBar: React.FC<SemanaSideBarProps> = (semana) => {
    const [isOpen, setIsOpen] = useState(false)
  
    return (
        <>
            <div className="py-2 px-3 bg-gray-50 dark:bg-gray-800">
                <ul className='  space-y-2 items-center'>
                    <a className='flex items-center p-2 hover:bg-blue-100 rounded-lg'>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="25" height="25" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="#343090" d="m162.2 116.7l-48-32a4 4 0 0 0-4.1-.2A3.9 3.9 0 0 0 108 88v64a3.9 3.9 0 0 0 2.1 3.5a4.5 4.5 0 0 0 1.9.5a3.6 3.6 0 0 0 2.2-.7l48-32a3.9 3.9 0 0 0 0-6.6ZM116 144.5v-49l36.8 24.5ZM208 44H48a20.1 20.1 0 0 0-20 20v112a20.1 20.1 0 0 0 20 20h160a20.1 20.1 0 0 0 20-20V64a20.1 20.1 0 0 0-20-20Zm12 132a12 12 0 0 1-12 12H48a12 12 0 0 1-12-12V64a12 12 0 0 1 12-12h160a12 12 0 0 1 12 12Zm-56 48a4 4 0 0 1-4 4H96a4 4 0 0 1 0-8h64a4 4 0 0 1 4 4Z" /></svg>

                        <span className='cursor-pointer flex items-center p-2 w-full text-base font-bold text-raro-cobalto rounded-md dark:text-white ' onClick={() => setIsOpen(!isOpen)}>
                            {`${semana.semana.charAt(0).toUpperCase()}${semana.semana.slice(1)}`}
                        </span>
                    </a>
                </ul>
                {isOpen &&
                    <ul className='border-l-slate-50 ml-4 border-l-2 space-y-2 space-x-2 border-l-raro-rosa items-center'>
                        {semana.videos.map((video) => {
                            return (
                                <Link to={`/video/${video.id}`}>
                                    <li className=' flex items-center p-2 pl-4 w-full text-base font-normal text-raro-cobalto rounded-lg transition duration-75 group hover:bg-blue-100 dark:text-white dark:hover:bg-gray-700'>{video.nome}</li>
                                </Link>

                            );
                        }
                        )}
                    </ul>
                }
            </div>
        </>
    )
}