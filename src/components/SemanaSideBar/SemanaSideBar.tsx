import { useState } from 'react';
import { Link } from 'react-router-dom';
import { videoProps } from '../../components/VideoPlayer/VideoProps';

type SemanaSideBarProps = {
    semana: string,
    videos: videoProps[],
};

export const SemanaSideBar: React.FC<SemanaSideBarProps> = (semana) => {
    const [isOpen, setIsOpen] = useState(false)
    // const navigate = useNavigate();

    return (
        
        <div className=" py-2 px-3 bg-gray-50 rounded dark:bg-gray-800">
            <button className=' ml-4 flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ' onClick={() => setIsOpen(!isOpen)} >{`${semana.semana.charAt(0).toUpperCase()}${semana.semana.slice(1)}`}
                <svg sidebar-toggle-item className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>

            {isOpen &&
                <ul className='space-y-2 items-center'>
                    {semana.videos.map((video) => {
                        return (
                            <div>

                                <Link to={`/video/${video.id}`}>

                                    <li className='flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'>{video.nome}</li>
                                </Link>
                            </div>

                        )
                    }
                    )}
                </ul>
            }
        </div>)
      
}