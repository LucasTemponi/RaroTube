import { useState } from 'react';
import { Link } from 'react-router-dom';
import { VideoProps } from '../../components/VideoPlayer/VideoProps';

type SemanaSideBarProps = {
    semana:string,
    videos:VideoProps[],
};

export const SemanaSideBar:React.FC<SemanaSideBarProps> = (semana) => {
    const [isOpen,setIsOpen] = useState(false)
    // const navigate = useNavigate();

    return(
        <div className="flex flex-col bg-neutral-300">
            <span onClick={()=>setIsOpen(!isOpen)} >{semana.semana}</span>
                {isOpen && 
                    <ul className='ml-4'>
                        {semana.videos.map((video)=>{
                            return(
                                <Link to={`/video/${video.id}`}>
                                    <li>{video.nome}</li>
                                </Link>
                            )}
                        )}
                    </ul>
                }
        </div> )
}