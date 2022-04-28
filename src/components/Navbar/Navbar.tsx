import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { useVideos } from '../../hooks/useVideos';
import apiClient from '../../services/api-client';
import { Navegacao } from '../Navegacao';
import { SemanaSideBar } from '../SemanaSideBar/SemanaSideBar';
import { VideoProps } from '../VideoPlayer/VideoProps';

export type Props = {
  children: ReactNode;
}

type semanasProps = {
  [key:string]:VideoProps[]
}

const Navbar:React.FC<Props> = ({children}) => {
  
  const [isOpen,setIsOpen] = useState(false);
  // const semanas:semanasProps = {}
  const todosVideos = useVideos(state => state.videos);
  const iniciaVideos = useVideos(state => state.iniciaVideos);


useEffect(() => {
    apiClient.get('/videos').then(response => iniciaVideos(response.data.reverse()))
}, []);

const semanas:semanasProps = useMemo(() => {
  const semanas:semanasProps = {}
    todosVideos.forEach(video => {
      if (video.topico!=='aulão') {
        semanas[video.topico] ? semanas[video.topico].push(video) : semanas[video.topico] = [video]
      }
    })
    console.log(semanas)
    return semanas
}, [todosVideos]);

  return (
    <>    
    <header className='flex items-center justify-between fixed bg-neutral-300 px-6 py-4 w-full'>
      <div className='flex items-center space-x-2 '>
      <div onClick={()=>setIsOpen(!isOpen)} >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
        </div>
        <Link to={'/'} className='flex items-center h-12 w-32'>
          <Logo />
        </Link>
      </div>
      <div className='flex items-center space-x-2 font-bold'>
        <Navegacao />
      </div>
    </header>
        <div className="flex flex-row w-full" >
          <div className={` ${isOpen ? 'hidden' : ''} flex flex-col w-[35em] h-screen pl-8 mt-20 bg-neutral-300`}>
            <h2>Meus cursos</h2>
            {Object.keys(semanas).map(semana => <SemanaSideBar semana={semana} videos={semanas[semana]} />)}
          </div>
        <div>
            <div className="w-full mt-20 " >{children}</div>        
        </div>
    </div>
    </>
    )
};

export default Navbar;
