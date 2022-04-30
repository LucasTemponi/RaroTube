import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { useAuthContext } from '../../context/authContext';
import { useVideos } from '../../hooks/useVideos';
import apiClient from '../../services/api-client';
import { Navegacao } from '../Navegacao';
import { SemanaSideBar } from '../SemanaSideBar/SemanaSideBar';
import { VideoProps } from '../VideoPlayer/VideoProps';

export type Props = {
  children: ReactNode;
}

type semanasProps = {
  [key: string]: VideoProps[]
}

const Navbar: React.FC<Props> = ({ children }) => {

  const [isOpen, setIsOpen] = useState(false);
  // const semanas:semanasProps = {}
  const todosVideos = useVideos(state => state.videos);
  const iniciaVideos = useVideos(state => state.iniciaVideos);
  const { estaAutenticado, deslogarUsuario } = useAuthContext();


  useEffect(() => {
    apiClient.get('/videos').then(response => iniciaVideos(response.data.reverse()))
  }, []);

  const semanas: semanasProps = useMemo(() => {
    const semanas: semanasProps = {}
    todosVideos.forEach(video => {
      if (video.topico !== 'aulão') {
        semanas[video.topico] ? semanas[video.topico].push(video) : semanas[video.topico] = [video]
      }
    })
    return semanas
  }, [todosVideos]);

  if (!estaAutenticado()) {
    return (
      <>
        <header className='flex items-center justify-between fixed z-10 bg-gray-50 px-6 py-4 w-full'>
          <div className='flex items-center space-x-5 '>
            <div className='cursor-pointer' onClick={() => setIsOpen(!isOpen)} >
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="30" height="30" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="#343090" d="M220 128a4 4 0 0 1-4 4H40a4 4 0 0 1 0-8h176a4 4 0 0 1 4 4ZM40 68h176a4 4 0 0 0 0-8H40a4 4 0 0 0 0 8Zm176 120H40a4 4 0 0 0 0 8h176a4 4 0 0 0 0-8Z" /></svg>            </div>
            <Link to={'/'} className='flex items-center h-12 w-32'>
              <Logo />
            </Link>
          </div>
          <div className='flex items-center space-x-2 font-bold'>
            <Navegacao />
          </div>
        </header>

        <div className="flex flex-row z-10" >
          {
            isOpen &&
            <div className={`flex flex-col w-64 min-h-screen mt-20 bg-gray-50`}>
              <div className=" py-2 px-3 bg-gray-50 dark:bg-gray-800">
                <ul className='  space-y-2 items-center '>
                  <div className='text-center'>
                    <span className="items-center pl-4 w-full text-base font-bold text-gray-700 rounded-lg dark:text-white dark:hover:bg-gray-700">Ainda não é nosso aluno?</span>
                  </div>
                  <a className='flex items-center p-2 hover:bg-blue-100 rounded-lg cursor-pointer' href='https://www.raroacademy.com.br/' target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="25" height="25" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="#343090" d="m2.45 10.575l4.2-4.2q.35-.35.825-.5q.475-.15.975-.05l1.3.275Q8.4 7.7 7.625 9q-.775 1.3-1.5 3.15Zm5.125 2.275q.575-1.8 1.562-3.4q.988-1.6 2.388-3q2.2-2.2 5.025-3.288q2.825-1.087 5.275-.662q.425 2.45-.65 5.275T17.9 12.8q-1.375 1.375-3 2.388q-1.625 1.012-3.425 1.587Zm6.9-3q.575.575 1.413.575q.837 0 1.412-.575t.575-1.413q0-.837-.575-1.412t-1.412-.575q-.838 0-1.413.575q-.575.575-.575 1.412q0 .838.575 1.413Zm-.7 12.025l-1.6-3.675q1.85-.725 3.163-1.5q1.312-.775 2.912-2.125l.25 1.3q.1.5-.05.988q-.15.487-.5.837ZM4.05 16.05q.875-.875 2.125-.888q1.25-.012 2.125.863t.875 2.125q0 1.25-.875 2.125q-.625.625-2.087 1.075q-1.463.45-4.038.8q.35-2.575.8-4.025q.45-1.45 1.075-2.075Z" /></svg>
                    <span className='cursor-pointer items-center pl-4 w-full text-base font-bold text-raro-cobalto rounded-lg dark:text-white dark:hover:bg-gray-700'>
                      Matricule-se
                    </span>
                  </a>
                </ul>

              </div>
              {Object.keys(semanas).map(semana => <SemanaSideBar semana={semana} videos={semanas[semana]} />)}
            </div>}
          <div className="w-full" >
            <div className="w-full mt-20 " >{children}</div>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <header className='flex items-center justify-between fixed z-10 bg-gray-50 px-6 py-4 w-full'>
          <div className='flex items-center space-x-5 '>
            <div className='cursor-pointer' onClick={() => setIsOpen(!isOpen)} >
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="30" height="30" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="#343090" d="M220 128a4 4 0 0 1-4 4H40a4 4 0 0 1 0-8h176a4 4 0 0 1 4 4ZM40 68h176a4 4 0 0 0 0-8H40a4 4 0 0 0 0 8Zm176 120H40a4 4 0 0 0 0 8h176a4 4 0 0 0 0-8Z" /></svg>
            </div>
            <Link to={'/'} className='flex items-center h-12 w-32'>
              <Logo />
            </Link>
          </div>
          <div className='flex items-center space-x-2 font-bold'>
            <Navegacao />
          </div>
        </header>

        <div className="flex flex-row" >
          {
            isOpen &&
            <div className={` flex flex-col w-64 min-h-screen mt-20 bg-gray-50`}>
              <div className=" py-2 px-3 bg-gray-50 dark:bg-gray-800">
                <ul className=' space-y-1 items-center '>
                  <Link to={'/'}>
                    <a className='p-2 flex items-center hover:bg-blue-100 rounded-lg'>
                      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="25" height="25" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="#343090" d="M240 212h-20v-96.5a11.8 11.8 0 0 0-3.9-8.8l-80-72.8a12 12 0 0 0-16.2 0l-80 72.8a11.8 11.8 0 0 0-3.9 8.8V212H16a4 4 0 0 0 0 8h224a4 4 0 0 0 0-8ZM44 115.5a3.9 3.9 0 0 1 1.3-2.9l80-72.8a4 4 0 0 1 5.4 0l80 72.8a3.9 3.9 0 0 1 1.3 2.9V212h-56v-52a12 12 0 0 0-12-12h-32a12 12 0 0 0-12 12v52H44ZM148 212h-40v-52a4 4 0 0 1 4-4h32a4 4 0 0 1 4 4Z" /></svg>
                      <span className=" cursor-pointer items-center py-2 px-3 w-full text-base font-bold text-raro-cobalto rounded-lg dark:text-white dark:hover:bg-gray-700">Home</span>
                    </a>
                  </Link>
                </ul>
              </div>
              {Object.keys(semanas).map(semana => <SemanaSideBar semana={semana} videos={semanas[semana]} />)}
            </div>}
          <div className="w-full" >
            <div className="w-full mt-20 " >{children}</div>
          </div>
        </div>
      </>
    )
  }
};

export default Navbar;
