import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

export const SolicitarCodigo = () => {
  return (
    <>
      {/*ajustar espaçamento entre os inputs*/}
      <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div>
            {/* Inserir logo da raro */}
            {/* <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                            alt="Workflow"
                        /> */}
            <h2 className='mt-6 text-center text-3xl font-bold text-gray-500'>
              Solicitar código de Acesso
            </h2>
            <p className='mt-2 text-center text-sm text-gray-600'>
              Insira seu email abaixo para receber o código de acesso da turma
            </p>
          </div>

          <form className='mt-8 space-y-6' onSubmit={undefined}>
            <div className=' rounded-md shadow-sm -space-6y-px  '>
              <div>
                <Input
                  type='text'
                  name='email'
                  label='email'
                  placeholder='email'
                  required
                  value={''}
                />
              </div>

              <div className='mt-8'>
                <Button type='submit'>Enviar</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
