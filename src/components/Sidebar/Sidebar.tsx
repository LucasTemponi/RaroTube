import { ReactNode, useEffect, useState } from 'react';
import { useVideos } from '../../hooks/useVideos';
import { SemanaSideBar } from '../SemanaSideBar/SemanaSideBar';
import Toggle from '../Toggle/Toggle';

export type Props = {
  isOpen?: boolean;
  children: ReactNode;
};

export const SideBar: React.FC<Props> = ({ children, isOpen }) => {
  const topicos = useVideos(state => state.topicos);

  const [animation, setAnimation] = useState('');
  const [closeSidebar, setCloseSidebar] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setCloseSidebar(true);
      setTimeout(() => {
        setAnimation('translate-x-0');
      }, 20);
    } else {
      setAnimation('-translate-x-full');
      setTimeout(() => {
        setCloseSidebar(isOpen);
      }, 250);
    }
  }, [isOpen]);

  return (
    <div className='flex flex-row relative w-full '>
      {closeSidebar && (
        <>
          <div
            className={`flex flex-col fixed pt-20 z-10 w-full overflow-auto bg-black-rgba xl:w-60 max-h-full xl:bg-gray-50 bg-gray-50 transition-all duration-200 ease-linear ${animation} `}
          >
            {Object.keys(topicos).length <= 1 ? (
              <>
                <div className=' py-12 md:py-8 xl:py-6 overflow-auto px-3 bg-gray-50 dark:bg-gray-900 '>
                  <ul className=' flex flex-col space-y-2  items-left '>
                    <p className='pl-4 text-base font-bold text-gray-700 rounded-lg dark:text-gray-100 '>
                      Não é nosso aluno?
                    </p>

                    <a
                      className='flex items-center p-2 hover:bg-blue-100 rounded-lg cursor-pointer'
                      href='https://www.raroacademy.com.br/'
                      rel='noreferrer'
                      target='_blank'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        aria-hidden='true'
                        role='img'
                        width='25'
                        height='25'
                        preserveAspectRatio='xMidYMid meet'
                        viewBox='0 0 24 24'
                      >
                        <path
                          fill='#343090'
                          className='dark:fill-raro-rosa'
                          d='m2.45 10.575l4.2-4.2q.35-.35.825-.5q.475-.15.975-.05l1.3.275Q8.4 7.7 7.625 9q-.775 1.3-1.5 3.15Zm5.125 2.275q.575-1.8 1.562-3.4q.988-1.6 2.388-3q2.2-2.2 5.025-3.288q2.825-1.087 5.275-.662q.425 2.45-.65 5.275T17.9 12.8q-1.375 1.375-3 2.388q-1.625 1.012-3.425 1.587Zm6.9-3q.575.575 1.413.575q.837 0 1.412-.575t.575-1.413q0-.837-.575-1.412t-1.412-.575q-.838 0-1.413.575q-.575.575-.575 1.412q0 .838.575 1.413Zm-.7 12.025l-1.6-3.675q1.85-.725 3.163-1.5q1.312-.775 2.912-2.125l.25 1.3q.1.5-.05.988q-.15.487-.5.837ZM4.05 16.05q.875-.875 2.125-.888q1.25-.012 2.125.863t.875 2.125q0 1.25-.875 2.125q-.625.625-2.087 1.075q-1.463.45-4.038.8q.35-2.575.8-4.025q.45-1.45 1.075-2.075Z'
                        />
                      </svg>
                      <span className='cursor-pointer dark:hover:text-raro-rosa items-center pl-4 w-full text-base font-bold text-raro-cobalto rounded-lg dark:text-gray-100'>
                        Matricule-se
                      </span>
                    </a>
                  </ul>
                </div>
                <div className='flex flex-col overflow-auto px-3 bg-gray-50 dark:bg-gray-900 '>
                  <hr className=' border-raro-rosa w-full mx-auto ' />
                  <h3 className=' mt-6 font-bold mx-auto dark:text-gray-100 text-raro-cobalto '>
                    Vídeos públicos
                  </h3>
                </div>
              </>
            ) : (
              <div className='flex overflow-auto px-3 bg-gray-50 dark:bg-gray-900 '>
                <h3 className='mx-auto mt-6 font-bold dark:text-gray-100 text-raro-cobalto items-center'>
                  Meu curso
                </h3>
              </div>
            )}
            {Object.keys(topicos).map(semana => (
              <SemanaSideBar semana={semana} videos={topicos[semana]} />
            ))}
            <div className='flex bg-gray-50 dark:bg-gray-900 w-full'>
              <Toggle />
            </div>
          </div>
          <div
            className={`w-72 dark:bg-gray-900 transition-all duration-400 ease-in-out ${animation}`}
          ></div>
        </>
      )}
      {children}
    </div>
  );
};
